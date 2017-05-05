/**
 * Created by joag on 9/06/16.
 */
(function () {
        'use strict';
        angular.module("wpc")
            .factory('CMSController', CMSController);

        CMSController.$inject = ['$resource', 'ApiFiles', '$rootScope', '$window'];

        function CMSController($resource, ApiFiles, $rootScope, $window, $scope) {
        var headers2= {'Authorization': 'Bearer ' + $window.localStorage.getItem('token')+","+window.sessionStorage.getItem("tenant")};
         var url = ApiFiles.url + 'FileServices';
            return $resource(url, {}, {
                create: {
                    method: 'POST',
                    headers: headers2,
                    params: {'@param': '@param'},
                    isArray: true
                },

                findFile: {
                    url:ApiFiles.url+"FileServices",
                    headers: headers2,
                    method: 'GET',
                    isArray: false,
                    params: {'@param': '@param'},
                },
                showPost: {
                    url:ApiFiles.url+'retrive',
                    headers: headers2,
                    method: 'POST',
                    isArray: true,
                    params: {'@param': '@param'}
                },
                showtrd: {
                    url:ApiFiles.url+'trd',
                    headers: headers2,
                    method: 'GET',
                    isArray: true
                },
                 showtrdpost: {
                     url:ApiFiles.url+'trd/retrive',
                     headers: headers2,
                     method: 'POST',
                     params: {'@param': '@param'},
                     isArray: true
                 },createtrd: {
                      url:ApiFiles.url+'trd',
                      method: 'POST',
                      headers: headers2,
                      params: {'@param': '@param'},
                      isArray: false,
                      data: '@data'
                  },
                showregional: {
                    url:ApiFiles.url+'regional',
                    headers: headers2,
                    method: 'GET',
                    params: {'@param': '@param'},
                    isArray: true
                },createRegional: {
                    url:ApiFiles.url+'regional',
                    method: 'POST',
                    headers: headers2,
                    params: {'@param': '@param'},
                    isArray: false,
                    data: '@data'
                },showMetadataPost: {
                      url:ApiFiles.url+'metadata/retrive',
                      headers: headers2,
                      method: 'POST',
                      params: {'@param': '@param'},
                      isArray: true
                  },
                showMetadata: {
                    url:ApiFiles.url+'metadata',
                    headers: headers2,
                    method: 'GET',
                    params: {'@param': '@param'},
                    isArray: true
                },createMetadata: {
                    url:ApiFiles.url+'metadata',
                    method: 'POST',
                    headers: headers2,
                    params: {'@param': '@param'},
                    isArray: false,
                    data: '@data'
                },saveChangesMetadata: {
                    url:ApiFiles.url+'metadata/savechanges',
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
