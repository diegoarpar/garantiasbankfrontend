/**
 * Created by joag on 9/06/16.
 */
(function(){
        'use strict';
        angular.module("wpc")
            .factory('ProductServices', ProductServices);

        ProductServices.$inject =  ['$resource','ApiApp','$window'];

        function ProductServices($resource,ApiApp,$window) {
            return $resource(ApiApp.url+'getAllProduct', {}, {
                show: { method: 'GET', isArray:true, headers:{'Authorization':'Bearer '+$window.localStorage.getItem('token')} },
                update: { method: 'PUT', params: {id: '@id'} },
                delete: { method: 'DELETE', params: {id: '@id'} }
            })
        }

    }
)();
