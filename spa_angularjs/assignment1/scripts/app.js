(function () {
'use strict';

angular.module('LunchCheckApp', []).controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope) {
  $scope.dishes = "";
  $scope.check = function () {
    var msg;
    var dishes = $scope.dishes.split(",").map(item => item.trim()).filter(item => item != "");
    var n = dishes.length;
    if (n == 0) {
      $scope.msgStyle = {"color": "red"};
      $scope.message = "Please enter data first" ;
    } else {
      $scope.msgStyle = {"color": "green"};
      $scope.message = n <= 3 ? "Enjoy!" : "Too much!" ;
    }
    console.log(dishes);
  }
}

})();
