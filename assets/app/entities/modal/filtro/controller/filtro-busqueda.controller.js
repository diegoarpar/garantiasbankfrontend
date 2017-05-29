/**
 * Created by joag on 9/06/16.
 */
(function () {
        'use strict';
        angular.module("wpc")
            .controller('FiltrarBusquedaController', FiltrarBusquedaController);

        FiltrarBusquedaController.$inject = ['AuthenticationFactory','$scope', 'DynamicSearch', 'CamposGenericosServices', '$uibModal', '$location', 'ShareService','$window','CamposParametricosServices','GarantiasServices'];

        function FiltrarBusquedaController(AuthenticationFactory,$scope, DynamicSearch, CamposGenericosServices, $uibModal, $location, ShareService,$window,CamposParametricosServices,GarantiasServices)
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
            $scope.fondos=CamposParametricosServices.show({nombreparametrica:'fondo'});
            $scope.subseries=[];
            $scope.ok=function(){
                var listToSearch=[];
                var o={};
                if($scope.aditionalFilter!=null){
                    o=JSON.parse(JSON.stringify($scope.aditionalFilter));
                }
                for(var i=0;i<$scope.lista.length;i++){
                        o[$scope.lista[i].key]=$scope.lista[i].toSearch;
                }
                listToSearch.push(o);
                var promise=GarantiasServices.showPost(listToSearch);
                handleSubmitServicePromise(promise,null);
                $scope.setResultSearch(promise);

                $scope.lista=[];
                listToSearch=[];
                $scope.listaBusqueda=[];
                $scope.$dismiss();
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
            $scope.cargarMetadatos = function() {
                var parameter=[{'fondo.key':$scope.fondoSelected.key,'subserie.key':$scope.subserieseleccionada.key}];

                var promise = GarantiasServices.showMetadataPost(parameter);
                promise.$promise.then(function(data){

                    if(data!=null){
                        $scope.columnsMetadata=getMetadataFactoryToSearch(data);
                    }
                });
            }
        }


    })();
