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

           DynamicSearch.query().$promise.then(function(data){
               alert(data);
               $scope.columnsMetadata = data;
           })

            $scope.addColumn = function(col){
                $scope.lista.push(col);
            }
        }


    }
)();
