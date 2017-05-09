/**
 * Created by joag on 9/06/16.
 */
(function () {
        'use strict';
        angular.module("wpc")
            .factory('GarantiasServices', GarantiasServices);

        GarantiasServices.$inject = ['$resource', 'ApiGarantias', '$rootScope', '$window'];

        function GarantiasServices($resource, ApiGarantias, $rootScope, $window, $scope) {
        var headers2= getGenericHeader($window);
        var url = ApiGarantias.url + 'insertGarantias';
            return $resource(url, {}, {
                create: {
                    method: 'POST',
                    headers: headers2,
                    params: {'@param': '@param'},
                    isArray: true
                },

                show: {
                    headers: headers2,
                    method: 'GET',
                    isArray: true,
                    params: {processName: '@processName', dateStart: '@dateEnd', dateEnd: '@dateEnd'},
                },
                showPost: {
                    url:ApiGarantias.url+'retrive',
                    headers: headers2,
                    method: 'POST',
                    isArray: true,
                    params: {'@param': '@param'}
                },
                /*-----------TRD---- */
                showtrd: {
                    url:ApiGarantias.url+'trd',
                    headers: headers2,
                    method: 'GET',
                    isArray: true
                },
                 showtrdpost: {
                     url:ApiGarantias.url+'trd/retrive',
                     headers: headers2,
                     method: 'POST',
                     params: {'@param': '@param'},
                     isArray: true
                 },createtrd: {
                      url:ApiGarantias.url+'trd',
                      method: 'POST',
                      headers: headers2,
                      params: {'@param': '@param'},
                      isArray: false,
                      data: '@data'
                  },/*-----------REGIONAL---- */
                showregional: {
                    url:ApiGarantias.url+'regional',
                    headers: headers2,
                    method: 'GET',
                    params: {'@param': '@param'},
                    isArray: true
                },createRegional: {
                    url:ApiGarantias.url+'regional',
                    method: 'POST',
                    headers: headers2,
                    params: {'@param': '@param'},
                    isArray: false,
                    data: '@data'
                },/*-----------METADATA---- */

                showMetadataPost: {
                      url:ApiGarantias.url+'metadata/retrive',
                      headers: headers2,
                      method: 'POST',
                      params: {'@param': '@param'},
                      isArray: true
                  },
                showMetadata: {
                    url:ApiGarantias.url+'metadata',
                    headers: headers2,
                    method: 'GET',
                    params: {'@param': '@param'},
                    isArray: true
                },createMetadata: {
                    url:ApiGarantias.url+'metadata',
                    method: 'POST',
                    headers: headers2,
                    params: {'@param': '@param'},
                    isArray: false,
                    data: '@data'
                },saveChangesMetadata: {
                    url:ApiGarantias.url+'metadata/savechanges',
                    method: 'POST',
                    headers: headers2,
                    params: {'@param': '@param'},
                    isArray: false,
                    data: '@data'
                },
                /*-----------MENU---- */
                showmenu: {
                    url:getUrlServices(ApiGarantias,'menu'),
                    headers: headers2,
                    method: 'GET',
                    isArray: true
                },createmenu: {
                    url:getUrlServices(ApiGarantias,'menu'),
                    method: 'POST',
                    headers: headers2,
                    params: {'@param': '@param'},
                    isArray: false,
                    data: '@data'
                },
                update: {
                    headers: headers2,
                    method: 'PUT',
                    isArray: false,
                    params: {},
                    transformResponse: function (res, headers) {
                        //var data = angular.fromJson(res);
                        return res;
                    }
                },
                delete: {method: 'DELETE', params: {id: '@id'}}
            })
        }

    })();
