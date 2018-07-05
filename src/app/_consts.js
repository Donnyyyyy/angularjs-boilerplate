export const initialStoreEntites = ($id) => {
	return [
		// System related
		{
			name: '$navbar/tabs',
			value: [
				{
					name: 'Main',
					link: '/',
					id: $id.get()
				},
				{
					name: 'About',
					link: '/about',
					id: $id.get()
				},
			]
		},
		{
			name: '$navbar/active',
			value: 'Главная'
		},
		{
			name: '$modal',
			value: ''
		},
		{
			name: 'user/$new-value',
			value: {},
		},
		{
			name: '$dropdown',
			value: ''
		},
		{
			name: '$error',
			value: '',
		},
		// Api based
		{
			name: 'user',
			value: {
				firstName: 'Анонимый',
				lastName: 'Аноним',
			}
		},
	];
};
