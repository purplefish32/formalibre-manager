angular.
  module("ServerNewController",[]).
  controller("ServerNewController", ["$window", "$scope", "$http", "Notification",function($window, $scope, $http, Notification) {
    $scope.submitForm=function(){
        var server = $scope.server;
        $http.post(
          "http://api.manager.loc/servers",
          JSON.stringify(server),
          {headers: {'Content-Type': 'application/json'}}
        )
        .then(function(response) {
            Notification.success('Your new server has been added to the list');
            $window.location.href = '/#/servers';
        }, function(response) {
            Notification.error('Error creating server, please try again');
            console.log(response);
        });
    }
}])
