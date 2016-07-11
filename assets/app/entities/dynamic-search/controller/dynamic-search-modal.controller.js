/**
 * Created by joag on 9/06/16.
 */
(function(){
        'use strict';
        angular.module("wpc")
            .controller('DynamicSearchModalController', DynamicSearchModalController);

        DynamicSearchModalController.$inject = ['$scope', 'entity',  'UploadFilesService', 'Upload', '$timeout', 'ApiGarantias'];

        function DynamicSearchModalController($scope, entity,  UploadFilesService, Upload, $timeout, ApiGarantias) {
            $scope.entity = entity;
            
            $scope.garantiaid = $scope.entity._id;

            $scope.model = "Garantia20";


            //an array of files selected
            $scope.files = [];

            $scope.$on("fileSelected", function (event, args) {
                $scope.$apply(function () {
                    //add the file object to the scope's files collection
                    $scope.files.push(args.file);
                    for(var i=0; i<$scope.files.length;i++)
                        UploadFilesService.create({files:$scope.files[i],model:$scope.model, garid:$scope.garantiaid});
                });
            });


            $scope.log = [];
            $scope.$watch('files', function () {
                // $scope.upload($scope.files);

                for(var i=0; i<$scope.files.length;i++)
                    UploadFilesService.create({files:$scope.files[i],model:$scope.model, garid:$scope.garanatiaid});
            });
            $scope.$watch('file', function () {
                if ($scope.file != null) {
                    $scope.files = [$scope.file];
                }
            });

            $scope.upload = function (files) {
                if (files && files.length) {
                    for (var i = 0; i < files.length; i++) {
                        var file = files[i];
                        if (!file.$error) {
                            Upload.upload({
                                url: ApiGarantias.url + 'upload/save',
                                data: {
                                    fileName: $scope.username,
                                    file: file
                                },
                                headers: {'Authorization': 'Bearer ' + $window.localStorage.getItem('token')}
                            }).then(function (resp) {
                                $timeout(function () {
                                    $scope.log.unshift('file: ' +
                                        resp.config.data.file.name +
                                        ', Response: ' + JSON.stringify(resp.data));
                                });
                            }, null, function (evt) {
                                var progressPercentage = parseInt(100.0 *
                                    evt.loaded / evt.total);
                                $scope.log.unshift('progress: ' + progressPercentage +
                                    '% ' + evt.config.data.file.name);
                            });
                        }
                    }
                }
            };
            
        }


    }
)();
