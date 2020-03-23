/**
 * Created by joag on 9/06/16.
 */

(function () {
        'use strict';
        angular.module("wpc")
            .controller('UbicarContenidoBodegaController', UbicarContenidoBodegaController);

        UbicarContenidoBodegaController.$inject = ['AuthenticationFactory','$scope', 'GarantiasServices',  '$location', '$rootScope', '$window', '$route','NgTableParams','$uibModal','ShareService'];

        function UbicarContenidoBodegaController(AuthenticationFactory,$scope, GarantiasServices, $location, $rootScope, $window, $route,NgTableParams,$uibModal,ShareService) {
            inSession($scope,AuthenticationFactory,$window,false);
        $scope.contenedorMostrarUbicacion=null;
        $scope.descripcioncontenedorMostrarUbicacion="";
        $scope.menu_activo=true;
        $scope.change_manu_activo=function(){
            $scope.menu_activo=$scope.menu_activo==true?false:true;

        }


        $scope.colapsoContenedor=true;
        $scope.cambiarColapsoContenedor=function(){
            $scope.colapsoContenedor=$scope.colapsoContenedor==true?false:true;

        }

        $scope.colapsoContenedorUbicacion=true;
        $scope.cambiarColapsoContenedorUbicacion=function(){
            $scope.colapsoContenedorUbicacion=$scope.colapsoContenedorUbicacion==true?false:true;

        }
        $scope.colapsoContenido=true;
        $scope.cambiarColapsoContenido=function(){
            $scope.colapsoContenido=$scope.colapsoContenido==true?false:true;

        }
        $scope.metadataContenedores=[];
        $scope.metadataContenedoresAll=[];
        GarantiasServices.showParametricpost([{nombreparametrica:"bodegaContenedor"}]).$promise.then(function(data){
            $scope.metadataContenedoresAll=data;
        });

        $scope.metadataUbicacionAll=[];
        GarantiasServices.showParametricpost([{nombreparametrica:"bodegaUbicacion"}]).$promise.then(function(data){
            $scope.metadataUbicacionAll=data;
        });

        $scope.cargarMetadatosBodega=function(fondo){

            $scope.metadataContenedores=[];
            GarantiasServices.showParametricpost([{nombreparametrica:"bodegaContenedor","add1.key":$scope.fondoSeleccionado.key,"add2.key":$scope.bodegaSeleccionada.key}]).$promise.then(function(data){
                $scope.metadataContenedores=data;

            });

        }
        $scope.metadataUbicacion=[];
        $scope.cargarMetadatosUbicacion=function(fondo){
            $scope.metadataUbicacion=[];
            GarantiasServices.showParametricpost([{nombreparametrica:"bodegaUbicacion","add1.key":$scope.fondoSeleccionadoU.key,"add2.key":$scope.bodegaSeleccionadaU.key}]).$promise.then(function(data){
                $scope.metadataUbicacion=data;

            });

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

        $scope.cargarBodegasU=function(fondo){
            $scope.bodegasrta=GarantiasServices.showbodega([{nombreparametrica: $scope.fondoSeleccionadoU.nombreparametrica,key: $scope.fondoSeleccionadoU.key}]);
            $scope.bodegasrta.$promise.then(function (data){
                    $scope.bodegasU=[];
                    for (var i=0;!!data&&i< data.length;i++)
                        for (var j=0;!!data[i]&&!!data[i].nodes&&j< data[i].nodes.length;i++)
                            $scope.bodegasU.push(data[i].nodes[j]);
                }
            );

        }

        $scope.mostrarUbicaciones= function(row){
            $scope.contenedorMostrarUbicacion=row;
            for(var i=0;i<$scope.metadataContenedores.length;i++){
                $scope.descripcioncontenedorMostrarUbicacion=$scope.metadataContenedores[i].value+":"+row[$scope.metadataContenedores[i].key];
                break;
            }
            $scope.rta = GarantiasServices.retrivebodegacontainerubication([{"container":row}]);
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
        $scope.asociarTodoElResultado=function(){
           if(!!$scope.tablaContenido&&!!$scope.tablaContenido.data&&$scope.tablaContenido.data.length>0){
            for(var i=0; i<$scope.tablaContenido.data.length;i++){
                $scope.tablaContenido.data[i].ubicacionbodega=$scope.contenedorSeleccionado;
            }
            var promise=GarantiasServices.update($scope.tablaContenido.data);
            handleSubmitServicePromise(promise,null);
            }

        }
        $scope.asociarADescripcion="";
        $scope.userParaAsociar=function(row){
             $scope.contenedorSeleccionado=row;
              $scope.asociarADescripcion="";
              for(var i=0;i<$scope.metadataUbicacionAll.length;i++){
                    if(!!row[$scope.metadataUbicacionAll[i].key]){
                        $scope.asociarADescripcion+=$scope.metadataUbicacionAll[i].value+": ";
                        $scope.asociarADescripcion+= !!row[$scope.metadataUbicacionAll[i].key]?row[$scope.metadataUbicacionAll[i].key]+" ":" ";
                    }
              }
              for(var i=0;i<$scope.metadataContenedorAll.length;i++){
                        if(!!row.container[$scope.metadataContenedorAll[i].key]){
                        $scope.asociarADescripcion+=!!$scope.metadataContenedorAll[i].value?$scope.metadataContenedorAll[i].value+": ":" ";
                        $scope.asociarADescripcion+=row.container[$scope.metadataContenedorAll[i].key]+ " " ;
                      }
                }
        }
        $scope.busqueda={};
        $scope.ok=function(){
            $scope.busquedar= {"key.key":!!$scope.fondoSeleccionado?$scope.fondoSeleccionado.key:{$regex:"^.*", $options: "i"}
            ,"storage.key":!!$scope.bodegaSeleccionada?$scope.bodegaSeleccionada.key:{$regex:"^.*", $options: "i"}};
            for(var i=0;i<$scope.metadataContenedores.length;i++){

                $scope.busquedar[$scope.metadataContenedores[i].key]=!!$scope.busqueda[$scope.metadataContenedores[i].key]?{$regex:"^"+$scope.busqueda[$scope.metadataContenedores[i].key]+".*", $options: "i"}:{$regex:"^.*", $options: "i"}
            }
            $scope.rta = GarantiasServices.retrivebodegacontainer([

                                           $scope.busquedar]
                                           );

            $scope.rta.$promise.then(function(data){
                $scope.tableParamsContainer = new NgTableParams({}, { dataset: data});
            });

        }


        $scope.okUbicacion=function(){


            $scope.metadataContenedorAll=[];
            $scope.contenedorMostrarUbicacion=null;
            $scope.descripcioncontenedorMostrarUbicacion="";
            $scope.busquedar= {"container.key.key":!!$scope.fondoSeleccionadoU?$scope.fondoSeleccionadoU.key:{$regex:"^.*", $options: "i"}
            ,"container.storage.key":!!$scope.bodegaSeleccionadaU?$scope.bodegaSeleccionadaU.key:{$regex:"^.*", $options: "i"}};
            for(var i=0;i<$scope.metadataUbicacion.length;i++){

                $scope.busquedar[$scope.metadataUbicacion[i].key]=!!$scope.busqueda[$scope.metadataUbicacion[i].key]?{$regex:"^"+$scope.busqueda[$scope.metadataUbicacion[i].key]+".*", $options: "i"}:{$regex:"^.*", $options: "i"}
            }

            var consulta={};
            consulta.nombreparametrica="bodegaContenedor";
            !!$scope.fondoSeleccionadoU&&!!$scope.fondoSeleccionadoU.value?consulta.add1={key:$scope.fondoSeleccionadoU.value}:"";
            !!$scope.bodegaSeleccionadaU&&!!$scope.bodegaSeleccionadaU.value?consulta.add2={key:$scope.bodegaSeleccionadaU.value}:"";

            GarantiasServices.showParametricpost([consulta]).$promise.then(function(data){
                $scope.metadataContenedorAll=data;

            });
            $scope.rta = GarantiasServices.retrivebodegacontainerubication([

                                           $scope.busquedar]
                                           );

            $scope.rta.$promise.then(function(data){
                $scope.tableParamsUbication = new NgTableParams({}, { dataset: data});

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
                          templateUrl: 'assets/app/entities/dynamic-search/view/dynamic-search-modal.html',
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
