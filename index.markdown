---
title: scaleApp
subtitle: a JavaScript framework for One-Page-Applications
layout: base
---

scaleApp is a tiny JavaScript framework for scalable One-Page-Applications.
The framework allows you to easily create complex web applications.

With scaleApp you are able to write modules that focus on their own business.
They can act independently from each other and communicate through a central
event system.
Each module has its own sandbox where it can play in. Thus as developer you only
need to know the API of the sandbox.

By splitting your complex application into separate parts by loose coupling,
it is comfortable to maintain and scale.

# Quick Links

* [Usage](tutorial/) - basics
* [i18n Plugin](tutorial/i18n.html) - a quick introduction
* [GitHub project page](https://github.com/flosse/scaleApp)
* [Bug tracker](https://github.com/flosse/scaleApp/issues)
* [Source code documentation](doc/0.3.1/scaleApp.core.html)

# Downloads

## Official releases

The latest release is **0.3.1**.

* [scaleApp.full.js](build/scaleApp.full.js)
  ([min](build/scaleApp.full.min.js)) - scaleApp including all plugins.
* [scaleApp.js](build/scaleApp.js)
  ([min](build/scaleApp.min.js))- scaleApp without plugins.

### Plugins

* [scaleApp.i18n.js](build/plugins/scaleApp.i18n.js)
  ([min](build/plugins/scaleApp.i18n.min.js)) - multi language UIs
* [scaleApp.mvc.js](build/plugins/scaleApp.mvc.js)
  ([min](build/plugins/scaleApp.mvc.min.js)) - very simple MVC classes
* [scaleApp.util.js](build/plugins/scaleApp.util.js)
  ([min](build/plugins/scaleApp.util.min.js)) - some helper functions
* [scaleApp.dom.js](build/plugins/scaleApp.dom.js)
  ([min](build/plugins/scaleApp.dom.min.js)) - basic DOM manipulation (currently only used for `getContainer()`)

Older releases can be found on the [project downloads page](https://github.com/flosse/scaleApp/downloads).

## Development Version

    git clone git://github.com/flosse/scaleApp.git

# Features

If you like the following features, scaleApp might be the right choice for you:

+ loose coupling of modules
+ small & simple
+ no serverside dependencies
+ modules can be tested separately
+ replacing any module without affecting other modules
+ plugins for
  - multi language UIs
  - supports the Model-View-Controller pattern

# Demo

You can try out the [sample application](http://www.scaleapp.org/demo/fast/)
that is build on [scaleApp](http://www.scaleapp.org).
Also have a look at the [source code](http://github.com/flosse/FAST).

# Architecture

scaleApp is inspired by the talk of Nicholas C. Zakas - ["Scalable JavaScript Application Architecture"](http://developer.yahoo.com/yui/theater/video.php?v=zakas-architecture).
Unlike his recommendations to abstract DOM manipulations and separating the
framework from the base library, scaleApp does not implement any DOM methods.
Just use one of your favorite libs (e.g. jQuery) as base library.

# Licence

scaleApp is licensed under the [MIT license](https://github.com/flosse/scaleApp/raw/master/LICENSE.txt).
