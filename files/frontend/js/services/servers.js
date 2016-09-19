angular.
  module('Servers',[]).
  service("Servers", ["$http",function($http) {
      this.getServers = function() {
          return $http.get("http://api.manager.loc/servers").
              then(function(response) {
                  return response;
              }, function(response) {
                  console.log(response);
                  alert("Error finding servers.");
              });
      }

      this.getServer = function(id) {
          return $http.get("http://api.manager.loc/servers/" + id).
              then(function(response) {
                  return response;
              }, function(response) {
                  console.log(response);
                  alert("Error finding server.");
              });
      }
  }])
