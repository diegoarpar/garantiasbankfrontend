/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function() {
    'use strict'
    angular.module('wpc')
        .factory('DynamicSearch', DynamicSearch);

    DynamicSearch.$inject = ['$resource', 'ApiGarantias', '$window'];

    function DynamicSearch($resource, ApiGarantias, $window) {
        console.log('/api/batch/:id');
        var resource = $resource(ApiGarantias.url + 'search/getMetadata',{}, {
            show: {
                method: 'GET',
                isArray: true,
                headers: {'Authorization': 'Bearer ' + $window.localStorage.getItem('token')}
            }
        });
	    return resource;
    }
})();




