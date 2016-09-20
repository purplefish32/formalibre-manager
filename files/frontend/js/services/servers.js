angular.
  module('Servers',['ngResource','_']).
  service("Servers", ["$http","Config","$resource","$q","_",function($http,Config,$resource,$q,_) {
      data = $resource(Config.api_url+"servers/:id",{id:"@id"});
      data.list=[];
      data.initToken = $q.defer();
      data.initialized = false;
      data.loadingData = false;
      data.initToken.promise.then(function(){data.initialized = true;})

      data.waitForData = function (callback) {
        data.initToken.promise.then(callback);
      }

      var error = function(error){
        alert("Error finding servers.");
        data.initToken.reject(false);
      }

      data.tryToAdd = function(server,successCb,ErrorCb) {
        data.list.push(server);

        var removeServerByIp = function (ip){
          var idx =
            data.list.findIndex(function(srv){return srv.ip == ip;});

          if (idx>=0)
          {
            data.list.splice(idx,1);
          }
        }

        data.save(server,function (response,id) {
              successCb();
            }, function(response) {
              ErrorCb();
              removeServerByIp(server.ip);
            }
          );
      }

      data.refresh = function() {
        data.loadingData = true
        data.query(function(response){
          angular.copy (response, data.list);
          data.initToken.resolve(true);
          data.loadingData = false;
        },error);
      }

      data.find = function (callback) {
        return data.list.find(callback)
      }

      var findClosureFunc = function (obj,findFunc,req,SucessCb,ErrorCb) {
        var keys = Object.keys(req);
        return obj[findFunc](function(srv){
          return! keys.some(function (r) {
            return req[r]!=srv[r];
          })
        });
      }


      data.findIdxBy = function(req,SucessCb,ErrorCb) {
        var result = findClosureFunc(data.list,"findIndex",req,SucessCb,ErrorCb);

        if(_.isFunction (SucessCb) && result>=0)
          SucessCb(result);
        else if (_.isFunction (ErrorCb) && result<0){
          ErrorCb();
        }

        return result;
      }

      data.findBy = function(req,SucessCb,ErrorCb) {
        var result = findClosureFunc(data.list,"find",req);

        if(_.isFunction (SucessCb) && result)
          SucessCb(result);
        else if (_.isFunction (ErrorCb) && !result){
          ErrorCb();
        }

        return result;
      }

      data.refresh();

      return data;

  }])
