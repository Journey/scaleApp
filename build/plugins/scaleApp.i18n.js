(function() {
  var SBPlugin, baseLanguage, channelName, get, getBrowserLanguage, getLanguage, lang, mediator, setLanguage, subscribe, unsubscribe,
    __slice = Array.prototype.slice;

  baseLanguage = "en";

  getBrowserLanguage = function() {
    return (navigator.language || navigator.browserLanguage || baseLang).split("-")[0];
  };

  lang = getBrowserLanguage();

  mediator = new scaleApp.Mediator;

  channelName = "i18n";

  subscribe = function() {
    return mediator.subscribe.apply(mediator, [channelName].concat(__slice.call(arguments)));
  };

  unsubscribe = function() {
    return mediator.unsubscribe.apply(mediator, [channelName].concat(__slice.call(arguments)));
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

  SBPlugin = (function() {

    function SBPlugin(sb) {
      this.sb = sb;
    }

    SBPlugin.prototype.i18n = {
      subscribe: subscribe,
      unsubscribe: unsubscribe
    };

    SBPlugin.prototype._ = function(text) {
      var i18n;
      i18n = this.sb.options.i18n;
      if (typeof i18n !== "object") return text;
      return get(i18n, text);
    };

    SBPlugin.prototype.getLanguage = getLanguage;

    return SBPlugin;

  })();

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
