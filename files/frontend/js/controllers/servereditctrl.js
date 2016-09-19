angular.
  module("ServerEditController",[]).
  controller("ServerEditController", ["server", "$window", "$scope", "$http", "Notification",function(server, $window, $scope, $http, Notification) {
    $scope.server = server.data;
    $scope.edit = function(){
        var data = {};
        data = $scope.server;
        $http.put(
            "http://api.manager.loc/servers/" + $scope.server.id,
            JSON.stringify(data),
            {headers: {'Content-Type': 'application/json'}}
        )
        .then(function(response) {
            Notification.success('Your server has been edited');
            $window.location.href = '/#/servers';
        }, function(response) {
            Notification.error("Error editing server, please try again");
            console.log(response);
        });
    }
    $scope.delete=function(){
        $http.delete(
            "http://api.manager.loc/servers/" + $scope.server.id,
            JSON.stringify($scope.server),
            {headers: {'Content-Type': 'application/json'}}
        )
        .then(function(response) {
            Notification.success('Your server has been deleted');
            $window.location.href = '/#/servers';
        }, function(response) {
            Notification.success("Error deleting server, please try again");
            console.log(response);
        });
      }
}])
