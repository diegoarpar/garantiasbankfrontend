/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function() {
    'use strict';
    angular.module('wpc')
        .factory('UploadFilesService', UploadFilesService);

    UploadFilesService.$inject = ['$resource','ApiGarantias','$rootScope','$window'];

    function UploadFilesService($resource,ApiGarantias,$rootScope,$window,$scope) {
                return $resource(ApiGarantias.url+'upload/save', {}, {
                    create: { data:{file:'@file'},
                            method: 'POST',
                            headers:{ 'Content-Type': undefined,'Authorization':'Bearer '+$window.localStorage.getItem('token')},
                            transformRequest: function(data) {
                                var formData = new FormData();

                                formData.append("fileName", data.model);
//                                formData.append("garid", angular.toJson(data.garid));
                                formData.append("timestamp", data.garid.timestamp);
                                formData.append("machineIdentifier", data.garid.machineIdentifier);
                                formData.append("processIdentifier", data.garid.processIdentifier);
                                formData.append("counter", data.garid.counter);
//                                 for (var i = 0; i < data.files.length; i++) {
                                    formData.append("file" , data.files);
//                                }
                                return formData;
                            }
                            }
                })
            }



})();


