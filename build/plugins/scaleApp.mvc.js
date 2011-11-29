(function() {
  var Controller, Model, View;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; }, __indexOf = Array.prototype.indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (__hasProp.call(this, i) && this[i] === item) return i; } return -1; };

  Model = (function() {

    __extends(Model, scaleApp.Mediator);

    Model.reservedKeywords = ["set", "get"];

    function Model(obj) {
      var k, v;
      Model.__super__.constructor.call(this);
      this.id = (obj != null ? obj.id : void 0) || scaleApp.uniqueId();
      for (k in obj) {
        v = obj[k];
        if (!(this[k] != null)) this[k] = v;
      }
    }

    Model.prototype.set = function(key, val) {
      var k, v, _results;
      if (typeof key === "object") {
        _results = [];
        for (k in key) {
          v = key[k];
          _results.push(this.set(k, v));
        }
        return _results;
      } else {
        if (!(__indexOf.call(Model.reservedKeywords, key) >= 0)) {
          if (this[key] !== val) {
            this[key] = val;
            this.publish("changed");
          }
        }
        return this;
      }
    };

    Model.prototype.get = function(key) {
      return this[key];
    };

    Model.prototype.toJSON = function() {
      var json, k, v;
      json = {};
      for (k in this) {
        v = this[k];
        if (this.hasOwnProperty(k)) json[k] = v;
      }
      return json;
    };

    return Model;

  })();

  View = (function() {

    function View(model) {
      if (model) this.setModel(model);
    }

    View.prototype.setModel = function(model) {
      var _this = this;
      this.model = model;
      return this.model.subscribe("changed", function() {
        return _this.render();
      });
    };

    View.prototype.render = function() {};

    return View;

  })();

  Controller = (function() {

    function Controller(model, view) {
      this.model = model;
      this.view = view;
    }

    return Controller;

  })();

  scaleApp.registerPlugin({
    id: "mvc",
    core: {
      Model: Model,
      View: View,
      Controller: Controller
    }
  });

}).call(this);
