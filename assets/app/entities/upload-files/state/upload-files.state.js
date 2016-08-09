/**
 * Created by joag on 9/06/16.
 */
(function () {
        'use strict';
        angular.module("wpc")
            .config(UploadFilesState);

        UploadFilesState.$inject = ['$routeProvider'];

        function UploadFilesState($routeProvider) {
            $routeProvider.when('/upload-files', {
                    templateUrl: 'assets/app/entities/upload-files/view/upload-files.html',
                    controller: 'UploadFilesController'
                }
            ).when('/upload-files/view', {
                    templateUrl: 'assets/app/entities/upload-files/view/show-files.html',
                    controller: 'ShowFilesController'
                }
            );
        }
    })();
