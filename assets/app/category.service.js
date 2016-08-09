/**
 * Created by joag on 9/06/16.
 */
(function () {
        'use strict';
        angular.module("wpc")
            .factory('CategoryServices', CategoryServices);

        CategoryServices.$inject = ['$resource', 'ApiApp', '$window'];

        function CategoryServices($resource, ApiApp, $window) {
            return $resource(ApiApp.url + 'getAllDigitalizacion', {}, {
                show: {
                    method: 'GET',
                    isArray: true,
                    headers: {'Authorization': 'Bearer ' + $window.localStorage.getItem('token')},
                    transformResponse: function (res, headers) {
                        //var data = angular.fromJson(res).data;
                        var data = angular.fromJson(res);
                        //var list = data.items;

                        //headers()['token'] = data.token;
                        //headers()['token'] = data.page;
                        //$rootScope['jwtToken'] = data.token;
                        //$rootScope.token = data.token;
                        //$scope.$apply();
                        return data;
                    }
                },
                update: {method: 'PUT', params: {id: '@id'}},
                delete: {method: 'DELETE', params: {id: '@id'}}
            })
        }

    })();
