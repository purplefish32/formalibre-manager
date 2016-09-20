angular.
  module('Servers',[]).
  service("Servers", ["$http","Config",function($http,Config) {
      this.getServers = function() {
          return $http.get(Config.api_url+"servers").
              then(function(response) {
                  return response;
              }, function(response) {
                  console.log(response);
                  alert("Error finding servers.");
              });
      }

      this.getServer = function(id) {
          return $http.get(Config.api_url+"/servers/" + id).
              then(function(response) {
                  return response;
              }, function(response) {
                  console.log(response);
                  alert("Error finding server.");
              });
      }
  }])
