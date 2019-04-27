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

        $scope.menu_activo=true;
        $scope.change_manu_activo=function(){
            $scope.menu_activo=$scope.menu_activo==true?false:true;

        }
        $scope.colapsoContenedor=true;
        $scope.cambiarColapsoContenedor=function(){
            $scope.colapsoContenedor=$scope.colapsoContenedor==true?false:true;

        }
        $scope.colapsoContenido=false;
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

              $scope.switchBoolean=function(key) {

                  for(var idx=0;!!$scope.all_columns&&idx<$scope.all_columns.length;idx++)
                  if($scope.all_columns[idx].title==key.title){
                    $scope.all_columns[idx].checked = !$scope.all_columns[idx].checked;
                    break;
                  }
              }

              $scope.asociar=function(row,_this) {
                    row.ubicacionbodega=$scope.contenedorSeleccionado;
                    console.log(row);
                    var promise=GarantiasServices.update([row]);
                    handleSubmitServicePromise(promise,null);
               }
              $scope.desasociar=function(row,_this) {
                  row.ubicacionbodega=null;
                  console.log(row);
                  var promise=GarantiasServices.update([row]);
                  handleSubmitServicePromise(promise,null);
             }

        }

    })();
