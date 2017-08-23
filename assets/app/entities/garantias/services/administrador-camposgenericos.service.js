(function () {
        'use strict';
        angular.module("wpc")
            .factory('CamposGenericosServices', CamposGenericosServices);

        CamposGenericosServices.$inject = ['$resource', 'ApiGarantias', '$window', '$route'];

        function CamposGenericosServices($resource, ApiGarantias, $window, $route) {
         var headers2= getGenericHeader($window);
         var url = ApiGarantias.url + 'config/garantias-field';
            return $resource(url, {}, {
                create: {
                    method: 'POST',
                    isArray: false,
                    data: '@data',
                    headers: headers2,
                    transformResponse: function (res, headers) {
                        //var data = angular.fromJson(res);
                        return res;
                    }
                },
                show: {
                    method: 'GET',
                    isArray: true,
                    data: '@data',
                    headers: headers2
                },
                 remove: {
                    url:url+'/{id}',
                    method: 'DELETE',
                    isArray: false,
                    params: {id: '@id'},
                    headers: headers2
                }
            })
        }

    })();

