(function() {
  var DOMPlugin,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  DOMPlugin = (function() {

    function DOMPlugin(sb) {
      this.sb = sb;
      this.getContainer = __bind(this.getContainer, this);
    }

    DOMPlugin.prototype.getContainer = function() {
      switch (typeof this.sb.options.container) {
        case "string":
          return document.getElementById(this.sb.options.container);
        case "object":
          return this.sb.options.container;
        default:
          return document.getElementById(this.sb.instanceId);
      }
    };

    return DOMPlugin;

  })();

  scaleApp.registerPlugin({
    id: "dom",
    sandbox: DOMPlugin
  });

}).call(this);
