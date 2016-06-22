/**
 * Created by joag on 9/06/16.
 */
(function(){
        'use strict';
        angular.module("wpc")
            .factory('CamposParametricosServices', CamposParametricosServices);

        CamposParametricosServices.$inject =  ['$resource','ApiGarantias','$window','$route'];

        function CamposParametricosServices($resource,ApiGarantias,$window,$route) {
            return $resource(ApiGarantias.url+'config/garantias-parametricvalues', {}, {
                create: { method: 'POST', isArray:false, data:'@data', headers:{'Authorization':'Bearer '+$window.localStorage.getItem('token')},
                transformResponse: function(res, headers) {
                                            //var data = angular.fromJson(res);
                                            return res;
                                        }
                },
                show: { method: 'GET', isArray:true,data:'@data', headers:{'Authorization':'Bearer '+$window.localStorage.getItem('token')} },
                update: { method: 'PUT',data:'@data', headers:{'Authorization':'Bearer '+$window.localStorage.getItem('token')} },
                remove: { method: 'DELETE',isArray:false, data:'@data', headers:{'Authorization':'Bearer '+$window.localStorage.getItem('token')} }
            })
        }

    }
)();

(function(){
        'use strict';
        angular.module("wpc")
            .factory('CamposParametricosRemoveServices', CamposParametricosRemoveServices);

        CamposParametricosRemoveServices.$inject =  ['$resource','ApiGarantias','$window','$route'];

        function CamposParametricosRemoveServices($resource,ApiGarantias,$window,$route) {
            return $resource(ApiGarantias.url+'config/garantias-parametricvalues/{id}', {}, {
                remove: { method: 'DELETE',isArray:false, params:{id:'@id'}, headers:{'Authorization':'Bearer '+$window.localStorage.getItem('token')} }
            })
        }

    }
)();
