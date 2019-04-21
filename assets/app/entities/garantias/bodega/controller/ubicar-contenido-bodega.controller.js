/**
 * Created by joag on 9/06/16.
 */

(function () {
        'use strict';
        angular.module("wpc")
            .controller('UbicarContenidoBodegaController', UbicarContenidoBodegaController);

        UbicarContenidoBodegaController.$inject = ['AuthenticationFactory','$scope', 'GarantiasServices',  '$location', '$rootScope', '$window', '$route','NgTableParams','$uibModal'];

        function UbicarContenidoBodegaController(AuthenticationFactory,$scope, GarantiasServices, $location, $rootScope, $window, $route,NgTableParams,$uibModal) {
            inSession($scope,AuthenticationFactory,$window,false);

        $scope.menu_activo=true;
        $scope.change_manu_activo=function(){
            $scope.menu_activo=$scope.menu_activo==true?false:true;

        }
        $scope.colapsoContenedor=true;
        $scope.cambiarColapsoContenedor=function(){
            $scope.colapsoContenedor=$scope.colapsoContenedor==true?false:true;

        }
        $scope.colapsoContenido=true;
        $scope.cambiarColapsoContenido=function(){
            $scope.colapsoContenido=$scope.colapsoContenido==true?false:true;

        }

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

            $scope.rta = GarantiasServices.retrivebodegacontainer([
                                            {"key.key":!!$scope.fondoSeleccionado?$scope.fondoSeleccionado.key:{$regex:"^.*", $options: "i"}
                                           ,"storage.key":!!$scope.bodegaSeleccionada?$scope.bodegaSeleccionada.key:{$regex:"^.*", $options: "i"}
                                           ,"code":$scope.code
                                           ,"description":!!$scope.description?{$regex:"^"+$scope.description+".*", $options: "i"}:{$regex:"^.*", $options: "i"}
                                           ,"dimension":!!$scope.dimension?{$regex:"^"+$scope.dimension+".*", $options: "i"}:{$regex:"^.*", $options: "i"}
                                           }]
                                           );

            $scope.rta.$promise.then(function(data){
                $scope.tableParamsContainer = new NgTableParams({}, { dataset: data});
            });

        }


        }

    })();
