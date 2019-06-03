/**
 * Created by joag on 9/06/16.
 */

(function () {
        'use strict';
        angular.module("wpc")
            .controller('DetalleUbicacionBodegaController', DetalleUbicacionBodegaController);

        DetalleUbicacionBodegaController.$inject = ['AuthenticationFactory','$scope', 'GarantiasServices',  '$location', '$rootScope', '$window', '$route','NgTableParams','$uibModal','$uibModalInstance'];

        function DetalleUbicacionBodegaController(AuthenticationFactory,$scope, GarantiasServices, $location, $rootScope, $window, $route,NgTableParams,$uibModal,$uibModalInstance) {
            inSession($scope,AuthenticationFactory,$window,false);



            $scope.ubication=$scope.getData2();
            $scope.metadataContenedores=[];
            GarantiasServices.showParametricpost([{nombreparametrica:"bodegaContenedor","add1.key":$scope.ubication.container.key.key,"add2.key":$scope.ubication.container.storage.key}]).$promise.then(function(data){
                $scope.metadataContenedores=data;

            });

            $scope.metadataUbicacion=[];
            GarantiasServices.showParametricpost([{nombreparametrica:"bodegaUbicacion","add1.key":$scope.ubication.container.key.key,"add2.key":$scope.ubication.container.storage.key}]).$promise.then(function(data){
                $scope.metadataUbicacion=data;

            });
            GarantiasServices.showPost([{"ubicacionbodega": $scope.ubication}]).$promise.then(function(data){
                fillColumns(data,$scope);
                 update_columns($scope);
                 $scope.generateColumns=$scope.all_columns;
                $scope.tablaContenidoUbicacion = new NgTableParams({}, { dataset: data});
            });


            $scope.ok=function(){
                var ubication=$scope.tableParamsContenedor.data;

                for(var i=0;!!ubication&&i<ubication.length;i++){
                    ubication[i].container=$scope.container;
                }

                GarantiasServices.createbodegacontainerubication(ubication);

            }




          $scope.addUbicacion=function(){
            var ubication=!!$scope.tableParamsContenedor&&!!$scope.tableParamsContenedor.data?$scope.tableParamsContenedor.data:[];

            ubication.push({code:"",name:""});
            $scope.tableParamsContenedor = new NgTableParams({}, { dataset: ubication});

          }
          $scope.remove=function(_this){
              var ubication=$scope.tableParamsContenedor.data;
              ubication.splice(_this.$index,1);
              $scope.tableParamsContenedor = new NgTableParams({}, { dataset: ubication});

            }

        $scope.desasociar2=function(row,_this) {
              row.ubicacionbodega=null;
              var promise=GarantiasServices.update([row]);
              handleSubmitServicePromise(promise,null);
              $scope.rta = GarantiasServices.showPost([{"ubicacionbodega": $scope.ubication}]);
              $scope.rta.$promise.then(function(data){
                  $scope.tablaContenidoUbicacion = new NgTableParams({}, { dataset: data});
                  fillColumns(data,$scope);
                   update_columns($scope);
                   $scope.generateColumns=$scope.all_columns;
              });
         }

         $scope.switchBoolean2=function(key) {

               for(var idx=0;!!$scope.all_columns&&idx<$scope.all_columns.length;idx++)
               if($scope.all_columns[idx].title==key.title){
                 $scope.all_columns[idx].checked = !$scope.all_columns[idx].checked;
                 break;
               }
           }
        }


    })();
