import template from './example.html';


export default class Example {

  static get name() { return 'exExample'; }

  constructor($scope, $store) {
    console.log('I am example!');
    
    this.$store = $store;
    this.$scope = $scope;
    this.bind();
  }

  bind() {
    // Init self/store watchers 
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
