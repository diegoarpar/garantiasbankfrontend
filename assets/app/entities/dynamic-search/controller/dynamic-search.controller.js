/**
 * Created by joag on 9/06/16.
 */
(function () {
        'use strict';
        angular.module("wpc")
            .controller('DynamicSearchController', DynamicSearchController);

        DynamicSearchController.$inject = ['AuthenticationFactory','$scope', 'DynamicSearch', 'CamposGenericosServices', '$uibModal', '$location', 'ShareService','$window'];

        function DynamicSearchController(AuthenticationFactory,$scope, DynamicSearch, CamposGenericosServices, $uibModal, $location, ShareService,$window) {
            inSession($scope,AuthenticationFactory,$window);
            $scope.data = {};
            $scope.lista = [];
            $scope.listaBusqueda = [];
            $scope.addColumn = addColumn;
            $scope.buscar = buscar;
            $scope.removeRow = removeRow;
            $scope.generateColumns = generateColumns;
            $scope.filterSearchResult = filterSearchResult;
            $scope.openStartDate = openStartDate;
            $scope.openEndDate = openEndDate;
            $scope.openModal = openModal;
            $scope.switchBoolean = switchBoolean;

            CamposGenericosServices.show({fieldType: 'datos'}).$promise.then(function (data) {
                $scope.columnsMetadata = data;
            });

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
                    generateColumns(data);
                }).error(function (error) {
                    alert(error)
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

            function generateColumns(vector) {
                $scope.allColumns = {};
                angular.forEach(vector, function (object, key) {
                    angular.forEach(object, function (object2, key2) {
                        if (key2 != '_id') {
                            $scope.allColumns[key2] = true;
                        }
                        else {
                            $scope.allColumns[key2] = false;
                        }
                    })
                })
            }

            function filterSearchResult() {
                $scope.copySearchResult = [];
                angular.forEach(vector, function (object, key) {

                })
            }

            function openModal(entity) {
                ShareService.set(entity);
                $location.url('/dynamic-search-details');
            }

            function switchBoolean(key) {
                $scope.allColumns[key] = !$scope.allColumns[key];
            }
        }


    })();
