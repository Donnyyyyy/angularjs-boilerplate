import template from './navbar.html';


export default class Navbar {

  static get name() { return 'exNavbar'; }

  constructor($scope, $store, $api) {
    this.$store = $store;
    this.$api = $api;
    this.mobileMenuIsShow = false;

    $store.observeEntity('$navbar/tabs', (tabs) => {
      this.tabs = tabs;
    }, $scope, this);

    $store.observeEntity('$navbar/active', (activeTab) => {
      this.activeTab = activeTab;
    }, $scope, this);

    $store.observeEntity('user', (user) => {
      this.user = Object.assign({}, $store.getEntity('user'));
    }, $scope, this);
  }

  toggleMobileMenu() {
    this.mobileMenuIsShow = !this.mobileMenuIsShow;
  };

  logout() {
    console.log('Logging out');
  }

  closeMobileMenu() {
    this.mobileMenuIsShow = false;
  }

  activate(name) {
    this.$store.updateEntity('$navbar/active', name);
  }

  static get $inject() {
    return [
      '$scope',
      '$store',
      '$api',
    ]
  }

  static get Component() {
    return [Navbar.name, {
      template: template,
      controller: Navbar,
      controllerAs: 'ctrl'
    }]
  }
}
