(function () {
    'use strict';

    angular.module('assignmentTwoApp', [])
        .controller('ShoppingListShowToBuyCtrl', ShoppingListShowToBuyCtrl)
        .controller('ShoppingListShowAlreadyBoughtCtrl', ShoppingListShowAlreadyBoughtCtrl)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ShoppingListShowToBuyCtrl.$inject = ['ShoppingListCheckOffService'];
    function ShoppingListShowToBuyCtrl(ShoppingListCheckOffService) {
        var toBuy = this;
        toBuy.items = ShoppingListCheckOffService.getToBuyItems();
        toBuy.buyItem = function (itemIndex) {
            ShoppingListCheckOffService.buyItem(itemIndex);
        }
        toBuy.isEmpty = function () {
            return toBuy.items.length === 0;
        }
    }

    ShoppingListShowAlreadyBoughtCtrl.$inject = ['ShoppingListCheckOffService'];
    function ShoppingListShowAlreadyBoughtCtrl(ShoppingListCheckOffService) {
        var AlreadyBought = this;
        AlreadyBought.items = ShoppingListCheckOffService.getBoughtItems();
        AlreadyBought.isEmpty = function () {
            return AlreadyBought.items.length === 0;
        }
    }

    function ShoppingListCheckOffService() {

        var service = this;

        var toBuy = [
            { name: "cookie", quantity: 10 },
            { name: "milk", quantity: 2 },
            { name: "lettuce", quantity: 2 },
            { name: "oranges", quantity: 5 },
            { name: "avocado", quantity: 4 }
        ];

        var bought = [];

        service.buyItem = function (itemIndex) {
            var item = toBuy.splice(itemIndex, 1)[0];
            bought.push(item);
        };

        service.getToBuyItems = function () {
            return toBuy;
        };

        service.getBoughtItems = function () {
            return bought;
        };

    }

})();