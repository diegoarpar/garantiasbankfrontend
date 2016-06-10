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
                show: { method: 'GET', isArray:false,params: {user: '@user',password:'@pass' },
                    transformResponse: function(res, headers) {
                        //var data = angular.fromJson(res).data;
                        var data = angular.fromJson(res);
                        //var list = data.items;

                        //headers()['token'] = data.token;
                        //headers()['token'] = data.page;
                        //$rootScope['jwtToken'] = data.token;
                        //$rootScope.token = data.token;

                        $window.localStorage.setItem('token',data.token);
                        $route.reload();
                        $window.location.reload();
                        //$scope.$apply();
                        return data;
                    }
                },
                update: { method: 'PUT', params: {id: '@id'} },
                delete: { method: 'DELETE', params: {id: '@id'} }
            })
        }

    }
)();
