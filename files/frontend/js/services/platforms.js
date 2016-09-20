angular.
  module('Platforms', []).
  service("Platforms", ['$http',"Config",function($http,Config) {
    this.getPlatforms = function() {
        return $http.get(Config.api_url+"platforms").
            then(function(response) {
                return response;
            }, function(response) {
                console.log(response);
                alert("Error finding platforms.");
            });
          }
    }])
