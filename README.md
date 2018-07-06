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
$ git clone https://github.com/Donnyyyyy/angularjs-boilerplate my-app

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
    * [Views and routing](#views-and-routing)
    * [Components](#components)
    * [Modals](#modals)
    * [Public data](#public-data)
    * [Styles](#styles)
    * [More](#more)

# Architecture

## Store

Store is a service where all your app data is stored.

- _``$store.createEntity(name, initialState)``_ - creates store entity with given ``name`` and ``initialState``.
- _``$store.getEntity(name)``_ - retrieves an entity by ``name``.
- _``$store.setEntity(name, newState)``_ - replaces an entity by ``name`` to ``newState``.
- _``$store.updateEntity(name, newState)``_ - updates an entity by ``name`` with ``newStaKte``. Different from ``setEntity`` by using ``Object.assign(oldState, newState)`` there.
- _``$store.observeEntity(name, callback, scope, obj)``_ - start watching entity change: ``callback`` is called as entity is changed via ``setEntity`` or ``updateEntity``. ``scope`` object is used to apply changes after calling the callback; ``obj`` is a AngularJS controller used to stop observing when ``obj`` is destroyed. Returns obserbing ``id`` used to stop obserbing.
- _``$store.stopObserving(name, id)``_ - stop observing the entity value change. ``id`` is a obserbing id given when from ``observeEntity`` function return.
- _``$store.removeEntity(name)``_ - removes entity by ``name``.

Entities are named according to the following rules:

1. Lowercase, words divided by ``-``, e.g. ``user-info``
2. If an entity related to another, it's "parent" is contained in its name before ``/``, e.g. ``user/friends``
3 System related entites starts with ``$``. If such entity is related to non-sysem related, ``$`` is placed after ``/``, e.g. ``user/$is-updated``

Store entites are divided into two groups: system related and data.

System related entites are responsible for frontend functionallity such as ``$error`` (error data), ``$modal`` current shown modal name and so on.

Data entites are retrieved through API and supposed to be displayed to user.

## Views and routing

Views and routing are registred in ``app/app.config.js``.

For each view new folder is created in ``views`` dir with ``index.js`` containing view code and ``<view-name>.html``.

Example view:

```js
import template from './view.html';


class ViewController {
    constructor($store) {
        this.$store = $store;
        this.$store.setEntity('$navbar/active', 'View');
        this.bind();
    }

    bind() {
        // Register your store watchers here
    }
    
    static get $inject() {
        return [
            '$store'
        ];
    }
}


export default {
    template: template,
    controller: ViewController,
    controllerAs: 'ctrl',
    title: '<view-title>'
};
```

## Components

Components live in ``components`` folder. For each component ``index.js`` and ``<component-name>.html`` files are created.

Example component:

```js
import template from './example.html';


export default class Example {

  static get name() { return 'exExample'; }

  constructor($scope, $store) {
    this.$store = $store;
    this.$scope = $scope;
    this.bind();
  }

  bind() {
    // Register your store watchers here
  }

  error() {
    this.$store.setEntity('$modal', 'error');
  }

  static get $inject() {
    return [
      '$scope',
      '$store',
    ];
  }

  static get Component() {
    return [Example.name, {
      template: template,
      controller: Example,
      controllerAs: 'ctrl',
    }];
  }
}
```

Components are registered in ``components/index.js`` by adding a line

```js
import ExampleComponent from './example';


angular.module('project.components', [])
    ...
    .component(...Example.Component)
```

## Modals

Modals are components extended from ``Modal`` class. Lives in ``components/modals`` folder.

Example modal:

```js
import Modal from '../modal';
import template from './error.html';


export default class ErrorModal extends Modal {

	static get name() { return 'exErrorModal'; }
	get id() { return 'error'; }

	bind() {
		super.bind();
		this.$store.observeEntity('$error', ($error) => {
			this.message = $error;
		}, this.$scope, this);
	}

	static get Component() {
		return [ErrorModal.name, {
			template: template,
			controller: ErrorModal,
			controllerAs: 'ctrl'
		}]
	}
}
```

Modals registred similar to components.

## Public data

Public data is stored in ``public`` folder. Public data is not a part of a buldle, so it must be already minified/compressed and should not change frequentle through versions.

## Styles

Styles are a part of a bundle. Styles located in ``styles`` folder and registred in ``styles/index.js`` bu importing. 

## More

For AngularJS documentation visit [google.com](google.com) or contact me.

