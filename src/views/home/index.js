import template from './home.html';


class HomeController {
    constructor($store) {
        this.$store = $store;
        this.$store.setEntity('$navbar/active', 'Главная');
    }
    
    static get $inject() {
        return [
            '$store'
        ];
    }
}


export default {
    template: template,
    controller: HomeController,
    controllerAs: 'ctrl',
    title: 'Главная'
};
