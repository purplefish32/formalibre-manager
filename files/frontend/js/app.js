angular.module("managerApp", ['ngRoute'])
    .config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "dashboard.html",
                controller: "ListController",
            })
            .when("/platforms", {
                controller: "PlatformsController",
                templateUrl: "platforms.html",
                resolve: {
                  platforms: function(Platforms) {
                    return Platforms.getPlatforms();
                  }
                }
            })
            .when("/servers", {
                controller: "ServersController",
                templateUrl: "servers.html",
                resolve: {
                  servers: function(Servers) {
                    return Servers.getServers();
                  }
                }
            })
            .when("/server/new", {
                controller: "ServerNewController",
                templateUrl: "serverNew.html"
            })
            .when("/platform/new", {
                controller: "PlatformNewController",
                templateUrl: "platformNew.html"
            })
            .otherwise({
                redirectTo: "/404",
                templateUrl: "404.html",
            })
        // use the HTML5 History API
        //$locationProvider.html5Mode(true);
    })
    .service("Platforms", function($http) {
        this.getPlatforms = function() {
            return $http.get("http://api.manager.loc/platforms").
                then(function(response) {
                    return response;
                }, function(response) {
                    console.log(response);
                    alert("Error finding platforms.");
                });
        }
    })
    .service("Servers", function($http) {
        this.getServers = function() {
            return $http.get("http://api.manager.loc/servers").
                then(function(response) {
                    return response;
                }, function(response) {
                    console.log(response);
                    alert("Error finding servers.");
                });
        }
    })
    .controller("ListController", function() {
        console.log("hi");
    })
    .controller("PlatformsController", function(platforms, $scope) {
        $scope.platforms = platforms.data;
    })
    .controller("ServersController", function(servers, $scope) {
        $scope.servers = servers.data;
    })
    .controller("ServerNewController", function($scope, $http) {
        $scope.submitForm=function(){
            var data = {};
            data.server = $scope.server;
            $http.post(
              "http://api.manager.loc/servers",
              JSON.stringify(data),
              {headers: {'Content-Type': 'application/json'}}
            )
            .then(function(response) {
                return response;
            }, function(response) {
                console.log(response);
                alert("Error creating server.");
            });
        }
    })
    .controller("PlatformNewController", function($scope, $http) {
        $scope.submitForm=function(){
            var data = {};
            data.platform = $scope.platform;
            $http.post(
              "http://api.manager.loc/platforms",
              JSON.stringify(data),
              {headers: {'Content-Type': 'application/json'}}
            )
            .then(function(response) {
                return response;
            }, function(response) {
                console.log(response);
                alert("Error creating platform.");
            });
        }
    })
