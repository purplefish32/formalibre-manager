protocol ="http://"
base_url = "manager.loc/"

angular.
  module("managerApp", [
    'ngRoute',
    'ui-notification',
    'angular-loading-bar',    
    'Router',
    'Platforms',
    'Servers',
    'ListController',
    'ServersController',
    'PlatformsController',
    'ServerNewController',
    'ServerEditController',
    'PlatformNewController'
  ]).
  value('Config', {
    api_url:protocol+"api."+base_url
  })
