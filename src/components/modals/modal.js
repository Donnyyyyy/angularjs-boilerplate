import Component from '../base-component';

export default class Modal extends Component {
	constructor($scope, $store) {
		super();
		this.$scope = $scope;
		this.$store = $store;
		this.bind()
	}

	bind() {
		this.$store.observeEntity('$modal', (modal) => {
			this.closing = false;
			this.modal = modal;
		}, this.$scope, this);
	}

	close() {
		this.closing = true;
		setTimeout(() => {
			this.$store.setEntity('$modal', '');
		}, 500);
	}

	static get $inject() {
		return [
			'$scope',
			'$store',
		]
	}
}
