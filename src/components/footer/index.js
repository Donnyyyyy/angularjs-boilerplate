import template from './footer.html';


export default class Footer {
  static get name() { return 'exFooter'; }

  constructor($scope, $store) {
    this.$scope = $scope;
    this.$scope = $store;
  }

  static get $inject() {
    return [
      '$scope',
      '$store',
    ];
  }

  static get Component() {
      return [Footer.name, {
          template: template,
          controller: Footer,
          controllerAs: 'ctrl'
      }];
  }
}
