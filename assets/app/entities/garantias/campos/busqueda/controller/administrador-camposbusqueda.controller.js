/**
 * Created by joag on 9/06/16.
 */
(function () {
        'use strict';
        angular.module("wpc")
            .controller('AdministradorCamposBusqueda', AdministradorCamposBusqueda);

        AdministradorCamposBusqueda.$inject = ['AuthenticationFactory','$scope', 'GarantiasServices',  '$location', '$rootScope', '$window', '$route'];

        function AdministradorCamposBusqueda(AuthenticationFactory,$scope, GarantiasServices, $location, $rootScope, $window, $route) {
            inSession($scope,AuthenticationFactory,$window,false);
            $scope.campo = {};

            $scope.fondos=GarantiasServices.showParametric({nombreparametrica:'fondo'});
            $scope.parametrics = [];
            $scope.parametrics=GarantiasServices.showParametricSearch();
            $scope.cargarDocumentos=function(){

                var parameter=[{'fondo.key':$scope.fondoSelected.key}];
                $scope.subseries=GarantiasServices.showtrdpost(parameter);

            }
            $scope.add = function () {
                var row ={empresa:$scope.fondoSelected
                        ,subserie:$scope.subserieseleccionada
                        ,fieldType:$scope.fieldType
                        ,condition:$scope.condition
                        ,fieldName:$scope.fieldName
                        ,fieldValue:$scope.fieldValue
                        ,fieldLabel:$scope.fieldLabel
                        };
                var lstAux=[row];
                var rta=GarantiasServices.createParametricSearch(lstAux);
                rta.$promise.then(function (){

                    $scope.parametrics=GarantiasServices.showParametricSearch();
                });




            }
            $scope.remove = function (idx) {
                var lstAux = [];
                lstAux.push($scope.parametrics[idx]);
                var rta = GarantiasServices.removeParametricSearch({
                            fieldName: $scope.parametrics[idx].fieldName,
                            fieldType: $scope.parametrics[idx].fieldType
                        });
                rta.$promise.then(function (data){
                    $scope.parametrics = GarantiasServices.showParametricSearch();
                });

            }
        }
    })();
