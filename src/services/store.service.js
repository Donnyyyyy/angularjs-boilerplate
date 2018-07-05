const AVADA_KEDAVRA = ['{}', '[]', 'undefined', '""'];


/**
 * @class StoreService is a service where all your app data is stored.
 */
export class StoreService {
  constructor($id) {
    this.$id = $id;
    this.subscribers = {};
    this.entities = {};
    window.st = this;
  }

  static removeFromList(array, id) {
    var index = -1;
    for (var i = 0; i < array.length; i++) {
      if (array[i].id === id) {
        index = i;
      }
    }
    if (index > -1) {
      array.splice(index, 1);
    }
    return array;
  }

  /**
   * Start watching entity change: ``callback`` is called as entity is changed via ``setEntity`` or ``updateEntity``.
   * 
   * Returns obserbing ``id`` used to stop obserbing.
   * 
   * @param {string} name entity ``name`` to be observed
   * @param {function} callback function 
   * @param {*} scope watcher ``scope`` to apply changes after calling the callback
   * @param {*} obj object used to stop observing when ``obj`` is destroyed.
   * @memberof StoreService
   */
  observeEntity(name, callback, scope, obj) {
    if (this.subscribers[name] === undefined) {
      this.subscribers[name] = [];
    }
    var id = this.$id.get();
    this.subscribers[name].push({ 'callback': callback, 'scope': scope, id: id });

    if (AVADA_KEDAVRA.indexOf(JSON.stringify(this.entities[name])) < 0) {
      callback(this.entities[name]);
    }

    if (obj) {
      var oldDestr = obj.$onDestroy || (() => { });
      obj.$onDestroy = () => {
        this.stopObserving(name, id);
        oldDestr();
      };
    }
    return id;
  }

  /**
   * Stop observing the entity changes.
   *
   * @param {string} name entity ``name`` to stop observing.
   * @param {id} id obserbing id given when from ``observeEntity`` function return.
   * @memberof StoreService
   */
  stopObserving(name, id) {
    this.subscribers[name] = StoreService.removeFromList(this.subscribers[name], id);
  }

  /**
   * Replaces an entity by ``name`` to ``newState``.
   *
   * @param {string} name entity ``name`` to be set 
   * @param {*} newState new entity value
   * @memberof StoreService
   */
  setEntity(name, newState) {
    console.debug(name, newState);

    if (this.subscribers[name] === undefined) {
      throw new Error(`Trying to set non-existant entity - ${name}`);
    }

    this.entities[name] = newState;
    setImmediate(() => {
      this.subscribers[name].forEach(subsriber => {
        subsriber.scope.$apply(() => {
          subsriber.callback(this.getEntity(name));
        });
      });
    });
    return newState;
  }

  /**
   * Updates an entity by ``name`` with ``newState``.
   * 
   * Different from ``setEntity`` by using ``Object.assign(oldState, newState)`` there.
   *
   * @param {string} name entity ``name`` to be updated
   * @param {*} newState new entity value
   * @memberof StoreService
   */
  updateEntity(name, newState) {
    try {
      return this.setEntity(
        name,
        Object.assign(this.entities[name], newState)
      );
    } catch (e) {
      return this.setEntity(
        name,
        newState
      );
    }
  }

  /**
   * Removes entity by ``name``
   *
   * @param {string} name entity name to be removed
   * @memberof StoreService
   */
  removeEntity(name) {
    this.entities[name] = undefined;
    this.subscribers[name] = undefined;
  }

  /**
   * Retrieves an entity by ``name``
   *
   * @param {string} name entity ``name`` to be retrieved
   * @memberof StoreService
   */
  getEntity(name) {
    return this.entities[name];
  }

  /**
   * Creates store entity with given ``name`` and ``initialState``
   *
   * @param {string} ``name`` entity name
   * @param {*} initialState initial entity value
   * @memberof StoreService
   */
  createEntity(name, initialState) {
    if (this.entities[name] !== undefined) {
      return;
    }
    this.entities[name] = initialState;
    this.subscribers[name] = [];
  }

  static get $inject() {
    return [
      '$id'
    ];
  }
}


export const storeServiceName = '$store';
