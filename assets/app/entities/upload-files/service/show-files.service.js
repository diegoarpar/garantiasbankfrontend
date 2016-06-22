/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function() {
    'use strict';
    angular.module('wpc')
        .factory('ShowFiles', ShowFiles);

    ShowFiles.$inject = ['$http', 'ApiGarantias', '$window'];

    function ShowFiles($http, ApiGarantias, $window) {
        var baseUrl = ApiGarantias.url + 'upload';
        return {
            retrieve: function (name) {
                var params = {
                    name: name 
                };
                var config = {
                    method: 'GET',
                    url: baseUrl + '/retrieve',
                    params: params,
                    headers: {'Authorization': 'Bearer ' + $window.localStorage.getItem('token')}
                };

                return $http(config);
            } 


        };

    }



})();




