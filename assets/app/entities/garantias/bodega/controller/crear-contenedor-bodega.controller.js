/**
 * Created by joag on 9/06/16.
 */

(function () {
        'use strict';
        angular.module("wpc")
            .controller('CrearContenedorBodegaController', CrearContenedorBodegaController);

        CrearContenedorBodegaController.$inject = ['AuthenticationFactory','$scope', 'GarantiasServices',  '$location', '$rootScope', '$window', '$route','NgTableParams','$uibModal','$uibModalInstance'];

        function CrearContenedorBodegaController(AuthenticationFactory,$scope, GarantiasServices, $location, $rootScope, $window, $route,NgTableParams,$uibModal,$uibModalInstance) {
            inSession($scope,AuthenticationFactory,$window,false);
            $scope.fondos=GarantiasServices.showParametric({nombreparametrica:'fondo',tenant:window.sessionStorage.getItem("tenant")});
            $scope.cargarBodegas=function(fondo){
                $scope.bodegasrta=GarantiasServices.showbodega([{nombreparametrica: $scope.fondoSeleccionado.nombreparametrica,key: $scope.fondoSeleccionado.key}]);
                $scope.bodegasrta.$promise.then(function (data){
                        $scope.bodegas=[];
                        for (var i=0;!!data&&i< data.length;i++)
                            for (var j=0;!!data[i]&&!!data[i].nodes&&j< data[i].nodes.length;i++)
                                $scope.bodegas.push(data[i].nodes[j]);
                    }
                );

            }

            $scope.ok=function(){
                var container={};
                container.key=$scope.fondoSeleccionado;
                container.storage=$scope.bodegaSeleccionada;
                container.code=$scope.codigo;
                container.name=$scope.nombre;
                container.description=$scope.descripcion;
                container.dimension=$scope.dimension;
                $scope.rta =GarantiasServices.createbodegacontainer([container]);
                $scope.rta.$promise.then(function(data){
                    $scope.rta2 =GarantiasServices.retrivebodegacontainer([{code:$scope.codigo,name:$scope.nombre,"key.key":$scope.fondoSeleccionado.key,"storage.key":$scope.bodegaSeleccionada.key}]);
                    $scope.rta2.$promise.then(function (data2){

                       $scope.generateTable();
                       $scope.setData2(data2);

                       $uibModalInstance.dismiss($scope);
                       $scope.openModalModificarContenedor($scope);

                    });

                });

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
