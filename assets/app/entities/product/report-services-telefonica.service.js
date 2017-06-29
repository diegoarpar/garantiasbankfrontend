/**
 * Created by joag on 9/06/16.
 */
(function () {
        'use strict';
        angular.module("wpc")
            .factory('ReportServicesTelefonica', ReportServicesTelefonica);

        ReportServicesTelefonica.$inject = ['$resource',  '$rootScope', '$window'];

        function ReportServicesTelefonica($resource,  $rootScope, $window) {
            return $resource('getAllDigitalizacionByProcessAndDate', {}, {
                show: {
                    method: 'GET',
                    isArray: true,
                    params: {
                        processName: '@processName',
                        dateStart: '@dateEnd',
                        dateEnd: '@dateEnd'
                    },
                    headers: {'Authorization': 'Bearer ' + $window.localStorage.getItem('token')},
                    transformResponse: function (res, headers) {
                        //var data = angular.fromJson(res).data;
                        var data = angular.fromJson(res);
                        //var list = data.items;

                        //headers()['token'] = data.token;
                        //headers()['token'] = data.page;
                        //$rootScope['jwtToken'] = data.token;
                        //$rootScope.token = data.token;
                        //$scope.$apply();
                        return data;
                    }
                },
                update: {method: 'PUT', params: {id: '@id'}},
                delete: {method: 'DELETE', params: {id: '@id'}}
            })
        }

    })();
