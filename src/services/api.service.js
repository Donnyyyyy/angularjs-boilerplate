export class ApiService {
    constructor() {
        this.serverUrl = (localStorage.getItem('debug') === 'true') ? localStorage.getItem('serverUrl') : '/api/graphene';
        console.debug(this.serverUrl);

        this.queries = [
            // <api names>
        ];

        this.mutations = [
            // <api names>
        ];

        this.syncAnyway = {
            // <api name> : <store endpoint>
        };

        this.syncLoggedInOnly = {
            // <api name> : <store endpoint>
        };

        this.synced = Object.assign({}, this.syncAnyway, {})
        this.go = client(this.serverUrl);
    }

    static get $inject() {
        return [
            '$store'
        ];
    }

    mutate(mutation, args) {
        var m = this.mutations[mutation]
        return this.go(m.result.query, args)
            .then(m => {
                console.debug(m[mutation]);
                return m;
            })
    }

    query(query, args, fields) {
        if (fields) {
            var q = this.queries[query].result.queryBuilder(fields)
        } else {
            var q = this.queries[query].result.query;
        }
        return this.go(q, args)
            .then(q => {
                console.debug(q[query])
                return q;
            })
    }

    sync(query, args, fields) {
        var q;
        if (fields) {
            q = this.queries[query].result.queryBuilder(fields)
        } else {
            q = this.queries[query].result.query;
        }
        return this.go(q, args)
            .then(q => {
                console.debug(q[query])
                $store.updateEntity(query, q[query]);
                return q;
            });
    }
}


export const apiServiceName = '$api';
