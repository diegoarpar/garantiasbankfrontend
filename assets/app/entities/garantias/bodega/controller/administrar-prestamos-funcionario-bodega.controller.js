/**
 * Created by joag on 9/06/16.
 */

(function () {
        'use strict';
        angular.module("wpc")
            .controller('AdministrarPrestamosFuncionarioBodegaController', AdministrarPrestamosFuncionarioBodegaController);

        AdministrarPrestamosFuncionarioBodegaController.$inject = ['AuthenticationFactory','$scope', 'GarantiasServices',  '$location', '$rootScope', '$window', '$route','NgTableParams','$uibModal','ShareService','UserLoginService'];

        function AdministrarPrestamosFuncionarioBodegaController(AuthenticationFactory,$scope, GarantiasServices, $location, $rootScope, $window, $route,NgTableParams,$uibModal,ShareService,UserLoginService) {
            inSession($scope,AuthenticationFactory,$window,false);


        $scope.change_manu_activo=function(){
            $scope.menu_activo=$scope.menu_activo==true?false:true;

        }
        $scope.colapsoContenedor=true;
        $scope.cambiarColapsoContenedor=function(){
            GarantiasServices.showprestamo([{"estado":"PENDIENTE_CONFIRMAR","usuario":UserLoginService.getUser()}]).$promise.then(function(data){

                $scope.tableParamsPrestamoPendienteConfirmar = new NgTableParams({}, { dataset: data});
                }
            );

            $scope.colapsoContenedor=$scope.colapsoContenedor==true?false:true;

        }
        $scope.colapsoContenido=true;
        $scope.cambiarColapsoContenido=function(){
            $scope.colapsoContenido=$scope.colapsoContenido==true?false:true;

        }

        $scope.colapsoContenedorPrestado=true;
        $scope.cambiarColapsoContenedorPrestado=function(){
            $scope.colapsoContenedorPrestado=$scope.colapsoContenedorPrestado==true?false:true;

        }

        $scope.setPrestamoSeleccionado=function(data){
            $scope.prestampSeleccionado=data;
        }
        $scope.getPrestamoSeleccionado=function(){
            return $scope.prestampSeleccionado;
        }
        $scope.detallePrestamoPendiente=function(row){
            $scope.setPrestamoSeleccionado(row);
            var modalInstance = $uibModal.open({
                    templateUrl: 'assets/app/entities/garantias/bodega/view/detalle-prestamo.html',
                    controller: 'DetallePrestamoBodegaController',
                    scope: $scope,
                    size: 'lg'
                }
            );
        }






             $scope.openModal=function(entity) {

                  ShareService.set(entity);
                  var modalInstance = $uibModal.open({
                          templateUrl: 'assets/app/entities/dynamic-search/view/dynamic-search-modal-functionary.html',
                          controller: 'DynamicSearchModalController',
                          scope: $scope,
                          size: 'lg'
                      }
                  );
              }


            $scope.mostrarDocumentosAsociados=function(entity) {

                  $scope.setData2(entity);
                  var modalInstance = $uibModal.open({
                          templateUrl: 'assets/app/entities/garantias/bodega/view/detalle-ubicacion.html',
                          controller: 'DetalleUbicacionBodegaController',
                          scope: $scope,
                          size: 'lg'
                      }
                  );
              }


        }

    })();
