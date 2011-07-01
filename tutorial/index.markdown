---
title: scaleApp
subtitle: Usage
layout: base
---

# Basic usage

Link scaleApp.full.min.js in your HTML head section:

    <head>
      ...
      <script type="text/javascript" src="scaleApp.full.min.js"></script>
      ...
    </head>

Now you can register your modules:

    scaleApp.register( "myModuleId", function( sb ){
	    ...
	    return {
	      init: function(){
		...
	      },
	      destroy: function(){
		...
	      }
	    };
      });

As you can see the module is a function that takes the sandbox as a parameter 
and returns an object that has two functions 'init' and 'destroy'. 
The 'init' function is called by the framework when the module is supposed to start.
The 'destroy' function is called when the module has to shut down.

After your modules are registered, start your modules:

    scaleApp.start( "myModuleId" );
    scaleApp.start( "AnOtherModule" );
    ...

You may also want to start several instances of your module at once:

    scaleApp.start( "myModuleId", "myInstanceId" );
    scaleApp.start( "myModuleId", "anOtherInstanceId" );

If all your modules just needs to be instanciated once, you can simply starting them all with:

    scaleApp.startAll();

You can also pass a callback function:

    scaleApp.startAll(function(){
      // do something when all modules were initialized
    });

# MVC

If your module is more complex, you might want to split it into models and views.
So use your current module as a controller and pass your models and views with the option object.
You can get your models and views with the sandbox method 'getModel' and 'getView' respectively.

    var myController = function( sb ){

	  var modelOne;
	  ...
	  var viewOne;
	  ...
	  var init = function(){
	    modelOne = sb.getModel( "myModelOne" );
	    ...
	    viewOne = sb.getView( "myViewOne" );
	    ...
	  }
	  ...

	  return { init: init, destroy: destroy };
    };
    ...
    var myModelOne = { ... }
    ...
    scaleApp.register( "moduleId", myController,
    {
	  models: {
	    modelIdOne: myModelOne,
	    modelIdTwo: myModelTwo
	  },
	  views: {
	    viewIdOne: myViewOne,
	    viewIdTwo: myViewTwo
	  }
    });

If you want to make use of the observer pattern, you can extend your model easily with a simple implementation:

    sb.mixin( myModel, sb.observable );

Now the methods 'subscribe', 'unsubscribe' and 'notify' are available to you. 
Your observer has to implement the update method to be notified on change.

If you defined a model on registration, your model is already extended, so you can do something like this:

    var myView = (function(){
	    ...
	    var init = function( sb ){
		    ...
		    model = sb.getModel( "myModel" );
		    model.subscribe( this );
		    ...
	    };

	    var update = function(){
	      render( model );
	    };
	    ...
	    return { init: init, destroy: destroy, update:update };		
    })();

# Publish/Subscribe

If the module needs to communicate with others, you can use the 'publish' and 'subscribe' methods.

    var eventHandlerOne = function( topic, data ){ ... };
    ...
    var messageHandler = function( topic, data ){

	  switch( topic ){

	    case "somethingHappend":
	      var result = processData( data );
	      sb.publish( "myEventTopic", result );
	      break;
	      ....
	  }
	  ...
    };

    var init = function(){
      sb.subscribe( "anInteresstingEvent", eventHandlerOne );
      sb.subscribe( "somthingHappend", messageHandler );
      sb.subscribe( "aNiceTopic", messageHandler );
    };

# i18n

If your application has to support multiple languages, you can pass an objects containing the localized strings 
with the options object.

    var myLocalization =
    {
      en: { welcome: "Welcome", ... }, 
      de: { welcome: "Willkommen", ... },
      ...
    }
    ...
    scaleApp.register( "moduleId", myModule, { i18n: myLocalization } );

Now you can access these strings easily trough the sandbox using the '_' method. 
Depending on which language is set globally it returns the corresponding localized string.

    sb._("myStringId" );

You can set the language globally by using the 'setLanguage' method:

    scaleApp.i18n.setLanguage( "de" );

# hotkeys

For handling hotkeys, you simply can register them like this:

    scaleApp.hotkeys( "alt+c", myFunction, "keydown" );
    scaleApp.hotkeys( "h", myFunction, "keypress" );

If you want to trigger an event by hotkeys, you can simply do it in that way:

    scaleApp.hotkeys( "alt+c", "myTopic", myData, "keydown" );

# templating

Create a HTML-File with placeholders on your server.

    <div>
      ...
      <li>${ Name }</li>
      ...
    </div>

Link to your template when you register your module.

    scaleApp.register( "moduleId", myModule,
    {
      models: { ... },
      views: { ... },
      templates: { myTemplate: "path/to/myTemplate.html" },
      i18n: myi18n 
    }); 

Once registered, you can use it in your module like this:

    var init = function(){
      ...
      sb.tmpl("myTemplate", myData ).appendTo( somewhere );
      ...
    }

