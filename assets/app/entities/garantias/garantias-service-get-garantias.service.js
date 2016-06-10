/**
 * Created by joag on 9/06/16.
 */
(function(){
        'use strict';
        angular.module("wpc")
            .factory('GarantiasServiceGetGarantias', GarantiasServiceGetGarantias);

        GarantiasServiceGetGarantias.$inject =  ['$resource','ApiGarantias','$rootScope','$window'];

        function GarantiasServiceGetGarantias($resource,ApiGarantias,$rootScope,$window) {
            return $resource(ApiGarantias.url+'getGarantias', {}, {
                show: {method:'GET', isArray:true, params:{'@param':'@param'},headers:{'Authorization':'Bearer '+$window.localStorage.getItem('token')}}
            });
        }

    }
)();
