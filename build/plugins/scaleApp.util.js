(function() {
  var UtilPlugin;

  UtilPlugin = (function() {

    function UtilPlugin(sb) {}

    UtilPlugin.prototype.countObjectKeys = function(o) {
      var k, v;
      if (typeof o === "object") {
        return ((function() {
          var _results;
          _results = [];
          for (k in o) {
            v = o[k];
            _results.push(k);
          }
          return _results;
        })()).length;
      }
    };

    UtilPlugin.prototype.mixin = function(receivingClass, givingClass, override) {
      if (override == null) override = false;
      switch ("" + (typeof givingClass) + "-" + (typeof receivingClass)) {
        case "function-function":
          return this.mix(givingClass.prototype, receivingClass.prototype, override);
        case "function-object":
          return this.mix(givingClass.prototype, receivingClass, override);
        case "object-object":
          return this.mix(givingClass, receivingClass, override);
        case "object-function":
          return this.mix(givingClass, receivingClass.prototype, override);
      }
    };

    UtilPlugin.prototype.mix = function(giv, rec, override) {
      var k, v, _results, _results2;
      if (override === true) {
        _results = [];
        for (k in giv) {
          v = giv[k];
          _results.push(rec[k] = v);
        }
        return _results;
      } else {
        _results2 = [];
        for (k in giv) {
          v = giv[k];
          if (!rec.hasOwnProperty(k)) _results2.push(rec[k] = v);
        }
        return _results2;
      }
    };

    return UtilPlugin;

  })();

  scaleApp.registerPlugin({
    id: "util",
    sandbox: UtilPlugin
  });

}).call(this);
