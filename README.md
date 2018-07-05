# angularjs-webpack

[![Dependency Status](https://david-dm.org/preboot/angularjs-webpack/status.svg)](https://david-dm.org/preboot/angular-webpack#info=dependencies) [![devDependency Status](https://david-dm.org/preboot/angularjs-webpack/dev-status.svg)](https://david-dm.org/preboot/angularjs-webpack#info=devDependencies)

A complete, yet simple, starter for AngularJS using Webpack.

This workflow serves as a starting point for building AngularJS (1.x) applications using Webpack 2.x. Should be noted that apart from the pre-installed angular package, this workflow is pretty much generic.

* Heavily commented webpack configuration with reasonable defaults.
* ES6, and ES7 support with babel.
* Source maps included in all builds.
* Development server with live reload.
* Production builds with cache busting.
* Testing environment using karma to run tests and jasmine as the framework.
* Code coverage when tests are run.
* No gulp and no grunt, just npm scripts.

>Warning: Make sure you're using the latest version of Node.js and NPM

### Quick start

> Clone/Download the repo then edit `app.js` inside [`/src/app/app.js`](/src/app/app.js)

```bash
# clone our repo
$ git clone https://github.com/preboot/angularjs-webpack.git my-app

# change directory to your app
$ cd my-app

# install the dependencies with npm
$ npm install

# start the server
$ npm start
```

go to [http://localhost:3000](http://localhost:3000) in your browser.

This boilerplate based on [angularjs-webpack](https://github.com/preboot/angularjs-webpack).

# Table of Contents

* [Architecture](#architecture)
    * [Store](#store)
* [License](#license)

# Architecture

## Store

Store is a service where all your app data is stored.

- _``$store.createEntity(name, initialState)``_ - creates store entity with given ``name`` and ``initialState``.
- _``$store.getEntity(name)``_ - retrieves an entity by ``name``.
- _``$store.setEntity(name, newState)``_ - replaces an entity by ``name`` to ``newState``.
- _``$store.updateEntity(name, newState)``_ - updates an entity by ``name`` with ``newState``. Different from ``setEntity`` by using ``Object.assign(oldState, newState)`` there.
- _``$store.observeEntity(name, callback, scope, obj)``_ - start watching entity change: ``callback`` is called as entity is changed via ``setEntity`` or ``updateEntity``. ``scope`` object is used to apply changes after calling the callback; ``obj`` used to stop observing when ``obj`` is destroyed. Returns obserbing ``id`` used to stop obserbing.
- _``$store.stopObserving(name, id)``_ - stop observing the entity value change. ``id`` is a obserbing id given when from ``observeEntity`` function return.
- _``$store.removeEntity(name)``_ - removes entity by ``name``.