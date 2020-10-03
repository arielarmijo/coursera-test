(function () {
    "use strict";

    angular.module('public')
    .controller('SignupController', SignupController);

    SignupController.$inject = ['MyInfoService', 'MenuService', 'ApiPath'];
    function SignupController(MyInfoService, MenuService, ApiPath) {
        var ctrl = this;
        ctrl.userInfo = {};
        ctrl.saved = false;
        ctrl.validShortCode = false;
        ctrl.itemSearched = false;
        ctrl.basePath = ApiPath;

        ctrl.setMyinfo = function() {
            MyInfoService.setMyinfo(ctrl.userInfo);
            ctrl.saved = true;
        };

        ctrl.validateFavdish = function() {
            ctrl.validShortCode = false;
            ctrl.itemSearched = false;

            if(typeof ctrl.userInfo.favoriteDish === 'undefined') return;
            if(ctrl.userInfo.favoriteDish.trim().length <= 0) return;

            MenuService.getMenuItem(ctrl.userInfo.favoriteDish).then(
                function(response) {
                    ctrl.userInfo.MenuItem = response.data;
                    ctrl.validShortCode = true;
                    ctrl.itemSearched = true;
                },
                function(response) {
                    ctrl.itemSearched = true;
                }
            );
        };


    }
})();