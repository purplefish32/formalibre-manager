angular.
  module("PlatformsController",['Platforms']).
  controller("PlatformsController", ["platforms","$scope",function(platforms, $scope) {
    $scope.platforms = platforms.data;
  }])
