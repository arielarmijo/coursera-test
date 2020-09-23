(function () {
    'use strict';

    angular.module('MenuApp')
    .controller('ItemController', ItemController);

    ItemController.$inject = ['items'];
    function ItemController(items) {
        var item = this;
        item.items = items.data.menu_items;
    }

})();