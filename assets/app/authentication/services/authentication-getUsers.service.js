/**
 * Created by joag on 9/06/16.
 */
(function () {
        'use strict';
        angular.module("wpc")
            .factory('AuthenticationGetUserServices', AuthenticationGetUserServices);

        AuthenticationGetUserServices.$inject = ['$resource', 'ApiAuth', '$window', '$route'];

        function AuthenticationGetUserServices($resource, ApiAuth, $window, $route) {
        var headers2= {'Authorization': 'Bearer ' + $window.localStorage.getItem('token')+","+window.sessionStorage.getItem("tenant")};
            var url = ApiAuth.url + 'users';
            return $resource(ApiAuth.url + 'getUsers', {}, {
                create: {method: 'POST', isArray: false, data: '@data'},
                shows: {
                    method: 'GET',
                    isArray: true
                },
                showAll: {
                    headers:headers2,
                    url:url+"/getAll",
                    method: 'GET',
                    isArray: true
                },
                update: {method: 'PUT', params: {id: '@id'}},
                delete: {method: 'DELETE', params: {id: '@id'}}
            })
        }

    })();
