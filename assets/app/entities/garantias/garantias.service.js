/**
 * Created by joag on 9/06/16.
 */
(function(){
        'use strict';
        angular.module("wpc")
            .factory('GarantiasServices', GarantiasServices);

        GarantiasServices.$inject =  ['$resource','ApiGarantias','$rootScope','$window'];

        function GarantiasServices($resource,ApiGarantias,$rootScope,$window,$scope) {
            return $resource(ApiGarantias.url+'insertGarantias', {}, {
                show: { method: 'GET', isArray:true, params: {processName: '@processName',dateStart:'@dateEnd',dateEnd:'@dateEnd'}, headers:{'Authorization':'Bearer '+$window.localStorage.getItem('token')},
                    transformResponse: function(res, headers) {
                        var data = angular.fromJson(res);
                        return data;
                    }
                },

                create: { method: 'POST',isArray:true, params: {}, headers:{'Authorization':'Bearer '+$window.localStorage.getItem('token')},data:'@data' },
                delete: { method: 'DELETE', params: {id: '@id'} }
            })
        }

    }
)();
