angular.
  module("ServersController",[]).
  controller("ServersController", ["Servers","$scope",function(Servers, $scope) {
    $scope.servers = Servers.list;
  }])
