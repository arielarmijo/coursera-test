(function () {
'use strict';

angular.module('LunchCheckApp', []).controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope) {
  
  $scope.check = function () {
    var msg;
    if ($scope.dishes == undefined || $scope.dishes == "") {
      $scope.msgStyle = {"color": "red"};
      msg = "Please enter data first" ;
    } else {
      var dishes = $scope.dishes.split(",").map(item => item.trim()).filter(item => item != "");
      $scope.msgStyle = {"color": "green"};
      msg = dishes.length <= 3 ? "Enjoy!" : "Too much!" ;
    }
    $scope.message = msg;
  }
}

})();
