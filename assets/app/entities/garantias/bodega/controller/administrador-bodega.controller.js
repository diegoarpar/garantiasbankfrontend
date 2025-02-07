/**
 * Created by joag on 9/06/16.
 */

(function () {
        'use strict';
        angular.module("wpc")
            .controller('AdministradorBodegaController', AdministradorBodegaController);

        AdministradorBodegaController.$inject = ['AuthenticationFactory','$scope', 'GarantiasServices',  '$location', '$rootScope', '$window', '$route','NgTableParams','$uibModal'];

        function AdministradorBodegaController(AuthenticationFactory,$scope, GarantiasServices, $location, $rootScope, $window, $route,NgTableParams,$uibModal) {
            inSession($scope,AuthenticationFactory,$window,false);
            $scope.menu_activo=true;

            $scope.metadata={};
            $scope.metadataContenedores=[];
            GarantiasServices.showParametricpost([{nombreparametrica:"bodegaContenedor"}]).$promise.then(function(data){
                $scope.metadataContenedores=data;

            });

            $scope.metadataUbicaciones=[];
            GarantiasServices.showParametricpost([{nombreparametrica:"bodegaUbicacion"}]).$promise.then(function(data){
                $scope.metadataUbicaciones=data;

            });
            $scope.paraAsociar=null;
            $scope.descripcionAsociar="";
            $scope.usarParaAsociar=function(entity){
                $scope.paraAsociar=entity;
                for(var i=0;i<$scope.metadataContenedores.length;i++){
                    $scope.descripcionAsociar=$scope.metadataContenedores[i].value+":"+entity[$scope.metadataContenedores[i].key];
                    break;
                }
            }

            $scope.asociar=function(row){
               row.container=$scope.paraAsociar;
               GarantiasServices.updatebodegacontainerubication([row]);
            }

            $scope.cargarUbicacionBodega=function(){
                GarantiasServices.retrivebodegacontainerubication([{}]).$promise.then(function(data){
                    $scope.tableParamsUbicaciones = new NgTableParams({}, { dataset: data});
                });
            }
            $scope.cargarUbicacionBodega();

            $scope.cargarContenedorBodega=function(){
                GarantiasServices.retrivebodegacontainer([{}]).$promise.then(function (data){
                    $scope.tableParams = new NgTableParams({}, { dataset: data});
                  });
            }
            $scope.cargarContenedorBodega();

            $scope.colapsoContenedor=true;
            $scope.cambiarColapsoContenedor=function(){
                $scope.colapsoContenedor=$scope.colapsoContenedor==true?false:true;
            }
            $scope.colapsoContenedorUbicaciones=true;
            $scope.cambiarColapsoContenedorUbicaciones=function(){
                $scope.colapsoContenedorUbicaciones=$scope.colapsoContenedorUbicaciones==true?false:true;
            }
            $scope.change_manu_activo=function(){
                $scope.menu_activo=$scope.menu_activo==true?false:true;

            }

            $scope.openModalCrearContenedor = function () {
                var modalInstance = $uibModal.open({
                        templateUrl: 'assets/app/entities/garantias/bodega/view/crear-contenedor.html',
                        controller: 'CrearContenedorBodegaController',
                        scope: $scope,
                        size: 'lg'
                    }
                );

            };
            $scope.openModalCrearUbicacion = function () {
                var modalInstance = $uibModal.open({
                        templateUrl: 'assets/app/entities/garantias/bodega/view/crear-ubicacion.html',
                        controller: 'CrearUbicacionBodegaController',
                        scope: $scope,
                        size: 'lg'
                    }
                );

            };

            $scope.detalleUbicacion=function(entity) {
              $scope.setData2([entity]);
              var modalInstance = $uibModal.open({
                      templateUrl: 'assets/app/entities/garantias/bodega/view/detalle-ubicacion.html',
                      controller: 'DetalleUbicacionBodegaController',
                      scope: $scope,
                      size: 'lg'
                  }
              );
          }



          $scope.generateTable=function(){
            $scope.rta = GarantiasServices.retrivebodegacontainer([{}]);
            $scope.rta.$promise.then(function (data){
                $scope.tableParams = new NgTableParams({}, { dataset: data});
              });
          }

          $scope.setData2=function(data){

            $scope.data2=data;
          }
         $scope.getData2=function(){
            return $scope.data2[0];
          }

          $scope.openModalModificarContenedor=function (_this) {
              var data = _this.b;
              $scope.setData2([data]);
              var modalInstance = $uibModal.open({
                      templateUrl: 'assets/app/entities/garantias/bodega/view/actualizar-contenedor.html',
                      controller: 'ModificarContenedorBodegaController',
                      scope: $scope,
                      size: 'lg'
                  }
              );

          };
        }
    })();
