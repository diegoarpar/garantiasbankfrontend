/**
 * Created by joag on 9/06/16.
 */
(function () {
        'use strict';
        angular.module("wpc")
            .controller('CamposParametricosController', CamposParametricosController);

        CamposParametricosController.$inject = ['AuthenticationFactory','$scope', 'GarantiasServices',  '$location', '$rootScope', '$window', '$route','NgTableParams','$uibModal'];

        function CamposParametricosController(AuthenticationFactory,$scope, GarantiasServices, $location, $rootScope, $window, $route,NgTableParams,$uibModal) {
            inSession($scope,AuthenticationFactory,$window,false);
            $scope.campo = {};


            $scope.recargarCamposParametricos=function(){
                $scope.parametrics = GarantiasServices.showParametric();
                $scope.parametrics.$promise.then(function (data){
                    $scope.tableParamsContainer = new NgTableParams({}, { dataset: data});
                });
            }
            $scope.recargarCamposParametricos();

            $scope.colapsoContenedor=true;
            $scope.cambiarColapsoContenedor=function(){
                $scope.colapsoContenedor=$scope.colapsoContenedor==true?false:true;

            }

            $scope.remove = function (idx) {
                $scope.parametricst = [];
                $scope.parametricst.push($scope.parametrics[idx]);
                var rta = GarantiasServices.removeParametricPost([{
                            nombreparametrica: $scope.parametrics[idx].nombreparametrica,
                            key: $scope.parametrics[idx].key
                        }]);
                        rta.$promise.then(function (data){
                            var rta2 = GarantiasServices.showParametric();
                                rta2.$promise.then(function (data){
                                     $scope.tableParamsContainer = new NgTableParams({}, { dataset: data});
                                });
                        });

            }

            $scope.openModalCrearCampoArchivo=function () {

                        var modalInstance = $uibModal.open({
                                templateUrl: 'assets/app/entities/garantias/campos/parametricos/view/crear-campo-archivo.html',
                                controller: 'CrearCampoArchivoController',
                                scope: $scope,
                                size: 'lg'
                            }
                        );

                    };


        }
    })();
