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

If you like the following features, scaleApp might be the right choice for you:

+ loose coupling of modules
+ small & simple
+ no serverside dependencies
+ modules can be tested separately
+ replacing any module without affecting other modules
+ multi language UIs
+ supports the Model–View–Controller pattern

scaleApp is inspired by the talk of Nicholas C. Zakas — 
["Scalable JavaScript Application Architecture"](http://developer.yahoo.com/yui/theater/video.php?v=zakas-architecture).
Unlike his recommendations to abstract DOM manipulations and separating the framework from the base library, 
scaleApp explicitly uses jQuery as base library. Therefore you can use the full power of jQuery on every layer.
