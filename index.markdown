---
title: scaleApp
subtitle: a JavaScript framework for One-Page-Applications
layout: base
---

scaleApp is a tiny JavaScript framework for scalable One-Page-Applications.
The framework allows you to easily create complex web applications.

With scaleApp you are able to write modules that focus on their own business.
They can act independently from each other and communicate through a central event system.
Each module has its own sandbox where it can play in. Thus as developer you only need to know the API of the sandbox.

By splitting your complex application into separate parts by loose coupling,
it is comfortable to maintain and scale.

# Features

If you like the following features, scaleApp might be the right choice for you:

+ loose coupling of modules
+ small & simple
+ no serverside dependencies
+ modules can be tested separately
+ replacing any module without affecting other modules
+ multi language UIs
+ supports the Model–View–Controller pattern

# Architecture

scaleApp is inspired by the talk of Nicholas C. Zakas - ["Scalable JavaScript Application Architecture"](http://developer.yahoo.com/yui/theater/video.php?v=zakas-architecture).
Unlike his recommendations to abstract DOM manipulations and separating the framework from the base library,
scaleApp explicitly uses jQuery as base library. Therefore you can use the full power of jQuery on every layer.

# Quick Links

* [Latest documentation](doc/0.2)
* [GitHub project page](https://github.com/flosse/scaleApp)
* [Bug tracker](https://github.com/flosse/scaleApp/issues)

# Downloads

## Official releases

The latest release is **0.2**.

* [scaleApp.full.min.js](https://github.com/flosse/scaleApp/raw/v0.2/build/scaleApp.full.min.js) - scaleApp including [jQuery](http://jquery.com) 1.6.2 and plugin dependencies.
* [scaleApp.min.js](https://github.com/flosse/scaleApp/raw/v0.2/build/scaleApp.min.js) - scaleApp without dependencies.

Older releases can be found on the [project downloads page](https://github.com/flosse/scaleApp/downloads).

## Development Version

    git clone git://github.com/flosse/scaleApp.git

# Demo

You can try out the [sample application](http://www.scaleapp.org/demo/fast/) that is build on
[scaleApp](http://www.scaleapp.org). Also have a look at the [source code](http://github.com/flosse/FAST).

# Documentation

* [scaleApp API Documentation](doc/0.2)
* [Usage](tutorial/)

## Licence

scaleApp is licensed under the [MIT license](https://github.com/flosse/scaleApp/raw/master/LICENSE.txt).

