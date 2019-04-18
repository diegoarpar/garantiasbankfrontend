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
        var data = [{name: "Moroni", age: 50},
                      {name: "Tiancum", age: 43},
                      {name: "Jacob", age: 27},
                      {name: "Nephi", age: 29},
                      {name: "Enos", age: 34},
                      {name: "Tiancum", age: 43},
                      {name: "Jacob", age: 27},
                      {name: "Nephi", age: 29},
                      {name: "Enos", age: 34},
                      {name: "Tiancum", age: 43},
                      {name: "Jacob", age: 27},
                      {name: "Nephi", age: 29},
                      {name: "Enos", age: 34},
                      {name: "Tiancum", age: 43},
                      {name: "Jacob", age: 27},
                      {name: "Nephi", age: 29},
                      {name: "Enos", age: 34}];


          $scope.tableParams = new NgTableParams({}, { dataset: data});
        }
    })();
