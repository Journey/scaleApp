# scaleApp - Plugins

## i18n - Multi language UIs

Link `scaleApp.i18n.min.js` in your HTML file:

```html
<script src="scaleApp.min.js"></script>
<script src="scaleApp.i18n.min.js"></script>
```
Register the plugin:

```javascript
core.use(scaleApp.plugins.i18n);
```

If your application has to support multiple languages, you can pass an objects
containing the localized strings with the options object.

```javascript
var myLocalization =
{
  en: { welcome: "Welcome", ... },
  de: { welcome: "Willkommen", ... },
  ...
}
...
core.register( "moduleId", myModule, { i18n: myLocalization } );
```

Now you can access these strings easily trough the sandbox using the `_` method.
Depending on which language is set globally it returns the corresponding
localized string.

```javascript
sandbox._("myStringId");
```

You can set the language globally by using the `setLanguage` method:

```javascript
core.i18n.setLanguage( "de" );
```

You can also set a global i18n object which can be used by all modules:

```javascript
core.i18n.setGlobal( myGlobalObj );
```

Within your module you can define your local texts:

```javascript
function(sandbox){
  init: function(){
    sandbox.i18n.addLocal({
      en: {hello: "Hello" },
      de: {hello: "Hallo" }
    });
  },
  destroy: function(){}
}
```

Subscribe to change event:

```javascript
sandbox.i18n.onChange(function(){
  // update ui
});
```

## mvc - very simple MVC

