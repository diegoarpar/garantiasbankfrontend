(function () {
        'use strict';
        angular.module("wpc")
            .factory('CamposEspecificosServices', CamposEspecificosServices);

        CamposEspecificosServices.$inject = ['$resource', 'ApiGarantias', '$window', '$route'];

        function CamposEspecificosServices($resource, ApiGarantias, $window, $route) {
            var headers2= getGenericHeader($window);
            var url = ApiGarantias.url + 'config/garantias-field';

            return $resource(ApiGarantias.url + 'config/garantias-field', {}, {
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
                update: {
                    method: 'PUT',
                    data: '@data',
                    headers: {'Authorization': 'Bearer ' + $window.localStorage.getItem('token')}
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

