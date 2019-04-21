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
          $scope.rta = GarantiasServices.retrivebodegacontainer([{}]);
          $scope.rta.$promise.then(function (data){
            $scope.tableParams = new NgTableParams({}, { dataset: data});
          });


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
