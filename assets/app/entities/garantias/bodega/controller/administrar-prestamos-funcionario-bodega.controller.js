/**
 * Created by joag on 9/06/16.
 */

(function () {
        'use strict';
        angular.module("wpc")
            .controller('AdministrarPrestamosFuncionarioBodegaController', AdministrarPrestamosFuncionarioBodegaController);

        AdministrarPrestamosFuncionarioBodegaController.$inject = ['AuthenticationFactory','$scope', 'GarantiasServices',  '$location', '$rootScope', '$window', '$route','NgTableParams','$uibModal','ShareService','UserLoginService','NumberService'];

        function AdministrarPrestamosFuncionarioBodegaController(AuthenticationFactory,$scope, GarantiasServices, $location, $rootScope, $window, $route,NgTableParams,$uibModal,ShareService,UserLoginService,NumberService) {
            inSession($scope,AuthenticationFactory,$window,false);


        $scope.change_manu_activo=function(){
            $scope.menu_activo=$scope.menu_activo==true?false:true;

        }
        $scope.colapsoContenedor=true;
        $scope.cambiarColapsoContenedor=function(){
            GarantiasServices.showprestamo([{"estado":"PENDIENTE_CONFIRMAR","solicitudUsuario":UserLoginService.getUser()}]).$promise.then(function(data){

                $scope.tableParamsPrestamoPendienteConfirmar = new NgTableParams({}, { dataset: data});
                }
            );

            $scope.colapsoContenedor=$scope.colapsoContenedor==true?false:true;

        }
        $scope.colapsoContenido=true;
        $scope.cambiarColapsoContenido=function(){
            $scope.colapsoContenido=$scope.colapsoContenido==true?false:true;

        }

        $scope.colapsoContenedorPendienteAprobacion=true;
        $scope.cambiarColapsoContenedorPendienteAprobacion=function(){

            GarantiasServices.showprestamo([{"estado":"PENDIENTE_CONFIRMACION_BODEGA",solicitudUsuario:UserLoginService.getUser()}]).$promise.then(function(data){

                $scope.tableParamsPrestamoPendienteAprobacion = new NgTableParams({}, { dataset: data});
                }
            );
            $scope.colapsoContenedorPendienteAprobacion=$scope.colapsoContenedorPendienteAprobacion==true?false:true;

        }

        $scope.colapsoContenedorPendienteRecoger=true;
        $scope.cambiarColapsoContenedorPendienteRecoger=function(){

            GarantiasServices.showprestamo([{"estado":"USUARIO_PUEDE_PASAR_BODEGA",solicitudUsuario:UserLoginService.getUser()}]).$promise.then(function(data){

                $scope.tableParamsPrestamoPendienteRecoger = new NgTableParams({}, { dataset: data});
                }
            );
            $scope.colapsoContenedorPendienteRecoger=$scope.colapsoContenedorPendienteRecoger==true?false:true;

        }

        $scope.setPrestamoSeleccionado=function(data){
            $scope.prestampSeleccionado=data;
        }
        $scope.getPrestamoSeleccionado=function(){
            return $scope.prestampSeleccionado;
        }

        $scope.aprobar=function(row){
            $scope.prestamoP=row;
            var number =NumberService.getNumber();
                number.$promise.then(function(data){
                    if(data&&data[0]){
                        $scope.prestamoP.aprobardoSolicitanteUsuario=UserLoginService.getUser();
                        $scope.prestamoP.aprobadorSolicitanteFecha=data[0].number;
                        $scope.prestamoP.estado="PENDIENTE_CONFIRMACION_BODEGA";
                        var removePrestamo=GarantiasServices.removeprestamo([{estado:"PENDIENTE_CONFIRMAR",solicitudUsuario:UserLoginService.getUser()}]);
                        removePrestamo.$promise.then(function(data){
                             $scope.prestamoP._id=null;
                             GarantiasServices.createprestamo([$scope.prestamoP]);

                        });
                    }

                });

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
