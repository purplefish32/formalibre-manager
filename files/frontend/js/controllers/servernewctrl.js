angular.
  module("ServerNewController",[]).
  controller("ServerNewController", ["$window", "$scope", "$http", "Notification","Config",function($window, $scope, $http, Notification,Config) {
    $scope.submitForm=function(){
        var server = $scope.server;
        $http.post(
          Config.api_url+"servers",
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
