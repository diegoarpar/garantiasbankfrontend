/**
 * Created by joag on 9/06/16.
 */
(function(){
        'use strict';
        angular.module("wpc")
            .factory('AuthenticationFactory', AuthenticationFactory);

        AuthenticationFactory.$inject =  ['$resource','ApiAuth','$window','$route'];

        function AuthenticationFactory($resource,ApiAuth,$window,$route) {
            return $resource(ApiAuth.url+'getToken', {}, {
                show: { method: 'GET', isArray:false,params: {user: '@user',password:'@pass' }},
                update: { method: 'PUT', params: {id: '@id'} },
                delete: { method: 'DELETE', params: {id: '@id'} }
            })
        }

    }
)();
