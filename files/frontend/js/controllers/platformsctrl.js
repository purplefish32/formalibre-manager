angular.
  module("PlatformsController",[]).
  controller("PlatformsController", ["platforms","$scope",function(platforms, $scope) {
    $scope.platforms = platforms.data;
  }])
