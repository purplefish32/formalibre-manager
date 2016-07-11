angular.module("managerApp", ['ngRoute'])
    .config(function($routeProvider) {
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
            .otherwise({
                redirectTo: "/"
            })
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
    .controller("ListController", function() {
        console.log("hi");
    })
    .controller("PlatformsController", function(platforms, $scope) {
        $scope.platforms = platforms.data;
        console.log(platforms.data);
    })
