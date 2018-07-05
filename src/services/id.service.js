const ID_LENGTH = 16


export class IdService {
    constructor() {
        this.ids = {}
    }

    static get $inject() {
        return [
        ]
    }

    static makeid() {
        var text = ""
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
        for (var i = 0; i < ID_LENGTH; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length))
        }
        return text
    }

    get() {
        var newid = IdService.makeid()
        while (this.ids[newid] !== undefined) {
            newid = IdService.makeid()
        }
        this.ids[newid] = true
        return newid
    }
}


export const idServiceName = '$id'
