/**
 * Created by joag on 9/06/16.
 */
(function(){
        'use strict';
        angular.module("wpc")
            .controller('DynamicSearchModalController', DynamicSearchModalController);

        DynamicSearchModalController.$inject = ['$scope', 'entity'];

        function DynamicSearchModalController($scope, entity) {
            $scope.entity = entity;
            
        }


    }
)();
