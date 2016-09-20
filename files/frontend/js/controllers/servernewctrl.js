angular.
  module("ServerNewController",["Servers",'ui-notification']).
  controller("ServerNewController", ["$scope", "Notification","Servers","$routeParams","$location",function($scope, Notification,Servers,$routeParams,$location) {

    if($routeParams.id)
    {
      Servers.waitForData(function(){
            Servers.findBy({id:$routeParams.id},function (srv) {
              $scope.server = srv;
            },function () {
              Notification.error('Internal Error : unable to find the serer to edit')
            });
          })
    }

    $scope.submitForm=function(){
        var server = $scope.server;

        //must not be null
        if(!server)
        {
          Notification.error('Error creating server, please try again');
          return;
        }

        if(Servers.list.some(function(srv){return srv.ip == server.ip;}))
        {
          Notification.error('Error creating server, server IP address already exists');
          return;
        }

        $location.path('/servers');

        Servers.tryToAdd(
          server,
          function(response) {
              Notification.success('Your new server has been added to the list');
            },
          function(response) {
            Notification.error('Error creating server, please try again');
          });

    }
}])
