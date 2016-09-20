angular.
  module("ServersController",["Servers"]).
  controller("ServersController", ["Servers","$scope",function(Servers, $scope) {
    $scope.servers = Servers.list;
  }])
