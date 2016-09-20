protocol ="http://"
base_url = "manager.loc/"

angular.
  module("managerApp", [
    'angular-loading-bar',
    'Router'
  ]).
  value('Config', {
    api_url:protocol+"api."+base_url
  })
