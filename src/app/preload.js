import { initialStoreEntites } from './_consts';

export default function preload($store, $id) {
	initialStoreEntites($id).forEach(storeEntity => {
		$store.createEntity(storeEntity.name, storeEntity.value)
	});

	$store.createEntity('$navbar/tabs', [
		{
			name: 'Главная',
			link: '/dashboard',
			id: $id.get()
		},
	]);
}


preload.$inject = ['$store', '$id'];
