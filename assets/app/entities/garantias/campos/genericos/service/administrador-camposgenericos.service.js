(function(){
        'use strict';
        angular.module("wpc")
            .factory('CamposGenericosServices', CamposGenericosServices);

        CamposGenericosServices.$inject =  ['$resource','ApiGarantias','$window','$route'];

        function CamposGenericosServices($resource,ApiGarantias,$window,$route) {
            return $resource(ApiGarantias.url+'config/garantias-field', {}, {
                create: { method: 'POST', isArray:false, data:'@data', headers:{'Authorization':'Bearer '+$window.localStorage.getItem('token')},
                transformResponse: function(res, headers) {
                    //var data = angular.fromJson(res);
                    return res;
                }
                },
                show: { method: 'GET', isArray:true,data:'@data', headers:{'Authorization':'Bearer '+$window.localStorage.getItem('token')} },
            })
        }

    }
)();

(function(){
        'use strict';
        angular.module("wpc")
            .factory('CamposGenericosRemoveServices', CamposGenericosRemoveServices);

        CamposGenericosRemoveServices.$inject =  ['$resource','ApiGarantias','$window','$route'];

        function CamposGenericosRemoveServices($resource,ApiGarantias,$window,$route) {
            return $resource(ApiGarantias.url+'config/garantias-field/{id}', {}, {
                remove: { method: 'DELETE',isArray:false, params:{id:'@id'}, headers:{'Authorization':'Bearer '+$window.localStorage.getItem('token')} }
            })
        }

    }
)();
