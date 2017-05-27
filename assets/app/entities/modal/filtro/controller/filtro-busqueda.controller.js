/**
 * Created by joag on 9/06/16.
 */
(function () {
        'use strict';
        angular.module("wpc")
            .controller('FiltrarBusquedaController', FiltrarBusquedaController);

        FiltrarBusquedaController.$inject = ['AuthenticationFactory','$scope', 'DynamicSearch', 'CamposGenericosServices', '$uibModal', '$location', 'ShareService','$window','CamposParametricosServices','GarantiasServices','$uibModalInstance'];

        function FiltrarBusquedaController(AuthenticationFactory,$scope, DynamicSearch, CamposGenericosServices, $uibModal, $location, ShareService,$window,CamposParametricosServices,GarantiasServices,$uibModalInstance)
         {
            inSession($scope,AuthenticationFactory,$window);
            $scope.data = {};
            $scope.lista = [];
            $scope.listaBusqueda = [];
            $scope.columnsMetadata=[];
            $scope.addColumn=function (col) {
                 $scope.lista.push(col);
                 $scope.columnsMetadata.splice(col, 1);
             };
             $scope.removeRow=function (col) {

                              $scope.lista.splice(col, 1);
                              $scope.columnsMetadata.push(col);
                          };
            $scope.fondos=CamposParametricosServices.show({nombreparametrica:'fondo'});
            $scope.subseries=[];
            $scope.ok=function(){
                debugger;
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
                $uibModalInstance.dismiss('cancel');
            }

            $scope.cancel=function(){
                debugger;
                $scope.listaBusqueda=[];
                $scope.lista=[];
                $uibModalInstance.dismiss('cancel');
            }
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
