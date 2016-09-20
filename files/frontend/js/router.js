angular.
  module('Router', []).
  config(['$routeProvider', '$locationProvider', 'NotificationProvider', 'cfpLoadingBarProvider',function($routeProvider, $locationProvider, NotificationProvider, cfpLoadingBarProvider) {
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
}])
