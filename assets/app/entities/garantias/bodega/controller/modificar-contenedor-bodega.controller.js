/**
 * Created by joag on 9/06/16.
 */

(function () {
        'use strict';
        angular.module("wpc")
            .controller('ModificarContenedorBodegaController', ModificarContenedorBodegaController);

        ModificarContenedorBodegaController.$inject = ['AuthenticationFactory','$scope', 'GarantiasServices',  '$location', '$rootScope', '$window', '$route','NgTableParams','$uibModal','$uibModalInstance'];

        function ModificarContenedorBodegaController(AuthenticationFactory,$scope, GarantiasServices, $location, $rootScope, $window, $route,NgTableParams,$uibModal,$uibModalInstance) {
            inSession($scope,AuthenticationFactory,$window,false);

            $scope.container=$scope.getData2();

            GarantiasServices.retrivebodegacontainerubication([{"container":$scope.container}]).$promise.then(function(data){
                $scope.tableParamsContenedor = new NgTableParams({}, { dataset: data});
            });

            $scope.metadataContenedoresDetalle=[];
            GarantiasServices.showParametricpost([{nombreparametrica:"bodegaContenedor","add1.key":$scope.container.key.key,"add2.key":$scope.container.storage.key}]).$promise.then(function(data){
                $scope.metadataContenedoresDetalle=data;

            });

            $scope.metadataUbicaciones=[];
            GarantiasServices.showParametricpost([{nombreparametrica:"bodegaUbicacion","add1.key":$scope.container.key.key,"add2.key":$scope.container.storage.key}]).$promise.then(function(data){
                $scope.metadataUbicaciones=data;

            });
            $scope.ok=function(){
                $uibModalInstance.dismiss();

            }




          $scope.addUbicacion=function(){
            var ubication=!!$scope.tableParamsContenedor&&!!$scope.tableParamsContenedor.data?$scope.tableParamsContenedor.data:[];
            if(ubication==null)ubication=[];
            ubication.push({});
            $scope.tableParamsContenedor = new NgTableParams({}, { dataset: ubication});

          }
          $scope.remove=function(_this){
              var ubication=$scope.tableParamsContenedor.data;
              ubication.splice(_this.$index,1);
              $scope.tableParamsContenedor = new NgTableParams({}, { dataset: ubication});

            }
        }

    })();
