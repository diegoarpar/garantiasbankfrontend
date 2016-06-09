var services = angular.module('wpc.services', ['ngResource']);

services.factory('UsersFactory', function ($resource) {
    return $resource('/ngdemo/web/users', {}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    })
});

services.factory('UserFactory', function ($resource) {
    return $resource('/ngdemo/web/users/:id', {}, {
        show: { method: 'GET' },
        update: { method: 'PUT', params: {id: '@id'} },
        delete: { method: 'DELETE', params: {id: '@id'} }
    })
});

services.factory('ProductServices',['$resource','ApiApp','$rootScope','$window', function ($resource,ApiApp,$rootScope,$window) {
    return $resource(ApiApp.url+'getAllProduct', {}, {
        show: { method: 'GET', isArray:true, headers:{'Authorization':'Bearer '+$window.localStorage.getItem('token')} },
        update: { method: 'PUT', params: {id: '@id'} },
        delete: { method: 'DELETE', params: {id: '@id'} }
    })
}]);
services.factory('CategoryServices',['$resource','ApiApp','$rootScope','$window', function ($resource,ApiApp,$rootScope,$window) {
    return $resource(ApiApp.url+'getAllDigitalizacion', {}, {
        show: { method: 'GET', isArray:true, headers:{'Authorization':'Bearer '+$window.localStorage.getItem('token')},
        transformResponse: function(res, headers) {
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
        update: { method: 'PUT', params: {id: '@id'} },
        delete: { method: 'DELETE', params: {id: '@id'} }
    })
}]);

services.factory('CategoryServices',['$resource','ApiApp','$rootScope','$window', function ($resource,ApiApp,$rootScope,$window) {
    return $resource(ApiApp.url+'getAllDigitalizacion', {}, {
        show: { method: 'GET', isArray:true, headers:{'Authorization':'Bearer '+$window.localStorage.getItem('token')},
        transformResponse: function(res, headers) {
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
        update: { method: 'PUT', params: {id: '@id'} },
        delete: { method: 'DELETE', params: {id: '@id'} }
    })
}]);

services.factory('ReportServicesTelefonica',['$resource','ApiApp','$rootScope','$window', function ($resource,ApiApp,$rootScope,$window) {
    return $resource(ApiApp.url+'getAllDigitalizacionByProcessAndDate', {}, {
        show: { method: 'GET', isArray:true, params: {processName: '@processName',dateStart:'@dateEnd',dateEnd:'@dateEnd'}, headers:{'Authorization':'Bearer '+$window.localStorage.getItem('token')},
        transformResponse: function(res, headers) {
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
        update: { method: 'PUT', params: {id: '@id'} },
        delete: { method: 'DELETE', params: {id: '@id'} }
    })
}]);
services.factory('AutenticationFactory', ['$resource','ApiAuth','$rootScope','$window','$route',function ($resource,ApiAuth,$rootScope,$window,$route) {
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
}]);

services.factory('GarantiasServices',['$resource','ApiGarantias','$rootScope','$window', function ($resource,ApiGarantias,$rootScope,$window,$scope) {
    return $resource(ApiGarantias.url+'insertGarantias', {}, {
        show: { method: 'GET', isArray:true, params: {processName: '@processName',dateStart:'@dateEnd',dateEnd:'@dateEnd'}, headers:{'Authorization':'Bearer '+$window.localStorage.getItem('token')},
        transformResponse: function(res, headers) {
                            var data = angular.fromJson(res);
                            return data;
                        }
            },
        
        create: { method: 'POST',isArray:true, params: {}, headers:{'Authorization':'Bearer '+$window.localStorage.getItem('token')},data:'@data' },
        delete: { method: 'DELETE', params: {id: '@id'} }
    })
}]);

services.factory('GarantiasService',['$resource','ApiGarantias','$rootScope','$window', function ($resource,ApiGarantias,$rootScope,$window) {
    return $resource(ApiGarantias.url+'getNumber', {}, {
        getNumber: {method:'GET', isArray:true, headers:{'Authorization':'Bearer '+$window.localStorage.getItem('token')}}
    });
}]);

services.factory('GarantiasServiceGetGarantias',['$resource','ApiGarantias','$rootScope','$window', function ($resource,ApiGarantias,$rootScope,$window) {
    return $resource(ApiGarantias.url+'getGarantias', {}, {
        show: {method:'GET', isArray:true, params:{'@param':'@param'},headers:{'Authorization':'Bearer '+$window.localStorage.getItem('token')}}
    });
}]);

services.factory('GarantiasServiceUpdateGarantias',['$resource','ApiGarantias','$rootScope','$window', function ($resource,ApiGarantias,$rootScope,$window) {
    return $resource(ApiGarantias.url+'updateGarantias', {}, {
       create: { method: 'POST',isArray:true, params: {}, headers:{'Authorization':'Bearer '+$window.localStorage.getItem('token')},data:'@data' }
    });
}]);