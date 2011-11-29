---
title: scaleApp
subtitle: Usage
layout: base
---

# Basic usage

Link `scaleApp.min.js` in your HTML file:

    <script src="scaleApp.min.js"></script>

## Register modules

Now you can register your modules:

    scaleApp.register( "myModuleId", function( sb ){
      return {
        init:    function(){ /*...*/ },
        destroy: function(){ /*...*/ }
      };
    });

As you can see the module is a function that takes the sandbox as a parameter
and returns an object that has two functions `init` and `destroy`.
Of course your module can be any usual class with those two functions.
Here an coffee-script example:

    class MyGreatModule

      constructor: (@sb) ->
      init: -> alert "Hello world!"
      destroy: -> alert "Bye bye!"

    scaleApp.register "myGreatModule", MyGreatModule

The `init` function is called by the framework when the module is supposed to
start. The `destroy` function is called when the module has to shut down.

Of course you can also unregister a module:

    scaleApp.register("myGreatModule");

## Start modules

After your modules are registered, start your modules:

    scaleApp.start( "myModuleId" );
    scaleApp.start( "anOtherModule" );

### Start options

You may also want to start several instances of a module:

    scaleApp.start( "myModuleId", {instanceId: "myInstanceId" } );
    scaleApp.start( "myModuleId", {instanceId: "anOtherInstanceId" });

If you pass a callback function it will be called after the module started:

    scaleApp.start( "myModuleId", {callback: function(){ /*...*/ } );

All other options you pass are available through the sandbox:

    scaleApp.register( "mod", function(s){
      sb = s
      return {
        init:    function(){ alert( sb.options.myProperty ); },
        destroy: function(){ /*...*/ }
      };
    });

    scaleApp.start("mod", {myProperty: "myValue"});

If all your modules just needs to be instanciated once, you can simply starting
them all:

    scaleApp.startAll();

To start some special modules at once you can pass an array with the module
names:

    scaleApp.startAll(["moduleA","moduleB"]);

You can also pass a callback function:

    scaleApp.startAll(function(){
      // do something when all modules were initialized
    });

## Stopping

It's obvious:

    scaleApp.stop("moduleB");
    scaleApp.stopAll();

# Publish/Subscribe

If the module needs to communicate with others, you can use the `publish` and
`subscribe` methods.

## Publish

The `publish` function takes three parameters whereas the last one is optional:
- `topic` : the channel name you want to publish to
- `data`  : the data itself
- `publishReference` : If the data should be passed as a reference to the other
modules this parameter has to be set to `true`.
By default the data object gets copied so that other modules can't influence the
original object.

The publish function is accessible through the sandbox:

    sb.publish( "myEventTopic", myData );

## Subscribe

A message handler could look like this:

    var messageHandler = function( data, topic ){
	    switch( topic ){
	      case "somethingHappend":
	        sb.publish( "myEventTopic", processData(data) );
	        break;
	      case "aNiceTopic":
	        justProcess( data );
	        break;
	    }
    };

... and it can listen to one or more channels:

    sb.subscribe( "somthingHappend", messageHandler );
    sb.subscribe( "aNiceTopic", messageHandler );
