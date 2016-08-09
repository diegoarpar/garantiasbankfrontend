/**
 * Created by joag on 9/06/16.
 */
(function () {
        'use strict';
        angular.module("wpc")
            .factory('NumberService', NumberService);

        NumberService.$inject = ['$resource', 'ApiGarantias', '$rootScope', '$window'];

        function NumberService($resource, ApiGarantias, $rootScope, $window) {
            return $resource(ApiGarantias.url + 'getNumber', {}, {
                getNumber: {
                    method: 'GET',
                    isArray: true,
                    headers: {'Authorization': 'Bearer ' + $window.localStorage.getItem('token')}
                }
            });
        }

    })();
