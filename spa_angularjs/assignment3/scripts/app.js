(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItems);

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var ctrl = this;
        ctrl.searchTerm = "";
        ctrl.search = function () {
            MenuSearchService.getMatchedMenuItems(ctrl.searchTerm).then(function (response) {
                ctrl.found = response;
                console.log(response);
            });
        }
        ctrl.removeItem = function (index) {
            ctrl.found.splice(index,1);
        }
    }

    MenuSearchService.$inject = ['$http'];
    function MenuSearchService($http) {
        var service = this;

        service.getMatchedMenuItems = function (searchTerm) {
            return $http({
                method: "GET",
                url: "https://davids-restaurant.herokuapp.com/menu_items.json"
            }).then(function (result) {
                var foundItems = [];
                var searchTermRegex = new RegExp(searchTerm, "i");
                result.data.menu_items.forEach(item => {
                    if (searchTermRegex.test(item.description))
                        foundItems.push(item);
                });;
                return foundItems;
            });
        };
    }

    function FoundItems() {
        var ddo = {
            templateUrl: "foundItems.html"
        };
        return ddo;
    }

})();