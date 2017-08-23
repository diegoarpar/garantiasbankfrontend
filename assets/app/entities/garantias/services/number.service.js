/**
 * Created by joag on 9/06/16.
 */
(function () {
        'use strict';
        angular.module("wpc")
            .factory('NumberService', NumberService);

        NumberService.$inject = ['$resource', 'ApiGarantias', '$rootScope', '$window'];

        function NumberService($resource, ApiGarantias, $rootScope, $window) {
         var headers2= getGenericHeader($window);
         var url = ApiGarantias.url + 'getNumber';
            return $resource(url, {}, {
                getNumber: {
                    headers:headers2,
                    method: 'GET',
                    isArray: true
                }
            });
        }

    })();
