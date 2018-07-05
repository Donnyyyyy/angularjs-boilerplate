import angular from 'angular';

import { storeServiceName, StoreService } from './store.service';
import { idServiceName, IdService } from './id.service';
import { apiServiceName, ApiService } from './api.service';
import { dingoServiceName, DingoService } from './dingo.service';

export default angular.module('project.services', [])
	.service(idServiceName, IdService)
	.service(storeServiceName, StoreService)
	.service(apiServiceName, ApiService)
	.service(dingoServiceName, DingoService)
	.name;