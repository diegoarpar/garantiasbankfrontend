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
        $scope.colapsoContenedorPendienteDevolver=true;
        $scope.documentosPrestados=[];
        $scope.cambiarColapsoContenedorPendienteDevolver=function(){
            $scope.documentosPrestados=[];
            GarantiasServices.showprestamo([{"estado":"DEVOLUCION",solicitudUsuario:UserLoginService.getUser()}]).$promise.then(function(data){

                $scope.tableParamsPrestamoPendienteDevolver = new NgTableParams({}, { dataset: data});
                }
            );
            $scope.colapsoContenedorPendienteDevolver=$scope.colapsoContenedorPendienteDevolver==true?false:true;
            $scope.documentosPrestadosUsuario=GarantiasServices.showPost([{"prestamo.estado":"PRESTADO","prestamo.solicitudUsuario":UserLoginService.getUser()}]).$promise.then(function(data){
                $scope.documentosDevolucion=data;
                fillColumns(data,$scope);
                update_columns($scope);
            });

        }
        $scope.colapsoContenedorDevoluciones=true;
        $scope.cambiarColapsoContenedorDevoluciones=function(){

            GarantiasServices.showprestamo([{$and:[{estado:{$eq:"EN_PREPARACION_DEVOLUCION"},solicitudUsuario:{$eq:UserLoginService.getUser()}}]}]).$promise.then(function(data){
                $scope.tableParamsContainerDevolucion = new NgTableParams({}, { dataset: data});

                }
            );
            $scope.colapsoContenedorDevoluciones=$scope.colapsoContenedorDevoluciones==true?false:true;

        }
        $scope.colapsoContenedorHistorico=true;
        $scope.cambiarColapsoContenedorHistorico=function(){

            GarantiasServices.showprestamo([{solicitudUsuario:UserLoginService.getUser()}]).$promise.then(function(data){

                $scope.tableParamsPrestamoHistorico = new NgTableParams({}, { dataset: data});
                }
            );
            $scope.colapsoContenedorHistorico=$scope.colapsoContenedorHistorico==true?false:true;

        }

        $scope.setPrestamoSeleccionado=function(data){
            $scope.prestampSeleccionado=data;
        }
        $scope.getPrestamoSeleccionado=function(){
            return $scope.prestampSeleccionado;
        }

        $scope.iniciarDevolucion=function(row){
            NumberService.getNumber().$promise.then(function(dataN){
                if(!!dataN&&!!dataN[0]){
                    $scope.prestamoP=row;
                    $scope.prestamoP.fechaDevolucion=dataN[0].number;
                    for(var i=0; i<row.entity.length;i++){
                        row.entity[i].prestamo.estado="EN_DEVOLUCION";
                    }
                    GarantiasServices.update(row.entity);
                    GarantiasServices.removeprestamo([{$and:[{estado:{$eq:"EN_PREPARACION_DEVOLUCION"},solicitudUsuario:{$eq:UserLoginService.getUser()}}]}]).$promise.then(function(data){
                         $scope.prestamoP._id=null;
                         $scope.prestamoP.estado="EN_DEVOLUCION";
                         GarantiasServices.createprestamo([$scope.prestamoP]);
                             //$scope.$dismiss();
                        });
                }});
        }
        $scope.cancelarDevolucion=function(row){
            $scope.prestamoP=row;
            NumberService.getNumber().$promise.then(function(dataN){
                if(!!dataN&&!!dataN[0]){
                    $scope.prestamoP.fechaCancelacionDevolucion=dataN[0].number;
                    for(var i=0; i<$scope.prestamoP.entity.length;i++){
                        $scope.prestamoP.entity[i].prestamo.estado="PRESTADO";
                    }
                    GarantiasServices.update(row.entity);
                    GarantiasServices.removeprestamo([{$and:[{estado:{$eq:"EN_PREPARACION_DEVOLUCION"},solicitudUsuario:{$eq:UserLoginService.getUser()}}]}]).$promise.then(function(data){
                         $scope.prestamoP._id=null;
                         $scope.prestamoP.estado="DEVOLUCION_CANCELADO_POR_USUARIO";
                         GarantiasServices.createprestamo([$scope.prestamoP]);
                             //$scope.$dismiss();
                        });
                }});
        }
        $scope.agregarNuevaDevolucion=function(row){
            $scope.row=row;
            NumberService.getNumber().$promise.then(function(dataN){
                if(!!dataN&&!!dataN[0]){
                    $scope.row.prestamo.estado="EN_PREPARACION_DEVOLUCION";;

                    GarantiasServices.update([$scope.row]);
                    GarantiasServices.showprestamo([{estado:"EN_PREPARACION_DEVOLUCION",solicitudUsuario:UserLoginService.getUser()}]).$promise.then(function(data){
                        $scope.prestamoP={};
                        if(!!data&&data.length>0){
                            $scope.prestamoP=data[0];
                            $scope.prestamoP.entity.push($scope.row);
                        }else{
                             $scope.prestamoP.solicitudUsuario=UserLoginService.getUser();
                             $scope.prestamoP.fechaPresta=$scope.row.prestamo.numero;
                             $scope.prestamoP.estado="EN_PREPARACION_DEVOLUCION";
                             $scope.prestamoP.numero= $scope.row.prestamo.numero;
                             $scope.prestamoP.entity=[];
                             $scope.prestamoP.entity.push($scope.row);
                        }

                        GarantiasServices.removeprestamo([{$and:[{estado:{$eq:"EN_PREPARACION_DEVOLUCION"},solicitudUsuario:{$eq:UserLoginService.getUser()}}]}]).$promise.then(function(data){
                             $scope.prestamoP._id=null;
                             GarantiasServices.createprestamo([$scope.prestamoP]);
                                 //$scope.$dismiss();
                            });

                        });
            }});
        }
        $scope.aprobar=function(row){
            $scope.prestamoP=row;
            NumberService.getNumber().$promise.then(function(data){
                if(data&&data[0]){
                    $scope.prestamoP.aprobadorSolicitanteUsuario=UserLoginService.getUser();
                    $scope.prestamoP.aprobadorEmail=UserLoginService.getEmail();
                    $scope.prestamoP.aprobadorSolicitanteFecha=data[0].number;
                    $scope.prestamoP.estado="PENDIENTE_CONFIRMACION_BODEGA";
                    GarantiasServices.removeprestamo([{$and:[{estado:{$eq:"PENDIENTE_CONFIRMAR"}},{solicitudUsuario:{$eq:UserLoginService.getUser()}},{numero:{$eq:$scope.prestamoP.numero}}]}]).$promise.then(function(data){
                         $scope.prestamoP._id=null;
                         GarantiasServices.createprestamo([$scope.prestamoP]).$promise.then(function(data){
                            GarantiasServices.putRunner([prepareEmail($scope.prestamoP.aprobadorEmail,"Prestamo Solicitado "+ $scope.prestamoP.numero, "Señor "+$scope.prestamoP.aprobadorSolicitanteUsuario+" ha solicitado el préstamo "+  $scope.prestamoP.numero)]);

                         });
                    });
                }

            });

        }

        $scope.prestar=function(){
            $scope.prestamoP={};
            NumberService.getNumber().$promise.then(function(dataN){
                if(!!dataN&&!!dataN[0]){
                     $scope.prestamoP.solicitudUsuario=UserLoginService.getUser();
                     $scope.prestamoP.solicitudEmail=UserLoginService.getEmail();
                     $scope.prestamoP.fechaPresta=dataN[0].number;
                     $scope.prestamoP.estado="PENDIENTE_CONFIRMAR";
                     $scope.prestamoP.numero= dataN[0].number;
                     $scope.prestamoP.entity=[];
                     GarantiasServices.createprestamo([$scope.prestamoP]).$promise.then(function (data){
                         $scope.cambiarColapsoContenedor();
                         $scope.cambiarColapsoContenedor();
                         //GarantiasServices.putRunner([prepareEmail( $scope.prestamoP.solicitudEmail,"Prestamo Solicitado "+ $scope.prestamoP.numero, "Señor "+$scope.prestamoP.solicitudUsuario+" ha solicitado el préstamo "+  $scope.prestamoP.numero)]);
                         //GarantiasServices.putRunner([prepareEmail( $scope.prestamoP.solicitudEmail,"Prestamo Solicitado "+ $scope.prestamoP.numero, "Señor "+$scope.prestamoP.solicitudUsuario+" ha solicitado el préstamo "+  $scope.prestamoP.numero)]);

                     });

                 }
            });
        }
        $scope.cancelar=function(row){
            $scope.prestamoP=row;
            for(var i=0;i<$scope.prestamoP.entity.length;i++){
                $scope.prestamoP.entity[i].prestamo=null;
            }
            NumberService.getNumber().$promise.then(function(data){
                if(data&&data[0]){
                    $scope.prestamoP.rechazoSolicitanteUsuario=UserLoginService.getUser();
                    $scope.prestamoP.rechazoSolicitanteFecha=data[0].number;
                    $scope.prestamoP.estado="CANCELADO_POR_USUARIO";
                    GarantiasServices.removeprestamo([{$and:[{estado:{$eq:"PENDIENTE_CONFIRMAR"}},{solicitudUsuario:{$eq:UserLoginService.getUser()}},{numero:{$eq:$scope.prestamoP.numero}}]}]).$promise.then(function(data){
                         $scope.prestamoP._id=null;
                         GarantiasServices.createprestamo([$scope.prestamoP]);
                         GarantiasServices.update($scope.prestamoP.entity);
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
