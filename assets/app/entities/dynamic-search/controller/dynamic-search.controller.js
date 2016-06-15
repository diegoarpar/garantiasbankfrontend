/**
 * Created by joag on 9/06/16.
 */
(function(){
        'use strict';
        angular.module("wpc")
            .controller('DynamicSearchController', DynamicSearchController);

            DynamicSearchController.$inject = ['$scope', 'DynamicSearch'];

        function DynamicSearchController($scope, DynamicSearch) {
            $scope.lista = [];
            $scope.listaBusqueda = [];
            $scope.addColumn = addColumn;
            $scope.buscar = buscar;
            $scope.removeRow = removeRow;
            $scope.generateColumns = generateColumns;
            $scope.filterSearchResult = filterSearchResult;

            DynamicSearch.getMetaData().success(function(data){
                $scope.columnsMetadata = data;
            });

            function addColumn(col){
                $scope.lista.push($scope.columnsMetadata[col]);
                $scope.columnsMetadata.splice(col,1);
            }

            function buscar(){
                var searchVector = [];
                for(var i = 0; i< $scope.lista.length; i++){
                    searchVector[i]={
                        key: $scope.lista[i],
                        value: $scope.listaBusqueda[i]
                    };
                }

                DynamicSearch.searchWithMetadata(searchVector).success(function(data){
                    alert(data);
                    $scope.searchResults = data;
                    generateColumns(data);
                })
            }

            function removeRow(index){
                if(index==0){
                    $scope.lista.shift();
                    $scope.listaBusqueda.shift();
                }
                else {
                    $scope.columnsMetadata[$scope.columnsMetadata.length] = $scope.lista[index];
                    $scope.lista.splice(index, 1);
                    $scope.listaBusqueda.splice(index, 1);
                }
            }

            function generateColumns(vector){
                $scope.allColumns = [];
                $scope.allColumnsName = [];
                angular.forEach(vector, function(object, key){
                    angular.forEach(object, function(object2, key2){
                        if($scope.allColumnsName.indexOf(key2) == -1){
                            $scope.allColumnsName.push(key2);
                            var columnObject = new Object();
                            columnObject.title =  key2;
                            columnObject.checked = true;
                            $scope.allColumns.push(columnObject);
                        }
                    })
                })
            }
            
            function filterSearchResult(){
                $scope.copySearchResult = [];
                angular.forEach(vector, function(object, key){
                    
                })
            } 
        }


    }
)();
