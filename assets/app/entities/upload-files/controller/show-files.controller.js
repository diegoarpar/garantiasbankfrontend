/**
 * Created by joag on 9/06/16.
 */
(function(){
    'use strict';
    angular.module("wpc")
        .controller('ShowFilesController', ShowFilesController);

        ShowFilesController.$inject = ['$scope', 'UploadFiles', 'ShowFiles', '$timeout', 'ApiGarantias'];

    function ShowFilesController($scope, UShFiles, ShowFiles, $timeout, ApiGarantias) {
            $scope.log = [];
            $scope.retrieve = retrieve;

        function retrieve(){
            ShowFiles.retrieve($scope.name);
        }

    }


    }
)();
