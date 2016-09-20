angular.
  module("ServerController",["Servers",'ui-notification','ui.bootstrap']).
  controller("ServerController", ["$scope", "Notification","Servers","$routeParams","$location","$uibModal",function($scope, Notification,Servers,$routeParams,$location,$uibModal) {
    if($routeParams.id)
    {
      Servers.waitForData(function(){
            Servers.findBy({id:$routeParams.id},function (srv) {
              $scope.server = srv;
            },function () {
              Notification.error('Internal Error : unable to find the serer to edit')
            });
          })

    $scope.delete = function (server) {
      Servers.tryToRemove(server.id,
        function(response) {
          Notification.success('Server '+server.name+' has been deleted');
        },
        function(response) {
          Notification.error('Error removing server : '+server.name);
        });
      }

      $scope.open = function (size,server) {
        $scope.modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'myModalContent.html',
          controller: 'ServerController',
          scope: $scope
        });
      }
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
