(function() {
  var SBPlugin, baseLanguage, channelName, get, getBrowserLanguage, getLanguage, lang, mediator, setLanguage, subscribe, unsubscribe;

  SBPlugin = (function() {

    function SBPlugin(sb) {
      this.sb = sb;
    }

    SBPlugin.prototype._ = function(text) {
      var i18n;
      i18n = this.sb.options.i18n;
      if (typeof i18n === !"object") return text;
      return this.sb.core.i18n.get(i18n, text);
    };

    SBPlugin.prototype.getLanguage = function() {
      return this.sb.core.i18n.getLanguage();
    };

    SBPlugin.prototype.onLanguageChanged = function(fn) {
      return this.sb.core.i18n.subscribe(fn);
    };

    return SBPlugin;

  })();

  baseLanguage = "en";

  getBrowserLanguage = function() {
    return (navigator.language || navigator.browserLanguage || baseLang).split("-")[0];
  };

  lang = getBrowserLanguage();

  mediator = new scaleApp.Mediator;

  channelName = "i18n";

  subscribe = function(fn) {
    return mediator.subscribe(channelName, fn);
  };

  unsubscribe = function(fn) {
    return mediator.unsubscribe(channelName, fn);
  };

  getLanguage = function() {
    return lang;
  };

  setLanguage = function(code) {
    if (typeof code === "string") {
      lang = code;
      return mediator.publish(channelName, lang);
    }
  };

  get = function(x, text) {
    var _ref, _ref2, _ref3, _ref4, _ref5, _ref6;
    return (_ref = (_ref2 = x[lang]) != null ? _ref2[text] : void 0) != null ? _ref : (_ref3 = (_ref4 = x[lang.substring(0, 2)]) != null ? _ref4[text] : void 0) != null ? _ref3 : (_ref5 = (_ref6 = x[baseLanguage]) != null ? _ref6[text] : void 0) != null ? _ref5 : text;
  };

  scaleApp.registerPlugin({
    id: "i18n",
    sandbox: SBPlugin,
    core: {
      i18n: {
        setLanguage: setLanguage,
        getBrowserLanguage: getBrowserLanguage,
        getLanguage: getLanguage,
        baseLanguage: baseLanguage,
        get: get,
        subscribe: subscribe,
        unsubscribe: unsubscribe
      }
    }
  });

}).call(this);
