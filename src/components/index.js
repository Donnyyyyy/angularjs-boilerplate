import angular from 'angular';

import ExampleComponent from './example';
import ErrorModal from './modals/error';
import Navbar from './navbar';
import Footer from './footer';


export default angular.module('project.components', [])
	.component(...ExampleComponent.Component)
	.component(...ErrorModal.Component)
	.component(...Navbar.Component)
	.component(...Footer.Component)
	.name;