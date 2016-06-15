/**
 * Created by joag on 9/06/16.
 */
(function(){
        'use strict';
        angular.module("wpc")
            .factory('CamposGenericosServices', AuthenticationGetUserServices);

        AuthenticationGetUserServices.$inject =  ['$resource','ApiAuth','$window','$route'];

        function AuthenticationGetUserServices($resource,ApiAuth,$window,$route) {
            return $resource(ApiAuth.url+'getUsers', {}, {
                create: { method: 'POST', isArray:false, data:'@data'},
                show: { method: 'GET', isArray:true },
                update: { method: 'PUT', params: {id: '@id'} },
                delete: { method: 'DELETE', params: {id: '@id'} }
            })
        }

    }
)();
