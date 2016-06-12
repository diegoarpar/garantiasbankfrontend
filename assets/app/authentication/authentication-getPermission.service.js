/**
 * Created by joag on 9/06/16.
 */
(function(){
        'use strict';
        angular.module("wpc")
            .factory('AuthenticationGetPermissionServices', AuthenticationGetPermissionServices);

        AuthenticationGetPermissionServices.$inject =  ['$resource','ApiAuth','$window','$route'];

        function AuthenticationGetPermissionServices($resource,ApiAuth,$window,$route) {
            return $resource(ApiAuth.url+'getPermissionByUser', {}, {
                create: { method: 'POST', isArray:true,data:'@data' },
                show: { method: 'GET', isArray:true,params:{user:'@user'} },
                update: { method: 'PUT', params: {id: '@id'} },
                delete: { method: 'DELETE', params: {id: '@id'} }
            })
        }

    }
)();
