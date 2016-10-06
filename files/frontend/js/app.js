angular.
  module("managerApp", [
    'angular-loading-bar',
    'Router'
  ]).
  value('Config', {
    api_url:process.env.API_URL + "/"
  })
