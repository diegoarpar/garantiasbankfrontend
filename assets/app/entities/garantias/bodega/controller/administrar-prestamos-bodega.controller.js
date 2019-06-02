/**
 * Created by joag on 9/06/16.
 */

(function () {
        'use strict';
        angular.module("wpc")
            .controller('AdministrarPrestamosBodegaController', AdministrarPrestamosBodegaController);

        AdministrarPrestamosBodegaController.$inject = ['AuthenticationFactory','$scope', 'GarantiasServices',  '$location', '$rootScope', '$window', '$route','NgTableParams','$uibModal','ShareService','NumberService','UserLoginService'];

        function AdministrarPrestamosBodegaController(AuthenticationFactory,$scope, GarantiasServices, $location, $rootScope, $window, $route,NgTableParams,$uibModal,ShareService,NumberService,UserLoginService) {
            inSession($scope,AuthenticationFactory,$window,false);

        $scope.menu_activo=true;
        $scope.change_manu_activo=function(){
            $scope.menu_activo=$scope.menu_activo==true?false:true;

        }
        $scope.colapsoContenedor=true;
        $scope.cambiarColapsoContenedor=function(){

            GarantiasServices.showprestamo([{"estado":"PENDIENTE_CONFIRMACION_BODEGA"}]).$promise.then(function(data){
                $scope.tableParamsPrestamoPendienteConfirmar = new NgTableParams({}, { dataset: data});
                }
            );
            $scope.colapsoContenedor=$scope.colapsoContenedor==true?false:true;

        }

        $scope.colapsoContenedorPPendienteEntregar=true;
        $scope.cambiarColapsoContenedorPendienteEntregar=function(){

            GarantiasServices.showprestamo([{"estado":"USUARIO_PUEDE_PASAR_BODEGA"}]).$promise.then(function(data){
                $scope.tableParamsContainerPendienteEntregar = new NgTableParams({}, { dataset: data});
                }
            );
            $scope.colapsoContenedorPPendienteEntregar=$scope.colapsoContenedorPPendienteEntregar==true?false:true;

        }
        $scope.colapsoContenedorPrestado=true;
        $scope.cambiarColapsoContenedorPrestados=function(){

            GarantiasServices.showprestamo([{"estado":"PRESTADO"}]).$promise.then(function(data){
                $scope.tableParamsContainerPrestado = new NgTableParams({}, { dataset: data});
                }
            );
            $scope.colapsoContenedorPrestado=$scope.colapsoContenedorPrestado==true?false:true;

        }

        $scope.aprobar=function(row){
            $scope.prestamoP=row;
            var number =NumberService.getNumber();
                number.$promise.then(function(data){
                    if(data&&data[0]){
                        $scope.prestamoP.usuarioBodegaAprueba=UserLoginService.getUser();
                        $scope.prestamoP.usuarioBodegaApruebaFecha=data[0].number;
                        $scope.prestamoP.estado="USUARIO_PUEDE_PASAR_BODEGA";
                        var removePrestamo=GarantiasServices.removeprestamo([{estado:"PENDIENTE_CONFIRMACION_BODEGA",solicitudUsuario:$scope.prestamoP.solicitudUsuario, numero:$scope.prestamoP.numero}]);
                        removePrestamo.$promise.then(function(data){
                             $scope.prestamoP._id=null;
                             GarantiasServices.createprestamo([$scope.prestamoP]);

                        });
                    }

                });

        }

        $scope.entregar=function(row){
            $scope.prestamoP=row;
            NumberService.getNumber().$promise.then(function(data){
                if(data&&data[0]){
                    $scope.prestamoP.usuarioBodegaEntrega=UserLoginService.getUser();
                    $scope.prestamoP.usuarioBodegaEntregaFecha=data[0].number;
                    $scope.prestamoP.estado="PRESTADO";
                    var removePrestamo=GarantiasServices.removeprestamo([{estado:"USUARIO_PUEDE_PASAR_BODEGA",solicitudUsuario:$scope.prestamoP.solicitudUsuario, numero:$scope.prestamoP.numero]);
                    removePrestamo.$promise.then(function(data){
                         $scope.prestamoP._id=null;
                         GarantiasServices.createprestamo([$scope.prestamoP]);

                    });
                }

            });

        }

        $scope.recibir=function(row){
            $scope.prestamoP=row;
            for(var i=0;i<$scope.prestamoP.entity.length;i++){
                $scope.prestamoP.entity[i].prestamo=null;
            }

            NumberService.getNumber().$promise.then(function(data){
                if(data&&data[0]){
                    $scope.prestamoP.usuarioBodegaRecibe=UserLoginService.getUser();
                    $scope.prestamoP.usuarioBodegaRecibe=data[0].number;
                    $scope.prestamoP.estado="RECIBIDO";
                    GarantiasServices.removeprestamo([{estado:"PRESTADO",solicitudUsuario:$scope.prestamoP.solicitudUsuario, numero:$scope.prestamoP.numero}]).$promise.then(function(data){
                         $scope.prestamoP._id=null;
                         GarantiasServices.createprestamo([$scope.prestamoP]);
                         GarantiasServices.update($scope.prestamoP.entity);
                    });
                }

            });

        }

        $scope.rechazar=function(row){
            $scope.prestamoP=row;

            var number =NumberService.getNumber();
                number.$promise.then(function(data){
                    if(data&&data[0]){
                        $scope.prestamoP.aprobardoSolicitanteUsuario=UserLoginService.getUser();
                        $scope.prestamoP.aprobadorSolicitanteFecha=data[0].number;
                        $scope.prestamoP.estado="RECHAZADO";
                        var removePrestamo=GarantiasServices.removeprestamo([{estado:"PENDIENTE_CONFIRMACION_BODEGA",solicitudUsuario:$scope.prestamoP.solicitudUsuario, numero:$scope.prestamoP.numero}]);
                        removePrestamo.$promise.then(function(data){
                             $scope.prestamoP._id=null;
                             GarantiasServices.createprestamo([$scope.prestamoP]);

                        });
                    }

                });

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
        $scope.colapsoContenido=true;
        $scope.cambiarColapsoContenido=function(){
            $scope.colapsoContenido=$scope.colapsoContenido==true?false:true;

        }

        $scope.colapsoContenedorPrestado=true;
        $scope.cambiarColapsoContenedorPrestado=function(){
            $scope.colapsoContenedorPrestado=$scope.colapsoContenedorPrestado==true?false:true;

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

        $scope.mostrarUbicaciones= function(_this){
            $scope.rta = GarantiasServices.retrivebodegacontainerubication([{"container.code":_this.b.code,"container.storage":_this.b.storage,"container.key":_this.b.key}]);
            $scope.rta.$promise.then(function(data){
                $scope.tableParamsUbication = new NgTableParams({}, { dataset: data});
            });
        }
        $scope.getData2=function(){
            return $scope.data2;
        }
        $scope.setData2=function(data){
            $scope.data2=data;
        }
        $scope.mostrarDocumentosAsociados=function(contenedorSeleccionado){
            $scope.setData2=contenedorSeleccionado;
            var modalInstance = $uibModal.open({
                    templateUrl: 'assets/app/entities/garantias/bodega/view/documentos-contenedor.html',
                    controller: 'DocumentosContenedorBodegaController',
                    scope: $scope,
                    size: 'lg'
                }
            );
        }

        $scope.userParaAsociar=function(_this){
             $scope.contenedorSeleccionado=_this.ubicaciones;

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

            $scope.cargarSubseries = function() {
                var parameter=[{'fondo.key':$scope.fondoSelected.key}];

                $scope.subseries=GarantiasServices.showtrdpost(parameter);
            }

            $scope.cargarMetadatos = function() {

                var parameter2=[{'empresa.key':$scope.fondoSelected.key
                                 ,'subserie.key':$scope.subserieseleccionada.key}

                               ];
                var rta=GarantiasServices.showParametricSearchPost(parameter2);
                rta.$promise.then(function(data){
                    $scope.columnsMetadata=$scope.columnsMetadata=getMetadataFactoryToSearch(data);
                });


            }
            $scope.tableParamsFiltro = new NgTableParams({}, { dataset: []});
            $scope.lista=[];
            $scope.addColumn=function (col,index) {
                     $scope.lista.push(col);
                     $scope.tableParamsFiltro = new NgTableParams({}, { dataset:  $scope.lista});
                     $scope.columnsMetadata.splice(index, 1);
                 };
             $scope.removeRow=function (col,index) {
                  $scope.lista.splice(index, 1);
                  $scope.tableParamsFiltro = new NgTableParams({}, { dataset:  $scope.lista});
                  $scope.columnsMetadata.push(col);
              };

               $scope.buscar=function(setSearchParameters,type){
                    var listToSearch=[];
                    var o=loadSearchParameter($scope);
                    listToSearch.push(o);
                  var promise=GarantiasServices.showPost(listToSearch);
                  handleSubmitServicePromise(promise,null);

                  promise.$promise.then(function(data){
                     fillColumns(data,$scope);
                     update_columns($scope);
                     $scope.generateColumns=$scope.all_columns;
                     $scope.tablaContenido = new NgTableParams({}, { dataset:  data});


                  });

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
              $scope.switchBoolean=function(key) {

                  for(var idx=0;!!$scope.all_columns&&idx<$scope.all_columns.length;idx++)
                  if($scope.all_columns[idx].title==key.title){
                    $scope.all_columns[idx].checked = !$scope.all_columns[idx].checked;
                    break;
                  }
              }

              $scope.asociar=function(row,_this) {
                    row.ubicacionbodega=$scope.contenedorSeleccionado;
                    var promise=GarantiasServices.update([row]);
                    handleSubmitServicePromise(promise,null);
               }
              $scope.desasociar=function(row,_this) {
                  row.ubicacionbodega=null;
                  var promise=GarantiasServices.update([row]);
                  handleSubmitServicePromise(promise,null);
             }

        }

    })();
