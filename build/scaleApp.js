(function() {
  var Mediator, Sandbox, VERSION, addModule, core, coreKeywords, createInstance, error, instances, k, mediator, modules, onInstantiate, onInstantiateFunctions, plugins, register, registerPlugin, sandboxKeywords, start, startAll, stop, stopAll, uniqueId, unregister, unregisterAll, v;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __slice = Array.prototype.slice, __indexOf = Array.prototype.indexOf || function(item) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (this[i] === item) return i;
    }
    return -1;
  };
  Mediator = (function() {
    function Mediator(name) {
      this.name = name != null ? name : "";
      this.publish = __bind(this.publish, this);
      this.unsubscribe = __bind(this.unsubscribe, this);
      this.subscribe = __bind(this.subscribe, this);
      this.channels = {};
    }
    Mediator.prototype.subscribe = function(channel, fn) {
      if (this.channels[channel] == null) {
        this.channels[channel] = [];
      }
      this.channels[channel].push({
        context: this,
        callback: fn
      });
      return this;
    };
    Mediator.prototype.unsubscribe = function(channel, cb) {
      var ch, k, removeCB, _ref;
      removeCB = function(array, fn) {
        var j, sub, _len, _results;
        _results = [];
        for (j = 0, _len = array.length; j < _len; j++) {
          sub = array[j];
          if (sub.callback === fn) {
            array.splice(j, 1);
            break;
          }
        }
        return _results;
      };
      switch (typeof channel) {
        case "string":
          if (this.channels[channel] != null) {
            removeCB(this.channels[channel], cb);
          }
          break;
        case "function":
          _ref = this.channels;
          for (k in _ref) {
            ch = _ref[k];
            removeCB(ch, channel);
          }
      }
      return this;
    };
    Mediator.prototype.publish = function(channel, data, publishReference) {
      var copy, k, subscription, v, _i, _len, _ref;
      if (this.channels[channel] != null) {
        _ref = this.channels[channel];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          subscription = _ref[_i];
          if (publishReference !== true && typeof data === "object") {
            copy = {};
            for (k in data) {
              v = data[k];
              copy[k] = v;
            }
            subscription.callback.apply(subscription.context, [copy, channel]);
          } else {
            subscription.callback.apply(subscription.context, [data, channel]);
          }
        }
      }
      return this;
    };
    Mediator.prototype.installTo = function(obj) {
      if (typeof obj === "object") {
        obj.subscribe = this.subscribe;
        obj.publish = this.publish;
      }
      return this;
    };
    return Mediator;
  })();
  Sandbox = (function() {
    function Sandbox(core, instanceId, options) {
      this.core = core;
      this.instanceId = instanceId;
      this.options = options != null ? options : {};
      if (this.core == null) {
        throw new Error("core was not defined");
      }
      if (instanceId == null) {
        throw new Error("no id was specified");
      }
      if (typeof instanceId !== "string") {
        throw new Error("id is not a string");
      }
    }
    Sandbox.prototype.subscribe = function() {
      var args, _ref;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return (_ref = this.core).subscribe.apply(_ref, __slice.call(args).concat([this.instanceId]));
    };
    Sandbox.prototype.unsubscribe = function() {
      var args, _ref;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return (_ref = this.core).unsubscribe.apply(_ref, __slice.call(args).concat([this.instanceId]));
    };
    Sandbox.prototype.publish = function() {
      var args, _ref;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return (_ref = this.core).publish.apply(_ref, __slice.call(args).concat([this.instanceId]));
    };
    return Sandbox;
  })();
  VERSION = "0.3";
  modules = {};
  instances = {};
  mediator = new Mediator("core");
  plugins = {};
  error = function(e) {
    return typeof console !== "undefined" && console !== null ? typeof console.error === "function" ? console.error(e.message) : void 0 : void 0;
  };
  uniqueId = function(length) {
    var id;
    if (length == null) {
      length = 8;
    }
    id = "";
    while (id.length < length) {
      id += Math.random().toString(36).substr(2);
    }
    return id.substr(0, length);
  };
  onInstantiateFunctions = {
    _always: []
  };
  onInstantiate = function(fn, moduleId) {
    var entry;
    if (typeof fn !== "function") {
      throw new Error("expect a function as parameter");
    }
    entry = {
      context: this,
      callback: fn
    };
    if (typeof moduleId === "string") {
      if (onInstantiateFunctions[moduleId] == null) {
        onInstantiateFunctions[moduleId] = [];
      }
      return onInstantiateFunctions[moduleId].push(entry);
    } else if (!(moduleId != null)) {
      return onInstantiateFunctions._always.push(entry);
    }
  };
  createInstance = function(moduleId, instanceId, opt) {
    var entry, i, instance, instanceOpts, k, key, module, n, p, plugin, sb, v, val, _i, _j, _len, _len2, _ref, _ref2, _ref3;
    if (instanceId == null) {
      instanceId = moduleId;
    }
    module = modules[moduleId];
    if (instances[instanceId] != null) {
      return instances[instanceId];
    }
    instanceOpts = {};
    _ref = module.options;
    for (key in _ref) {
      val = _ref[key];
      instanceOpts[key] = val;
    }
    if (opt) {
      for (key in opt) {
        val = opt[key];
        instanceOpts[key] = val;
      }
    }
    sb = new Sandbox(core, instanceId, instanceOpts);
    for (i in plugins) {
      p = plugins[i];
      if (p.sandbox != null) {
        plugin = new p.sandbox(sb);
        for (k in plugin) {
          v = plugin[k];
          if (plugin.hasOwnProperty(k)) {
            sb[k] = v;
          }
        }
      }
    }
    instance = new module.creator(sb);
    instance.options = instanceOpts;
    instance.id = instanceId;
    instances[instanceId] = instance;
    _ref2 = [instanceId, '_always'];
    for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
      n = _ref2[_i];
      if (onInstantiateFunctions[n] != null) {
        _ref3 = onInstantiateFunctions[n];
        for (_j = 0, _len2 = _ref3.length; _j < _len2; _j++) {
          entry = _ref3[_j];
          entry.callback.apply(entry.context);
        }
      }
    }
    return instance;
  };
  addModule = function(moduleId, creator, opt) {
    var modObj;
    if (typeof moduleId !== "string") {
      throw new Error("moudule ID has to be a string");
    }
    if (typeof creator !== "function") {
      throw new Error("creator has to be a constructor function");
    }
    if (typeof opt !== "object") {
      throw new Error("option parameter has to be an object");
    }
    modObj = new creator();
    if (typeof modObj !== "object") {
      throw new Error("creator has to return an object");
    }
    if (typeof modObj.init !== "function") {
      throw new Error("module has to have an init function");
    }
    if (typeof modObj.destroy !== "function") {
      throw new Error("module has to have a destroy function");
    }
    if (modules[moduleId] != null) {
      throw new Error("module " + moduleId + " was already registered");
    }
    modules[moduleId] = {
      creator: creator,
      options: opt,
      id: moduleId
    };
    return true;
  };
  register = function(moduleId, creator, opt) {
    if (opt == null) {
      opt = {};
    }
    try {
      return addModule(moduleId, creator, opt);
    } catch (e) {
      error(new Error("could not register module: " + e.message));
      return false;
    }
  };
  unregister = function(id) {
    if (modules[id] != null) {
      delete modules[id];
      return true;
    } else {
      return false;
    }
  };
  unregisterAll = function() {
    var id, _results;
    _results = [];
    for (id in modules) {
      _results.push(unregister(id));
    }
    return _results;
  };
  start = function(moduleId, opt) {
    var instance;
    if (opt == null) {
      opt = {};
    }
    try {
      if (typeof moduleId !== "string") {
        throw new Error("module ID has to be a string");
      }
      if (typeof opt !== "object") {
        throw new Error("second parameter has to be an object");
      }
      if (modules[moduleId] == null) {
        throw new Error("modle does not exist");
      }
      instance = createInstance(moduleId, opt.instanceId, opt.options);
      if (instance.running === true) {
        throw new Error("module was already started");
      }
      instance.init(instance.options);
      instance.running = true;
      if (typeof opt.callback === "function") {
        opt.callback();
      }
      return true;
    } catch (e) {
      error(e);
      return false;
    }
  };
  stop = function(id) {
    var instance;
    if (instance = instances[id]) {
      instance.destroy();
      return delete instances[id];
    } else {
      return false;
    }
  };
  startAll = function(fn, opt) {
    var id, l, module, _i, _len;
    if (fn instanceof Array) {
      l = fn.length;
      for (_i = 0, _len = fn.length; _i < _len; _i++) {
        id = fn[_i];
        start(id, {
          callback: function() {
            return l--;
          }
        });
      }
    } else {
      for (id in modules) {
        module = modules[id];
        if (module) {
          start(id, module.options);
        }
      }
    }
    if (typeof fn === "function") {
      fn();
    }
    return true;
  };
  stopAll = function() {
    var id, _results;
    _results = [];
    for (id in instances) {
      _results.push(stop(id));
    }
    return _results;
  };
  coreKeywords = ["VERSION", "register", "unregister", "registerPlugin", "start", "stop", "startAll", "stopAll", "publish", "subscribe", "unsubscribe", "Mediator", "Sandbox", "unregisterAll", "uniqueId"];
  sandboxKeywords = ["core", "instanceId", "options", "publish", "subscribe", "unsubscribe"];
  registerPlugin = function(plugin) {
    var k, v, _ref, _ref2;
    try {
      if (typeof plugin !== "object") {
        throw new Error("plugin has to be an object");
      }
      if (typeof plugin.id !== "string") {
        throw new Error("plugin has no id");
      }
      if (typeof plugin.sandbox === "function") {
        for (k in new plugin.sandbox(new Sandbox(core, ""))) {
          if (__indexOf.call(sandboxKeywords, k) >= 0) {
            throw new Error("plugin uses reserved keyword");
          }
        }
        _ref = plugin.sandbox.prototype;
        for (k in _ref) {
          v = _ref[k];
          Sandbox.prototype[k] = v;
        }
      }
      if (typeof plugin.core === "object") {
        for (k in plugin.core) {
          if (__indexOf.call(coreKeywords, k) >= 0) {
            throw new Error("plugin uses reserved keyword");
          }
        }
        _ref2 = plugin.core;
        for (k in _ref2) {
          v = _ref2[k];
          core[k] = v;
        }
      }
      if (typeof plugin.onInstantiate === "function") {
        onInstantiate(plugin.onInstantiate);
      }
      plugins[plugin.id] = plugin;
      return true;
    } catch (e) {
      error(e);
      return false;
    }
  };
  core = {
    VERSION: VERSION,
    register: register,
    unregister: unregister,
    unregisterAll: unregisterAll,
    registerPlugin: registerPlugin,
    start: start,
    stop: stop,
    startAll: startAll,
    stopAll: stopAll,
    publish: mediator.publish,
    subscribe: mediator.subscribe,
    unsubscribe: mediator.unsubscribe,
    uniqueId: uniqueId,
    Mediator: Mediator,
    Sandbox: Sandbox
  };
  if (typeof exports !== "undefined" && exports !== null) {
    for (k in core) {
      v = core[k];
      exports[k] = v;
    }
  }
  if (typeof window !== "undefined" && window !== null) {
    window.scaleApp = core;
  }
}).call(this);
