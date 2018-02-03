/**
 * Created by joag on 9/06/16.
 */
(function () {
        'use strict';
        angular.module("wpc")
            .controller('FiltrarBusquedaController', FiltrarBusquedaController);

        FiltrarBusquedaController.$inject = ['AuthenticationFactory','$scope', 'DynamicSearch',
         '$uibModal', '$location', 'ShareService','$window','GarantiasServices'];

        function FiltrarBusquedaController(AuthenticationFactory,$scope, DynamicSearch,
         $uibModal, $location, ShareService,$window,GarantiasServices)
         {
            inSession($scope,AuthenticationFactory,$window);
            $scope.data = {};
            $scope.lista = [];
            $scope.listaBusqueda = [];
            $scope.columnsMetadata=[];
            $scope.addColumn=function (col,index) {

                 $scope.lista.push(col);
                 $scope.columnsMetadata.splice(index, 1);
             };
             $scope.removeRow=function (col,index) {

                              $scope.lista.splice(index, 1);
                              $scope.columnsMetadata.push(col);
                          };
            $scope.fondos=GarantiasServices.showParametric({nombreparametrica:'fondo'});
            $scope.subseries=[];

            $scope.ok=function(setSearchParameters,type){

                var listToSearch=[];
                var o=loadSearchParameter($scope);
                listToSearch.push(o);
                var promise=GarantiasServices.showPost(listToSearch);
                handleSubmitServicePromise(promise,null);
                $scope.setResultSearch(promise);

                if(setSearchParameters){
                    $scope.setSearchParameters(listToSearch);
                }
                $scope.lista=[];
                listToSearch=[];
                $scope.listaBusqueda=[];
                $scope.$dismiss();



            }
            $scope.okReport=function(){
                    $scope.ok(true,"report");
                    $scope.loadReport($scope.reporteSeleccionado);


                }
            $scope.cancel=function(){
                $scope.listaBusqueda=[];
                $scope.lista=[];
                $scope.$dismiss();
            }
            $scope.dateOptions = {formatYear: 'yy', startingDay: 1};
            $scope.openStartDate=function (){$scope.popupStartDate.opened = true;};
            $scope.openEndDate=function(){$scope.popupEndDate.opened = true;};
            $scope.popupStartDate = {opened: false};
            $scope.popupEndDate = {opened: false};
            $scope.data={};
            $scope.cargarSubseries = function() {
                var parameter=[{'fondo.key':$scope.fondoSelected.key}];

                $scope.subseries=GarantiasServices.showtrdpost(parameter);
            }
            $scope.cargarMetadatosReportes=function(){

                $scope.cargarMetadatos();
                var parameter=[{'fondo.key':$scope.fondoSelected.key,'subserie.key':$scope.subserieseleccionada.key}];

                var promise = GarantiasServices.showReportPost(parameter);
                $scope.reportes=promise;

            };
            $scope.cargarMetadatos = function() {

                var parameter2=[{'empresa.key':$scope.fondoSelected.key
                                 ,'subserie.key':$scope.subserieseleccionada.key}

                               ];
                var rta=GarantiasServices.showParametricSearchPost(parameter2);
                rta.$promise.then(function(data){
                    $scope.columnsMetadata=$scope.columnsMetadata=getMetadataFactoryToSearch(data);
                });


            }
        }


    })();
