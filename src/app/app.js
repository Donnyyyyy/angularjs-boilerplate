import angular from 'angular';
import ngRoute from 'angular-route';

import config from './app.config';
import run from './app.run';
import preload from './preload';
import servicesModule from '../services';
import directivesModule from '../directives';
import componentsModule from '../components';
import constantsModule from './constants';

import '../styles';


angular.module('project', [
  ngRoute,
  constantsModule,
  directivesModule,
  servicesModule,
  componentsModule,
]).config(config)
  .run(preload)
  .run(run);