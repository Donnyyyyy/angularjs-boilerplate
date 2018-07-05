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