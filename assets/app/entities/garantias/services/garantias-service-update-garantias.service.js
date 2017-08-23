/**
 * Created by joag on 9/06/16.
 */
(function () {
        'use strict';
        angular.module("wpc")
            .factory('GarantiasServiceUpdateGarantias', GarantiasServiceUpdateGarantias);

        GarantiasServiceUpdateGarantias.$inject = ['$resource', 'ApiGarantias', '$rootScope', '$window'];

        function GarantiasServiceUpdateGarantias($resource, ApiGarantias, $rootScope, $window) {
            return $resource(ApiGarantias.url + 'updateGarantias', {}, {
                create: {
                    method: 'POST',
                    isArray: true,
                    params: {},
                    headers: getGenericHeader($window),
                    data: '@data'
                }
            });
        }

    })();
