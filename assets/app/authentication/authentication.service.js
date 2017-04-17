/**
 * Created by joag on 9/06/16.
 */
(function () {
        'use strict';
        angular.module("wpc")
            .factory('AuthenticationFactory', AuthenticationFactory);

        AuthenticationFactory.$inject = ['$resource', 'ApiAuth', '$window', '$route'];

        function AuthenticationFactory($resource, ApiAuth, $window, $route) {
        var headers2= {'Authorization': 'Bearer ' + $window.localStorage.getItem('token')+","+window.sessionStorage.getItem("tenant")};
        var url = ApiAuth.url + 'getToken';
            return $resource(url, {}, {
                show: {
                    method: 'GET',
                    headers:headers2,
                    isArray: false,
                    params: {user: '@user', password: '@pass',tenant:window.sessionStorage.getItem("tenant")}
                    },
                update: {
                    method: 'PUT',
                     params: {id: '@id'}
                     },
                tenant: {
                    url:ApiAuth.url+'tenant',
                    method: 'GET',
                    isArray: true
                    },
                userByToken: {
                    url:ApiAuth.url+'token',
                    headers:headers2,
                    method: 'GET',
                    isArray: true
                    },
                delete: {
                    method: 'DELETE',
                    params: {id: '@id'}
                }
            })
        }

    })();