![scaleApp mvc](https://raw.github.com/flosse/scaleApp/master/mvc.png)

Here is a sample use case for using the MVC plugin (in coffeescript).

```coffeescript
class MyModel extends scaleApp.Model name: "Noname"
```

```coffeescript
class MyView extends scaleApp.View

  constructor: (@model, @sandbox, @template) -> super @model

  # The render method gets automatically called when the model changes
  # The 'getContainer' method is provided by the dom plugin
  render: -> @sandbox.getContainer.innerHTML = @template @model
```

```coffeescript
class MyController extends scaleApp.Controller

  changeName: (name) -> @model.set "name", name
```

```coffeescript
core.registerModule "myModule", (@sandbox) ->

  init: (opt) ->

    # You can use any template engine you like. Here it's
    # just a simple function
    template = (model) -> "<h1>Hello #{model.name}</h1>"

    @m = new MyModel
    @v = new MyView @m, @sandbox, @template
    @c = new MyController @m, @v

    # listen to the "changeName" event
    @sandbox.on "changeName", @c.changeName, @c

  destroy: ->
    delete @c
    delete @v
    delete @m
    @sandbox.off @
```

```coffeescript
core.emit "changeName", "Peter"
```
## state - Finite State Machine

The state plugin is an approach to implement a
[Finite State Machine](https://en.wikipedia.org/wiki/Finite_state_machine)
that can be used to keep track of your applications state.

![scaleApp fsm](https://raw.github.com/flosse/scaleApp/master/fsm.png)

```javascript
var s = new scaleApp.StateMachine({
  start: "a",
  states: {
    a:      { enter: function(ev){ console.log("entering state " + ev.to  ); }},
    b:      { leave: function(ev){ console.log("leaving state " + ev.from ); }},
    c:      { enter: [cb1, cb2], leave: cb3                                   },
    fatal:  { enter: function(){ console.error("something went wrong");      }}
  },
  transitions:{
    x:    { from: "a"        to: "b"     },
    y:    { from: ["b","c"]  to: "c"     },
    uups: { from: "*"        to: "fatal" }
  }
});

s.addState("d", { enter: function(){ /*..*/} });  // add an additional state
s.addState({ y: {}, z: { enter: cb } });          // or add multiple states

s.addTransition("t", { from: "b", to: "d" });     // add a transition
s.can("t");   // false because 'a' is current state
s.can("x");   // true

s.onLeave("a", function(transition, eventName, next){
  // ...
  next()
});

s.onEnter("b",function(transitioin, eventName, next){
  doSomething(function(err){next(err);});
});

s.fire("x");
s.current     // b
```

## permission - controll all messages

If you include the `permission` plugin, all `Mediator` methods will be rejected
by default to enforce you to permit any message method explicitely.

```javascript
core.permission.add("instanceA", "on", "a");
core.permission.add("instanceB", "emit", ["b", "c"]);
core.permission.add("instanceC", "emit", '*');
core.permission.add("instanceD", '*', 'd');
```

Now `instanceA` is allowed to subscribe to channel `a` but all others cannot
subscribe to it.
`InstanceB` can emit data on channels `a` and `c`.
`InstanceC` can emit to all channels.
`InstanceD` can perform all actions (`on`, `off`, `emit`)
but only on channel `d`.

Of course you can remove a permission at any time:

```javascript
core.permission.remove("moduleA", "emit", "x");
```

Or remove the subscribe permissions of all channels:

```javascript
core.permission.remove("moduleB", "on");
```

## strophe - XMPP plugin

This is an adapter plugin for [Strophe.js](http://strophe.im/strophejs/) with
some helpful features (e.g. automatically reconnect on page refresh).

```javascript
core.xmpp.login("myjid@server.tld", "myPassword");
core.xmpp.logout();
core.xmpp.jid       // the current JID
```

## submodule

```javascript

core.register("parent", function(sandbox){

  var childModule = function(sandbox){
    return({
      init: function(){
        sandbox.emit("x", "yeah!");
      },
      destroy: function(){}
    });
  });

  return({
    init: function(){
      sandbox.sub.register("child",childModule);
      sandbox.permission.add("child", "emit", "x");
      sandbox.sub.on("x",function(msg){
        console.log("a child send this: " + msg);
      });
      sandbox.sub.start("child");
    },
    destroy: function(){}
  });

});

core.start("parent");
// the "parent" module starts a child within the init method

core.stop("parent");
// all children of "parent" were automatically stopped
```

## util - some helper functions

### Show registered modules

```javascript
core.lsModules(); // returns an array of module names
```
### Show running instances

```javascript
core.lsInstances(); // returns an array of instance names
```

### Show registered plugins

```javascript
core.lsPlugins(); // returns an array of plugin names
```

### Helper methods

 - `core.mixin(receivingClass, givingClass, override=false)`
 - `core.countObjectKeys(object)`
 - `core.clone(object)`
 - `core.uniqueId(length=8)`

## Other plugins

- dom - basic DOM manipulations (currently only used for `getContainer`)

## Write your own plugin

It's easy:

```javascript
core.use(function(core){
  core.helloWorld = function(){ alert("helloWorld"); };
};
```

Here a more complex example:

```javascript
core.use(function(core, done){

  // extend the core
  core.myCoreFunction = function(){ alert("Hello core plugin") };
  core.myBoringProperty = "boring";

  // extend the sandbox class
  core.Sandbox.prototype.myMethod = function( /*...*/);

  // define a method that gets called when a module starts
  var onModuleInit = function(instanceSandbox, options, done){

    // e.g. define sandbox methods dynamically
    if (options.mySwitch){
      instanceSandbox.appendFoo = function(){
       core.getContainer.append("foo");
      };
    }

    // or load a something asynchronously
    core.myAsyncMethod(function(data){

      // do something...
      // now tell scaleApp that you're done
      done();
    });
  };

  // define a method that gets called when a module stops
  var onModuleDestroy = function(done){
    myCleanUpMethod(function(){
      done()
    });
  };

  // don't forget to return your methods
  return {
    init: onModuleInit,
    destroy: onModuleDestroy
  };

});
```

## Use your own Sandbox

```javascript
core.use(function(core){

  core.Sandbox = function(core, instanceId, options){

    var foo = function(){ /* ... */ };

    var myEmit = function(channel, data){
      core.emit(channel + '/' + instanceId, data);
    };

    // return your own public API
    return {
      foo: foo,
      emit: myEmit
    };

  };
});
```

Usage:

```javascript
core.myCoreFunction() // alerts "Hello core plugin"

var MyModule = function(sandbox){
  init: function(){ sandbox.appendFoo(); },  // appends "foo" to the container
  destroy: function(){}
};
```

# Build browser bundles

If you want scaleApp bundled with special plugins type

```shell
grunt custom[:PLUGIN_NAME]
```
e.g. `cake custom:dom:mvc` creates the file `scaleApp.custom.js` that
contains scaleApp itself the dom plugin and the mvc plugin.