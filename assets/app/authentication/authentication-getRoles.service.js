/**
 * Created by joag on 9/06/16.
 */
(function(){
        'use strict';
        angular.module("wpc")
            .factory('AuthenticationGetRolesServices', AuthenticationGetRolesServices);

        AuthenticationGetRolesServices.$inject =  ['$resource','ApiAuth','$window','$route'];

        function AuthenticationGetRolesServices($resource,ApiAuth,$window,$route) {
            return $resource(ApiAuth.url+'getRoles', {}, {
                show: { method: 'GET', isArray:true },
                showByUser: { method: 'GET', isArray:true,params:{user:'@user'} },
                update: { method: 'PUT', params: {id: '@id'} },
                delete: { method: 'DELETE', params: {id: '@id'} }
            })
        }

    }
)();
