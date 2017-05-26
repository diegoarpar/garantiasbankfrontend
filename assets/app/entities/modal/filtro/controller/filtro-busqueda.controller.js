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
            $scope.addColumn = addColumn;
            $scope.buscar = buscar;
            $scope.removeRow = removeRow;
            //$scope.generateColumns = generateColumns;
            $scope.filterSearchResult = filterSearchResult;
            $scope.openStartDate = openStartDate;
            $scope.openEndDate = openEndDate;
            $scope.openModal = openModal;
            $scope.switchBoolean = switchBoolean;
            $scope.openModalFunctionary=openModalFunctionary;
            $scope.dateOptions = {
                formatYear: 'yy',
                startingDay: 1
            };
            $scope.popupStartDate = {
                opened: false
            };
            $scope.popupEndDate = {
                opened: false
            };

            $scope.fondos=CamposParametricosServices.show({nombreparametrica:'fondo'});
            $scope.subseries=[];

            $scope.cargarSubseries = function() {
                var parameter=[{'fondo.key':$scope.fondoSelected.key}];
                $scope.subseries=GarantiasServices.showtrdpost(parameter);
            }
            $scope.cargarMetadatos = function() {
                var parameter=[{'fondo.key':$scope.fondoSelected.key,'subserie.key':$scope.subserieseleccionada.key}];

                var promise = GarantiasServices.showMetadataPost(parameter);

                promise.$promise.then(function(data){

                    if(data!=null){

                        $scope.columnsMetadata=[];
                        for(var i=0;i<data.length;i++){
                            for(var j=0;j<data[i].subserie.metadata.length;j++){
                                $scope.columnsMetadata.push({fieldType:data[i].subserie.metadata[j].fieldType,key:data[i].subserie.metadata[j].key,value:data[i].subserie.metadata[j].value})
                            }
                            for(var j=0;j<data[i].tipodocumento.length;j++){
                                for(var k=0;k<data[i].tipodocumento[j].metadata.length;k++){
                                    $scope.columnsMetadata.push({fieldType:data[i].tipodocumento[j].metadata[k].fieldType,key:data[i].tipodocumento[j].metadata[k].key,value:data[i].tipodocumento[j].metadata[k].value})

                                }
                            }
                        }

                    }
                });
            }
        }


    })();
