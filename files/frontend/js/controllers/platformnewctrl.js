angular.
  module("PlatformNewController",[]).
  controller("PlatformNewController", ["$scope", "$http",function($scope, $http) {
    $scope.submitForm=function(){
        var data = {};
        data.platform = $scope.platform;
        $http.post(
          "http://api.manager.loc/platforms",
          JSON.stringify(data),
          {headers: {'Content-Type': 'application/json'}}
        )
        .then(function(response) {
            Notification.success('Your new platform has been added to the list');
            return response;
        }, function(response) {
            Notification.error('Error creating platform, please try again');
            console.log(response);
        });
    }
}])
