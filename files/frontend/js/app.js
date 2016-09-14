angular.module("managerApp", ['ngRoute', 'ui-notification', 'angular-loading-bar'])
    .config(function($routeProvider, $locationProvider, NotificationProvider, cfpLoadingBarProvider) {
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
            .when("/server/edit/:id", {
                controller: "ServerEditController",
                templateUrl: "serverEdit.html",
                resolve: {
                  server: function(Servers, $route) {
                    return Servers.getServer($route.current.params.id);
                  }
                }
            })
            .when("/platform/new", {
                controller: "PlatformNewController",
                templateUrl: "platformNew.html"
            })
            .otherwise({
                redirectTo: "/404",
                templateUrl: "404.html",
            })
        NotificationProvider.setOptions({
            delay: 10000,
            startTop: 20,
            startRight: 10,
            verticalSpacing: 20,
            horizontalSpacing: 20,
            positionX: 'right',
            positionY: 'top'
        });

        cfpLoadingBarProvider.includeSpinner = false;
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

        this.getServer = function(id) {
            return $http.get("http://api.manager.loc/servers/" + id).
                then(function(response) {
                    return response;
                }, function(response) {
                    console.log(response);
                    alert("Error finding server.");
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
    .controller("ServerNewController", function($window, $scope, $http, Notification) {
        $scope.submitForm=function(){
            var server = {};
            server = $scope.server;
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
    })
    .controller("ServerEditController", function(server, $window, $scope, $http, Notification) {
        $scope.server = server.data;
        $scope.edit=function(){
            var data = {};
            data.server = $scope.server;
            $http.put(
                "http://api.manager.loc/servers/" + $scope.server.id,
                JSON.stringify(data),
                {headers: {'Content-Type': 'application/json'}}
            )
            .then(function(response) {
                Notification.success('Your server has been edited');
                $window.location.href = '/#/servers';
            }, function(response) {
                Notification.success("Error editing server, please try again");
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
                Notification.success('Your new platform has been added to the list');
                return response;
            }, function(response) {
                Notification.error('Error creating platform, please try again');
                console.log(response);
            });
        }
    })
