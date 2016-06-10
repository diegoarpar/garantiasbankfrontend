/**
 * Created by joag on 9/06/16.
 */
(function(){
        'use strict';
        angular.module("wpc")
            .factory('UsersFactory', UsersFactory);

        UsersFactory.$inject =  ['$resource'];

        function UsersFactory($resource) {
            return $resource('/ngdemo/web/users', {}, {
                query: { method: 'GET', isArray: true },
                create: { method: 'POST' },
                show: { method: 'GET' },
                update: { method: 'PUT', params: {id: '@id'} },
                delete: { method: 'DELETE', params: {id: '@id'} }
            })
        }

    }
)();
