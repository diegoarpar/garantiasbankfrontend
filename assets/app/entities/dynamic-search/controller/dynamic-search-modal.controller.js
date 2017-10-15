/**
 * Created by joag on 9/06/16.
 */
(function () {
        'use strict';
        angular.module("wpc")
            .controller('DynamicSearchModalController', DynamicSearchModalController);

        DynamicSearchModalController.$inject = ['AuthenticationFactory','ApiFiles','$scope', 'ShareService', 'UploadFilesService', 'Upload', '$timeout', 'ApiGarantias', 'ShowFiles', '$sce','$window','CMSController','$http','$uibModal'];

        function DynamicSearchModalController(AuthenticationFactory,ApiFiles,$scope, ShareService, UploadFilesService, Upload, $timeout, ApiGarantias, ShowFiles, $sce,$window,CMSController,$http,$uibModal) {

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
            $scope.getBarCode=function(){
                return $scope.entity.envio.numero;
            };
            $scope.getBarCodeSubserie=function(){
                return $scope.entity.ingreso.subserie;
            };
            $scope.modalBarCode=function(entity){
                  $scope.entity=entity;
                  var modalInstance = $uibModal.open({
                                          templateUrl: 'assets/app/entities/modal/filtro/view/modal-barras.html',
                                          controller: 'GenerarBarrasController',
                                          scope: $scope,
                                          size: 'lg'
                                      }
                                  );
                };
            ShowFiles.listOfFiles.get({garid: $scope.garantiaid}).$promise.then(
                function (data) {
                    $scope.listOfFiles = data;
                },
                function (error) {

                }
            );

            //an array of files selected
            $scope.files = [];

            $scope.saveDocumentType=function(metadata,documentType){
                var data={'documentType':documentType,'garId':$scope.entity._id,'metadata':metadata};
                if($scope.files.length>0)
                    showWaiteImage(true);
                    for (var i = 0; i < $scope.files.length; i++){
                        var promise=UploadFilesService.create({
                            files: $scope.files[i],
                            model: $scope.model,
                            garid: $scope.garantiaid,
                            metadata: $scope.metadata
                        });
                        promise.$promise.then(function(data1){
                            alert("archivo guardado");
                            showWaiteImage(false);
                            $scope.files=[];
                            ShowFiles.listOfFiles.get({garid: $scope.garantiaid}).$promise.then(
                                        function (data) {
                                            $scope.listOfFiles = data;
                                        },
                                        function (error) {
                                            alert("error al adjuntar el archivo");
                                            showWaiteImage(false);
                                        }
                                    );
                        },
                         function (error) {
                             alert("error al adjuntar el archivo");
                             showWaiteImage(false);
                         }
                         );
                    }
                    $scope.files=[];
            }
            $scope.$on("fileSelected", function (event, args) {
                $scope.$apply(function () {
                    openModal($scope,$uibModal,'assets/app/entities/modal/filtro/view/modal-tipo-documento.html','ModalTipoDocumentoController');
                    $scope.files.push(args.file);

                });
            });


            $scope.log = [];
            $scope.$watch('files', function () {
                if(!!$scope.files&&$scope.files.length>0)
                openModal($scope,$uibModal,'assets/app/entities/modal/filtro/view/modal-tipo-documento.html','ModalTipoDocumentoController');

            });
            $scope.$watch('file', function () {
            //alert("upload file");
                if ($scope.file != null) {
                    $scope.files = [$scope.file];
                }
            });

            function upload(files) {

                showWaiteImage(true);
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

                                showWaiteImage(false);
                                $timeout(function () {
                                    $scope.log.unshift('file: ' +
                                        resp.config.data.file.name +
                                        ', Response: ' + JSON.stringify(resp.data));
                                });
                            }, null, function (evt) {
                                showWaiteImage(false);
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

                CMSController.findFile({fileId:url});
                /*ShowFiles.retrieve(url).success(function (data) {
                    var file = new Blob([data], {type: 'application/pdf'});
                    $scope.pdfUrlArray[url] = URL.createObjectURL(file);
                });*/
            }
            $scope.newDate=function (date) {

            }
            $scope.retrieveFile=function (url,fileName) {
                 var headers2= getGenericHeader($window);

            showWaiteImage(true);
                $http({
                    url: ApiFiles.url+"FileServices",
                    headers:headers2,
                    method: "GET",
                    params: {fileId:url},
                    responseType: 'arraybuffer'
                 }).success(function (data, status, headers, config) {
                       var blob = new Blob([data], {type:"application/octet-stream"});
                      saveAs(blob, fileName);
                      showWaiteImage(false);
                   }).error(function (data, status, headers, config) {
                       //upload failed
                      showWaiteImage(false);
                   });
                //var promise=CMSController.findFile({fileId:url});
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

    function base64ToArrayBuffer(base64,window) {

            //var binaryString =  window.atob(base64);
            var binaryString =  base64;
            var binaryLen = binaryString.length;
            var bytes = new Uint8Array(binaryLen);
            for (var i = 0; i < binaryLen; i++)        {
                var ascii = binaryString.charCodeAt(i);
                bytes[i] = ascii;
            }
            return bytes;
        }
        var saveByteArray = (function (data,name) {
        debugger;

            var a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
                var blob = new Blob(data, {type: "octet/stream"}),
                    url = window.URL.createObjectURL(blob);
                a.href = url;
                a.download = name;
                a.click();
                window.URL.revokeObjectURL(url);

            });