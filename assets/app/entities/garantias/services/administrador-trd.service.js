/**
 * Created by joag on 9/06/16.
 */
(function () {
        'use strict';
        angular.module("wpc")
            .factory('TRDServices', TRDServices);

        TRDServices.$inject = ['$resource', 'ApiGarantias', '$window', '$route'];

        function TRDServices($resource, ApiGarantias, $window, $route) {
            var headers2= getGenericHeader($window);
            var url = ApiGarantias.url + 'config/garantias-parametricvalues';
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
                    params:{tenant:window.sessionStorage.getItem("tenant")},
                    headers: headers2
                },
                update: {
                    method: 'PUT',
                    data: '@data',
                    headers: headers2
                },
                remove: {
                    url:url+"/delete",
                    params: {id: '@id'},
                    method: 'DELETE',
                    isArray: false,
                    headers: headers2
                }
            })
        }

    })();
