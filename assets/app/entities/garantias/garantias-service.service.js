/**
 * Created by joag on 9/06/16.
 */
(function(){
        'use strict';
        angular.module("wpc")
            .factory('GarantiasService', GarantiasService);

        GarantiasService.$inject =  ['$resource','ApiGarantias','$rootScope','$window'];

        function GarantiasService($resource,ApiGarantias,$rootScope,$window) {
            return $resource(ApiGarantias.url+'getNumber', {}, {
                getNumber: {method:'GET', isArray:true, headers:{'Authorization':'Bearer '+$window.localStorage.getItem('token')}}
            });
        }

    }
)();
