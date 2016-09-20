angular.
  module('Servers',['ngResource']).
  service("Servers", ["$http","Config","$resource",function($http,Config,$resource) {
      data = $resource(Config.api_url+"servers/:id",{id:"@id"});
      data.list=[];

      data.tryToAdd = function(server,successCb,ErrorCb) {
        data.list.push(server);

        var removeServerByIp = function (ip){
          var idx =
            data.list.findIndex(function(srv){return srv.ip == ip;});

          if (idx)
          {
            data.list.splice(idx,1);
          }
        }

        var saveit = function(){
            data.save(server,function () {
                successCb();
            }, function() {
              ErrorCb();
              removeServerByIp(server.ip);
            }
          );
        }

        saveit();
      }

      data.refresh = function() {
        data.query(function(response){
          angular.copy (response, data.list)
        });
      }

      data.refresh();

      return data;

  }])
