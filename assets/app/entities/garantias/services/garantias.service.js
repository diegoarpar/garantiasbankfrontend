/**
 * Created by joag on 9/06/16.
 */
(function () {
        'use strict';
        angular.module("wpc")
            .factory('GarantiasServices', GarantiasServices);

        GarantiasServices.$inject = ['$resource', 'ApiGarantias','ApiBatch', '$rootScope', '$window'];

        function GarantiasServices($resource, ApiGarantias,ApiBatch, $rootScope, $window, $scope) {
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
                },/*-----------BODEGA---- */
                  showbodega: {
                      url:ApiGarantias.url+'bodega/retrieve',
                      headers: headers2,
                      method: 'POST',
                      params: {'@param': '@param'},
                      isArray: true
                  },createbodega: {
                      url:ApiGarantias.url+'bodega',
                      method: 'POST',
                      headers: headers2,
                      params: {'@param': '@param'},
                      isArray: false,
                      data: '@data'
                  },createbodegacontainer: {
                      url:ApiGarantias.url+'bodega/insertContainer',
                      method: 'POST',
                      headers: headers2,
                      params: {'@param': '@param'},
                      isArray: false,
                      data: '@data'
                  },retrivebodegacontainer: {
                      url:ApiGarantias.url+'bodega/retrieveContainer',
                      method: 'POST',
                      headers: headers2,
                      params: {'@param': '@param'},
                      isArray: true,
                      data: '@data'
                  },createbodegacontainerubication: {
                      url:ApiGarantias.url+'bodega/insertContainerUbication',
                      method: 'POST',
                      headers: headers2,
                      params: {'@param': '@param'},
                      isArray: false,
                      data: '@data'
                  },updatebodegacontainerubication: {
                     url:ApiGarantias.url+'bodega/updateContainerUbication',
                     method: 'POST',
                     headers: headers2,
                     params: {'@param': '@param'},
                     isArray: false,
                     data: '@data'
                 },retrivebodegacontainerubication: {
                      url:ApiGarantias.url+'bodega/retrieveContainerUbication',
                      method: 'POST',
                      headers: headers2,
                      params: {'@param': '@param'},
                      isArray: true,
                      data: '@data'
                  },createbodegacontainerprestamo: {
                      url:ApiGarantias.url+'bodega/insertContainerPrestamo',
                      method: 'POST',
                      headers: headers2,
                      params: {'@param': '@param'},
                      isArray: false,
                      data: '@data'
                  },retrivebodegacontainerprestamo: {
                      url:ApiGarantias.url+'bodega/retrieveContainerPrestamo',
                      method: 'POST',
                      headers: headers2,
                      params: {'@param': '@param'},
                      isArray: true,
                      data: '@data'
                  },/*-----------PRESTAMOS---- */
                  showprestamo: {
                      url:ApiGarantias.url+'prestamo/retrieve',
                      headers: headers2,
                      method: 'POST',
                      params: {'@param': '@param'},
                      isArray: true
                  },createprestamo: {
                     url:ApiGarantias.url+'prestamo',
                     method: 'POST',
                     headers: headers2,
                     params: {'@param': '@param'},
                     isArray: false,
                     data: '@data'
                 },updatePrestamo: {
                    url:ApiGarantias.url+'prestamo/updatePrestamo',
                    method: 'POST',
                    headers: headers2,
                    params: {'@param': '@param'},
                    isArray: false,
                    data: '@data'
                 },removeprestamo: {
                   url:ApiGarantias.url+'prestamo/remove',
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
                 /*-----------BATCHRUNNER---- */
                 putRunner: {
                     url:ApiBatch.url+'batcherservices/setjob',
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
                },showParametricpost: {
                      url:getUrlServices(ApiGarantias,'parametric')+"/retrievepost",
                      headers: headers2,
                      method: 'POST',
                      data:'@data',
                      isArray: true
                  },createParametric: {
                    url:getUrlServices(ApiGarantias,'parametric'),
                    method: 'POST',
                    headers: headers2,
                    params: {'@param': '@param'},
                    isArray: false,
                    data: '@data'
                },removeParametricPost: {
                   url:getUrlServices(ApiGarantias,'parametric')+"/eliminarpost",
                   data: '@data',
                   method: 'POST',
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





(function () {
        'use strict';
        angular.module("wpc")
            .factory('UserLoginService',UserLoginService);
        UserLoginService.$inject=['AuthenticationFactory','$window'];
        function UserLoginService(AuthenticationFactory,$window){
            var _user="";
            var _email="";

            if($window.localStorage.getItem('token')){
               var logIn=AuthenticationFactory.userByToken({token:$window.localStorage.getItem('token')});
                logIn.$promise.then(
                    function (data){
                    if(!!data&&!!data[0]){
                        setUser(data[0].user);
                        setEmail(data[0].email);

                    }
                   }
                );
            }

            function setUser(user){
                _user=user;
            }
            function setEmail(email){
                _email=email;
            }
            function getUser(){
                if($window.localStorage.getItem('token')&&(_user==null||_user==undefined)){
                   var logIn=AuthenticationFactory.userByToken({token:$window.localStorage.getItem('token')});
                    logIn.$promise.then(
                        function (data){
                        if(!!data&&!!data[0]){
                            _user=data[0].user;
                            _email=data[0].email;
                            return _user;
                        }
                       }
                    );
                }

                return _user;
            }
            function getEmail(){
                if($window.localStorage.getItem('token')&&(_user==null||_user==undefined)){
                   var logIn=AuthenticationFactory.userByToken({token:$window.localStorage.getItem('token')});
                    logIn.$promise.then(
                        function (data){
                        if(!!data&&!!data[0]){
                            _email=data[0].email;

                            return _email;
                        }
                       }
                    );
                }

                return _email;
            }
            return {
                getUser:getUser,
                setUser:setUser,
                getEmail:getEmail
            }
            }

    })();

