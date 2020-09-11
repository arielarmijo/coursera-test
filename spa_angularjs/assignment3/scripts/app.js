(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItems);

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var menu = this;
        menu.searchTerm = "";
        menu.search = function () {
            MenuSearchService.getMatchedMenuItems(menu.searchTerm).then(function (response) {
                console.log(response);
                menu.found = response;
                if (response.length == 0)
                    menu.message = "Nothing found!";
                else
                    menu.message = "";
            });
        }
        menu.removeItem = function (index) {
            menu.found.splice(index,1);
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
                    if (searchTerm && searchTermRegex.test(item.description))
                        foundItems.push(item);
                });;
                return foundItems;
            });
        };
    }

    function FoundItems() {
        var ddo = {
            restrict: 'E',
            templateUrl: 'foundItems.html',
            scope: {
                foundItems: '<',
                onEmpty: '<',
                onRemove: '&'
            },
            controller: NarrowItDownController,
            controllerAs: 'menu',
            bindToController: true
        };

        return ddo;
    }

})();