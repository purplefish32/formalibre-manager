angular.
  module("PlatformNewController",[]).
  controller("PlatformNewController", ["$scope", "$http","Config",function($scope, $http,Config) {
    $scope.submitForm=function(){
        var data = {};
        data.platform = $scope.platform;
        $http.post(
          Config.api_url+"platforms",
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
