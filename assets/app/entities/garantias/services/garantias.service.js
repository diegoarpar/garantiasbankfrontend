/**
 * Created by joag on 9/06/16.
 */
(function () {
        'use strict';
        angular.module("wpc")
            .factory('GarantiasServices', GarantiasServices);

        GarantiasServices.$inject = ['$resource', 'ApiGarantias', '$rootScope', '$window'];

        function GarantiasServices($resource, ApiGarantias, $rootScope, $window, $scope) {
        var headers2= {'Authorization': 'Bearer ' + $window.localStorage.getItem('token')+","+window.sessionStorage.getItem("tenant")};
         var url = ApiGarantias.url + 'insertGarantias';
            return $resource(url, {}, {
                create: {
                    method: 'POST',
                    headers: headers2,
                    params: {'@param': '@param'},
                    isArray: true
                },
                createtrd: {
                        url:ApiGarantias.url+'trd',
                        method: 'POST',
                        headers: headers2,
                        params: {'@param': '@param'},
                        isArray: false,
                        data: '@data'
                    },
                showtrd: {
                        url:ApiGarantias.url+'trd',
                        method: 'GET',
                        headers: headers2,
                        params: {'@param': '@param'},
                        isArray: true
                    },
                show: {
                    headers: headers2,
                    method: 'GET',
                    isArray: true,
                    params: {processName: '@processName', dateStart: '@dateEnd', dateEnd: '@dateEnd'},
                },
                showtrd: {
                    url:ApiGarantias.url+'trd',
                    headers: headers2,
                    method: 'GET',
                    isArray: true
                },
                update: {
                    headers: headers2,
                    method: 'PUT',
                    isArray: false,
                    params: {},
                    transformResponse: function (res, headers) {
                        //var data = angular.fromJson(res);
                        return res;
                    }
                },
                delete: {method: 'DELETE', params: {id: '@id'}}
            })
        }

    })();
