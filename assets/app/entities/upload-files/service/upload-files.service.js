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
                    create: { data:{file:'@file'},method: 'POST',  headers:{ 'Content-Type': undefined,'Authorization':'Bearer '+$window.localStorage.getItem('token')},
                            transformRequest: function(data) {
                                var formData = new FormData();

                                formData.append("fileName", data.model);
//                                formData.append("garid", angular.toJson(data.garid));
                                formData.append("garid", data.garid);
//                                 for (var i = 0; i < data.files.length; i++) {
                                    formData.append("file" , data.files);
//                                }
                                return formData;
                            }
                            },

                    show: { method: 'GET', isArray:true, params: {processName: '@processName',dateStart:'@dateEnd',dateEnd:'@dateEnd'}, headers:{'Authorization':'Bearer '+$window.localStorage.getItem('token')}},
                    update: { method: 'PUT', isArray:false, params: {}, headers:{'Authorization':'Bearer '+$window.localStorage.getItem('token')},
                            transformResponse: function(res, headers) {
                                //var data = angular.fromJson(res);
                                return res;
                            }
                    },
                    delete: { method: 'DELETE', params: {id: '@id'} }
                })
            }



})();


