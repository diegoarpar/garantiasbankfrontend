/**
 * Created by joag on 9/06/16.
 */

(function () {
        'use strict';
        angular.module("wpc")
            .controller('CrearUbicacionBodegaController', CrearUbicacionBodegaController);

        CrearUbicacionBodegaController.$inject = ['AuthenticationFactory','$scope', 'GarantiasServices',  '$location', '$rootScope', '$window', '$route','NgTableParams','$uibModal','$uibModalInstance'];

        function CrearUbicacionBodegaController(AuthenticationFactory,$scope, GarantiasServices, $location, $rootScope, $window, $route,NgTableParams,$uibModal,$uibModalInstance) {
            inSession($scope,AuthenticationFactory,$window,false);
            $scope.fondos=GarantiasServices.showParametric({nombreparametrica:'fondo',tenant:window.sessionStorage.getItem("tenant")});
            $scope.cargarBodegas=function(fondo){
                GarantiasServices.showbodega([{nombreparametrica: $scope.fondoSeleccionado.nombreparametrica,key: $scope.fondoSeleccionado.key}]).$promise.then(function (data){
                    $scope.bodegas=[];
                    for (var i=0;!!data&&i< data.length;i++)
                        for (var j=0;!!data[i]&&!!data[i].nodes&&j< data[i].nodes.length;i++)
                            $scope.bodegas.push(data[i].nodes[j]);
                });

            }

            $scope.metadataContenedores=[];
            $scope.cargarMetadatosBodega=function(fondo){
                $scope.metadataContenedores=[];
                GarantiasServices.showParametricpost([{nombreparametrica:"bodegaUbicacion","add1.key":$scope.fondoSeleccionado.key,"add2.key":$scope.bodegaSeleccionada.key}]).$promise.then(function(data){
                    $scope.metadataContenedores=data;

                });

            }
            $scope.container={};

            $scope.ok=function(){
                $scope.container.container={};
                $scope.container.container.key=$scope.fondoSeleccionado;
                $scope.container.container.estado="N";
                $scope.container.container.storage=$scope.bodegaSeleccionada;
                GarantiasServices.createbodegacontainerubication([$scope.container]).$promise.then(function(data){
                    $scope.cargarUbicacionBodega();
                   $scope.cargarContenedorBodega();
                    $uibModalInstance.dismiss();
                });

            }

            $scope.cancel=function(){
                $uibModalInstance.dismiss();
            }

          $scope.ubicaciones=[];
          $scope.tableParamsContenedor = new NgTableParams({}, { dataset: $scope.ubicaciones});

          $scope.addUbicacion=function(){
            $scope.ubicaciones.push({code:"",name:""});
            $scope.tableParamsContenedor = new NgTableParams({}, { dataset: $scope.ubicaciones});

          }
          $scope.remove=function(_this){
              $scope.ubicaciones.splice(_this.$index,1);
              $scope.tableParamsContenedor = new NgTableParams({}, { dataset: $scope.ubicaciones});

            }

        $scope.crearUbicacion=function ($scope) {

            var modalInstance = $uibModal.open({
                    templateUrl: 'assets/app/entities/garantias/bodega/view/crear-ubicacion-grafica.html',
                    controller: 'CrearUbicacionGraficaBodegaController',
                    scope: $scope,
                    size: 'lg'
                }
            );

        };
        $scope.openModalModificarContenedor=function ($scope) {

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
