/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function () {
    'use strict';
    angular.module('wpc')
        .factory('ShowFiles', ShowFiles);

    ShowFiles.$inject = ['$http', 'ApiGarantias', '$window', '$resource'];

    function ShowFiles($http, ApiGarantias, $window, $resource) {
        var baseUrl = ApiGarantias.url + 'upload';
        var headers2= getGenericHeader($window);
        var headers3= getGenericHeader($window);
        headers3['Content-Type']=undefined;
        return {
            retrieve: function (name) {
                var params = {
                    name: name
                };
                var config = {
                    headers:headers2,
                    method: 'GET',
                    url: baseUrl + '/retrieve',
                    params: params,
                    responseType: 'arraybuffer'
                };

                return $http(config);
            },
            listOfFiles: $resource(ApiGarantias.url + 'upload/list', {}, {
                get: {
                    data: {file: '@file'},
                    method: 'POST',
                    isArray: true,
                    headers: headers3,
                    transformRequest: function (data) {
                        var formData = new FormData();
                        formData.append("timestamp", data.garid.timestamp);
                        formData.append("machineIdentifier", data.garid.machineIdentifier);
                        formData.append("processIdentifier", data.garid.processIdentifier);
                        formData.append("counter", data.garid.counter);
                        return formData;
                    }
                }
            })

        };

    }


})();




