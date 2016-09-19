angular.
  module('Platforms', []).
  service("Platforms", ['$http',function($http) {
    this.getPlatforms = function() {
        return $http.get("http://api.manager.loc/platforms").
            then(function(response) {
                return response;
            }, function(response) {
                console.log(response);
                alert("Error finding platforms.");
            });
          }
    }])
