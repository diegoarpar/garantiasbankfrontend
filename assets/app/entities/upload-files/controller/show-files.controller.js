/**
 * Created by joag on 9/06/16.
 */
(function () {
        'use strict';
        angular.module("wpc")
            .controller('ShowFilesController', ShowFilesController);

        ShowFilesController.$inject = ['$scope', 'ShowFiles', '$timeout', 'ApiGarantias'];

        function ShowFilesController($scope, ShowFiles, $timeout, ApiGarantias) {
            $scope.log = [];
            $scope.retrieve = retrieve;

            function retrieve() {
                ShowFiles.retrieve($scope.name).success(function (data) {
                    var file = new Blob([data], {type: 'application/pdf'});
                    $scope.pdfUrl = URL.createObjectURL(file);
                });
            }

            $scope.pdfName = 'Relativity: The Special and General Theory by Albert Einstein';
            $scope.scroll = 0;
            $scope.loading = 'loading';

            $scope.getNavStyle = function (scroll) {
                if (scroll > 100) return 'pdf-controls fixed';
                else return 'pdf-controls';
            }

            $scope.onError = function (error) {
                console.log(error);
            }

            $scope.onLoad = function () {
                $scope.loading = '';
            }

            $scope.onProgress = function (progress) {
                console.log(progress);
            }
        }


    })();
