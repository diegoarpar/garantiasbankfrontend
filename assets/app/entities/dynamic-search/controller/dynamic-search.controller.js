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

            DynamicSearch.getMetaData().success(function(data){
                alert(data);
                $scope.columnsMetadata = data;
            })

            function addColumn(col){
                $scope.lista.push(col);
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
                })
            }
        }


    }
)();
