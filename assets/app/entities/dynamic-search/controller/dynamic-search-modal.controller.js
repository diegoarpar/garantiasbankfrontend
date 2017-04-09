/**
 * Created by joag on 9/06/16.
 */
(function () {
        'use strict';
        angular.module("wpc")
            .controller('DynamicSearchModalController', DynamicSearchModalController);

        DynamicSearchModalController.$inject = ['AuthenticationFactory','$scope', 'ShareService', 'UploadFilesService', 'Upload', '$timeout', 'ApiGarantias', 'ShowFiles', '$sce','$window'];

        function DynamicSearchModalController(AuthenticationFactory,$scope, ShareService, UploadFilesService, Upload, $timeout, ApiGarantias, ShowFiles, $sce,$window) {

            inSession($scope,AuthenticationFactory,$window);
            $scope.entity = ShareService.get();
            $scope.garantiaid = $scope.entity._id;
            $scope.model = "Garantia20";
            $scope.upload = upload;
            $scope.getDate = getDate;
            $scope.log = [];
            $scope.retrieve = retrieve;

            $scope.rowDetailShow=function(rowSelected){
                 var row={};
                row["key"]=rowSelected;
                return rowDetailShow(row);
            }
            ShowFiles.listOfFiles.get({garid: $scope.garantiaid}).$promise.then(
                function (data) {
                    $scope.listOfFiles = data;
                },
                function (error) {

                }
            );

            //an array of files selected
            $scope.files = [];

            $scope.$on("fileSelected", function (event, args) {
                $scope.$apply(function () {
                    //add the file object to the scope's files collection
                    $scope.files.push(args.file);
                    for (var i = 0; i < $scope.files.length; i++)
                        UploadFilesService.create({
                            files: $scope.files[i],
                            model: $scope.model,
                            garid: $scope.garantiaid
                        });
                });
            });


            $scope.log = [];
            $scope.$watch('files', function () {
                // $scope.upload($scope.files);
                for (var i = 0; i < $scope.files.length; i++)
                    UploadFilesService.create({files: $scope.files[i], model: $scope.model, garid: $scope.garantiaid});
            });
            $scope.$watch('file', function () {
            //alert("upload file");
                if ($scope.file != null) {
                    $scope.files = [$scope.file];
                }
            });

            function upload(files) {
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

            function getDate(date) {
                return new Date(date);
            }

            $scope.pdfUrlArray = {};
            function retrieve(url) {
                ShowFiles.retrieve(url).success(function (data) {
                    var file = new Blob([data], {type: 'application/pdf'});
                    $scope.pdfUrlArray[url] = URL.createObjectURL(file);
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

            //$scope.content = $sce.trustAsResourceUrl($scope.pdfUrl);

        }


    })();
