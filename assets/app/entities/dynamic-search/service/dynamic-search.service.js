/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function () {
    'use strict'
    angular.module('wpc')
        .factory('DynamicSearch', DynamicSearch);

    DynamicSearch.$inject = ['$http', 'ApiGarantias', '$window'];

    function DynamicSearch($http, ApiGarantias, $window) {
        var baseUrl = ApiGarantias.url + 'search';
        var headers2= getGenericHeader($window);
        return {
            getMetaData: function (id, date) {
                var config = {
                    method: 'GET',
                    url: baseUrl + '/getMetadata',
                    isArray: true,
                    headers: headers2
                };

                return $http(config);
            },
            searchWithMetadata: function (metadata) {
                var url = baseUrl + '/searchWithMetadata';
                var config = {
                    isArray: true,
                    headers: headers2
                };
                return $http.post(url, metadata, config);

            },


        };

    }


})();




