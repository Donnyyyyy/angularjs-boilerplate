export class DingoService {
	constructor($store, $api) {
		this.$store = $store
		this.$api = $api

		var typeQueryBuilders = {
			'SCALAR': () => '',
			'NON_NULL': (type) => type.ofType ? queryType(type.ofType) : '',
			'ENUM': () => '',
			'UNION': (type) => {
				type = getType(type.name);
				return `{ ${type.possibleTypes.reduce((query, type) => query + ` ... on ${type.name} ${queryType(type)} `, '')} }`
			},
			'OBJECT': (type, only_fields) => {
				var fields = only_fields ? getType(type.name).fields.filter(field => only_fields.indexOf(field.name) >= 0) : getType(type.name).fields;
				var fieldQuery = [];
				for (var i = 0; i < fields.length; i++) {
					fieldQuery.push(`${fields[i].name} ${queryType(fields[i].type)}`);
				}
				return `{ ${fieldQuery.join(' ')} }	`;
			},
			'LIST': (type) => queryType(type.ofType),
		}

		var typeValidators = {
			'SCALAR': (variable) => typeof (variable) !== 'object',
			'NON_NULL': (variable) => variable !== null && variable !== undefined,
			'ENUM': (variable) => true,
			'UNION': (variable) => true,
			'OBJECT': (variable) => typeof (variable) === 'object',
			'LIST': (variable) => Array.isArray(variable),
		}

		function getType(typeName) {
			return schema.data.__schema.types.filter(schemaType => schemaType.name === typeName)[0];
		}

		/**
		 * Generates a query for a given type
		 * 
		 * @param type graphql type
		 */
		function queryType(type, only_fields) {
			var query = typeQueryBuilders[type.kind](type, only_fields);
			return query;
		}

		/**
		 * Fetches data from remote source using introspected schema.
		 * 
		 * @param {object} entity object fetched using graphql introspection
		 */
		function sync(entity) {
			var query = `{ ${entity.name} ${queryType(entity.type)} }`
			$api.go(query, {})
				.then(response => $store.updateEntity($api.synced[entity.name], response[entity.name]))
		}


		/**
		 * Shortcut function to sync a list of entities 
		 * 
		 * @param {iterable} updateSyncList list of entites
		 */
		function syncAll(updateSyncList, sameQuery) {
			sameQuery = sameQuery === undefined ? true : sameQuery;

			if (sameQuery) {
				var query = `{ ${updateSyncList.reduce((query, entity) => query + ` ${entity.name} ${queryType(entity.type)} `, '')} }`;
				// If nothing to sync
				if (query === '{  }'){
					return [];
				}
				console.debug(query);

				$api.go(query, {})
					.then(
						response => Object.keys(response).map(name => $store.updateEntity($api.synced[name], response[name])),
						error => console.log(error)
					)
					.then(data => console.debug)
			} else {
				updateSyncList.forEach(sync);
			}
			return updateSyncList;
		}

		/**
		 * Checks the store for entities may be synced with api.
		 * To prevent excess requests, serialized version stored in localStorage
		 * 
		 * @param {itarable} supportedQueries list of queries returned by introspection
		 * @returns promise resolving syncedEntities
		 */
		function updateSyncList(supportedQueries) {
			return new Promise((resolve, reject) => {
				resolve(supportedQueries.filter(query => query.name in $api.synced))
			})
		}

		function getTypeName(type, required) {
			var name = '';
			if (type.kind === 'SCALAR') {
				name = type.name;
			} else if (type.kind === 'NON_NULL') {
				return getTypeName(type.ofType, true);
			} else if (type.kind === 'LIST') {
				name = `[${getTypeName(type.ofType)}]`;
			} else {
				name = type.name;
			}
			return `${name}${required ? '!' : ''}`
		}

		function prepareApiQuery(query, isMutation) {
			var args = query.args.map(arg => {
				return {
					name: arg.name,
					validator: typeValidators[arg.type.kind],
				}
			});
			var result = {
				query: `${isMutation ? 'mutation' : 'query'}${query.args.length > 0 ? `(${query.args.map(arg => `$${arg.name}:${getTypeName(arg.type)}`)})` : ''} {
				 ${query.name}${query.args.length > 0 ? `(${query.args.map(arg => `${arg.name}:$${arg.name}`)})` : ''} ${queryType(query.type)}
				}`,
				queryBuilder: (only_fields) => `${isMutation ? 'mutation' : 'query'}${query.args.length > 0 ? `(${query.args.map(arg => `$${arg.name}:${getTypeName(arg.type)}`)})` : ''} {
					${query.name}${query.args.length > 0 ? `(${query.args.map(arg => `${arg.name}:$${arg.name}`)})` : ''} ${queryType(query.type, only_fields)}
				}`,
				type: query.type,
			};

			return {
				args: args,
				result: result
			}
		}

		function updateApiQueries(supportedQueries) {
			var queryIndex = {}
			var queries = supportedQueries.filter(supportedQuery => $api.queries.indexOf(supportedQuery.name) >= 0);

			for (var query of queries) {
				queryIndex[query.name] = prepareApiQuery(query);
			}
			console.debug('api', queryIndex);
			$api.queries = queryIndex;
			return supportedQueries;
		}

		function updateApiMutations(supportedMutations) {
			var mutationsIndex = {};
			var mutations = supportedMutations.filter(supportedMutation => $api.mutations.indexOf(supportedMutation.name) >= 0);

			for (var mutation of mutations) {
				mutationsIndex[mutation.name] = prepareApiQuery(mutation, true);
			}
			console.debug('api', mutationsIndex);
			$api.mutations = mutationsIndex;
			return supportedMutations;
		}

		var supportedQueries = schema.data.__schema.types.filter(type => type.name === schema.data.__schema.queryType.name)[0].fields;
		updateApiQueries(supportedQueries);

		var supportedMutations = schema.data.__schema.types.filter(type => type.name === schema.data.__schema.mutationType.name)[0].fields;
		updateApiMutations(supportedMutations);
		console.debug($api.mutations);

		updateSyncList(supportedQueries)
			.then((syncedEntities) => syncAll(syncedEntities))
			.then((syncedEntities) => console.debug(syncedEntities))
	}

	init() {
	}

	static get $inject() {
		return [
			'$store',
			'$api'
		]
	}
}


export const dingoServiceName = '$dingo'
