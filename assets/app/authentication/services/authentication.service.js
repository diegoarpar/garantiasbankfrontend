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
                /********** users*/
                show: {
                    method: 'GET',
                    headers:headers2,
                    isArray: false,
                    url : ApiAuth.url+'users',
                    params: {'@param': '@param'},
                    },
                showAll: {
                    headers:headers2,
                    url:ApiAuth.url+"users/getAll",
                    method: 'GET',
                    isArray: true
                },
                logIn: {
                    method: 'GET',
                    headers:headers2,
                    isArray: false,
                    url : ApiAuth.url+'users/logIn',
                    params: {'@param': '@param'},
                },
                createUser: {
                    url : ApiAuth.url+'users',
                    method: 'POST',
                    headers:headers2,
                    params: {'@param': '@param'},
                    isArray: false
                },
                update: {
                    method: 'PUT',
                     params: {id: '@id'}
                     },
                userByToken: {
                   url:ApiAuth.url+'users/getByToken',
                   headers:headers2,
                   method: 'GET',
                   isArray: true
                   },
                delete: {
                   method: 'DELETE',
                   params: {id: '@id'}
                },
                /*************roles**************/
                showRoles: {
                    url : ApiAuth.url+'roles/outToken',
                    method: 'GET',
                    headers:headers2,
                    params: {'@param': '@param'},
                    isArray: true
                },

                createRoles: {
                    url : ApiAuth.url+'roles',
                    method: 'POST',
                    headers:headers2,
                    params: {'@param': '@param'},
                    isArray: false
                },

                /*******tenant*/
                tenant: {
                    url:ApiAuth.url+'tenant',
                    method: 'GET',
                    isArray: true
                    }

            })
        }

    })();
