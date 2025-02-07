/**
 * Created by joag on 9/06/16.
 */
(function () {
        'use strict';
        angular.module("wpc")
            .factory('VentanillaServices', VentanillaServices);

        VentanillaServices.$inject = ['$resource', 'ApiGarantias', '$rootScope', '$window'];

        function VentanillaServices($resource, ApiGarantias, $rootScope, $window, $scope) {
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
                },
                /*-----------METADATA---- */

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
                /*-----------REPORTS---- */

                showReportPost: {
                      url:ApiGarantias.url+'report/retrive',
                      headers: headers2,
                      method: 'POST',
                      params: {'@param': '@param'},
                      isArray: true
                  },
                retriveReport: {
                      url:ApiGarantias.url+'report/retrivereport',
                      headers: headers2,
                      method: 'POST',
                      params: {'@param': '@param'},
                      isArray: true
                  },
                showGeneratedReportPost: {
                      url:ApiGarantias.url+'report/retriveReports',
                      headers: headers2,
                      method: 'POST',
                      params: {'@param': '@param'},
                      isArray: true
                  },showGeneratedReportPostNotGenerated: {
                      url:ApiGarantias.url+'report/retriveReportsNotGenerated',
                      headers: headers2,
                      method: 'POST',
                      params: {'@param': '@param'},
                      isArray: true
                  },
                removeReportPost: {
                      url:ApiGarantias.url+'report/removePost',
                      headers: headers2,
                      method: 'POST',
                      params: {'@param': '@param'},
                      isArray: false
                  },
                showReport: {
                    url:ApiGarantias.url+'report',
                    headers: headers2,
                    method: 'GET',
                    params: {'@param': '@param'},
                    isArray: true
                },createReport: {
                    url:ApiGarantias.url+'report',
                    method: 'POST',
                    headers: headers2,
                    params: {'@param': '@param'},
                    isArray: false,
                    data: '@data'
                },createBatcherReport: {
                     url:ApiGarantias.url+'report/sendBatcherReport',
                     method: 'POST',
                     headers: headers2,
                     params: {'@param': '@param'},
                     isArray: false,
                     data: '@data'
                 },saveChangesReport: {
                    url:ApiGarantias.url+'report/savechanges',
                    method: 'POST',
                    headers: headers2,
                    params: {'@param': '@param'},
                    isArray: false,
                    data: '@data'
                },
                /*-----------MENU---- */
                showMenu: {
                    url:getUrlServices(ApiGarantias,'menu'),
                    headers: headers2,
                    method: 'GET',
                    isArray: true
                },createMenu: {
                    url:getUrlServices(ApiGarantias,'menu'),
                    method: 'POST',
                    headers: headers2,
                    params: {'@param': '@param'},
                    isArray: false,
                    data: '@data'
                },/*-----------PARAMETRIC-VALUES---- */
                showParametric: {
                    url:getUrlServices(ApiGarantias,'parametric'),
                    headers: headers2,
                    method: 'GET',
                    isArray: true
                },createParametric: {
                    url:getUrlServices(ApiGarantias,'parametric'),
                    method: 'POST',
                    headers: headers2,
                    params: {'@param': '@param'},
                    isArray: false,
                    data: '@data'
                },removeParametric: {
                     url:getUrlServices(ApiGarantias,'parametric')+"/delete",
                     params: {id: '@id'},
                     method: 'DELETE',
                     isArray: false,
                     headers: headers2
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
                },/*-----------PARAMETRIC SEARCH -VALUES---- */
                 showParametricSearch: {
                     url:getUrlServices(ApiGarantias,'parametricSearch'),
                     headers: headers2,
                     method: 'GET',
                     isArray: true
                 },showParametricSearchPost: {
                   url:getUrlServices(ApiGarantias,'parametricSearch')+"/post",
                   headers: headers2,
                   method: 'POST',
                   isArray: true
                 },createParametricSearch: {
                     url:getUrlServices(ApiGarantias,'parametricSearch'),
                     method: 'POST',
                     headers: headers2,
                     params: {'@param': '@param'},
                     isArray: false,
                     data: '@data'
                 },removeParametricSearch: {
                      url:getUrlServices(ApiGarantias,'parametricSearch')+"/delete",
                      params: {id: '@id'},
                      method: 'DELETE',
                      isArray: false,
                      headers: headers2
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
