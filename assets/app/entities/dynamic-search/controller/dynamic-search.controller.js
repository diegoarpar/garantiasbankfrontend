/**
 * Created by joag on 9/06/16.
 */
(function () {
        'use strict';
        angular.module("wpc")
            .controller('DynamicSearchController', DynamicSearchController);

        DynamicSearchController.$inject = ['AuthenticationFactory','$scope', 'DynamicSearch', 'CamposGenericosServices', '$uibModal', '$location', 'ShareService','$window','CamposParametricosServices','GarantiasServices'];

        function DynamicSearchController(AuthenticationFactory,$scope, DynamicSearch, CamposGenericosServices, $uibModal, $location, ShareService,$window,CamposParametricosServices,GarantiasServices)
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
            function openStartDate() {
                $scope.popupStartDate.opened = true;
            };
            function openEndDate() {
                $scope.popupEndDate.opened = true;
            };

            function addColumn(col) {
                $scope.lista.push($scope.columnsMetadata[col]);
                $scope.columnsMetadata.splice(col, 1);
            }

            function buscar() {
             showWaiteImage(true);
                var searchVector = [];
                for (var i = 0; i < $scope.lista.length; i++) {
                    searchVector[i] = {
                        key: $scope.lista[i].key,
                        value: $scope.listaBusqueda[i]
                    };
                }

                var search = {
                    queryString: searchVector
                };

                if (angular.isDefined($scope.data.word)) {
                    search.word = $scope.data.word;
                }

                if (angular.isDefined($scope.data.startDate)) {
                    search.startDate = $scope.data.startDate.getTime();
                }
                if (angular.isDefined($scope.data.endDate)) {
                    search.endDate = $scope.data.endDate.getTime();
                }


                DynamicSearch.searchWithMetadata(search).success(function (data) {
                    $scope.searchResults = data;

                    fillColumns(data,$scope);
                    update_columns($scope);
                    $scope.generateColumns=$scope.all_columns;
                    showWaiteImage(false);

                }).error(function (error) {
                    alert(error)
                    showWaiteImage(false);
                })
            }

            function removeRow(index) {
                if (index == 0) {
                    $scope.lista.shift();
                    $scope.listaBusqueda.shift();
                }
                else {
                    $scope.columnsMetadata[$scope.columnsMetadata.length] = $scope.lista[index];
                    $scope.lista.splice(index, 1);
                    $scope.listaBusqueda.splice(index, 1);
                }
            }



            function filterSearchResult() {
                $scope.copySearchResult = [];
                angular.forEach(vector, function (object, key) {

                })
            }

            function openModal(entity) {
                ShareService.set(entity);
                var modalInstance = $uibModal.open({
                        templateUrl: 'assets/app/entities/dynamic-search/view/dynamic-search-modal.html',
                        controller: 'DynamicSearchModalController',
                        scope: $scope,
                        size: 'lg'
                    }
                );
            }
            function openModalFunctionary(entity) {

                ShareService.set(entity);
                var modalInstance = $uibModal.open({
                        templateUrl: 'assets/app/entities/dynamic-search/view/dynamic-search-modal-functionary.html',
                        controller: 'DynamicSearchModalController',
                        scope: $scope,
                        size: 'lg'
                    }
                );
            }
            function switchBoolean(key) {
                $scope.all_columns[r].checked = !$scope.all_columns[key].checked;
            }
        }


    })();
