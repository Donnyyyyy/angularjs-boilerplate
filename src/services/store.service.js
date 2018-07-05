const AVADA_KEDAVRA = ['{}', '[]', 'undefined', '""'];


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

  stopObserving(name, id) {
    this.subscribers[name] = StoreService.removeFromList(this.subscribers[name], id);
  }

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

  removeEntity(name) {
    this.entities[name] = undefined;
    this.subscribers[name] = undefined;
  }

  getEntity(name) {
    return this.entities[name];
  }

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
