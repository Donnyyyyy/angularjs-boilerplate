import template from './about.html';


class AboutController {
    constructor($store) {
        this.$store = $store;
        this.$store.setEntity('$navbar/active', 'About');
    }
    
    static get $inject() {
        return [
            '$store'
        ];
    }
}


export default {
    template: template,
    controller: AboutController,
    controllerAs: 'ctrl',
    title: 'Главная'
};
