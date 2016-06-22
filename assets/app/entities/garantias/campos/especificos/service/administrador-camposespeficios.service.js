(function(){
        'use strict';
        angular.module("wpc")
            .factory('CamposEspecificosServices', CamposEspecificosServices);

        CamposEspecificosServices.$inject =  ['$resource','ApiGarantias','$window','$route'];

        function CamposEspecificosServices($resource,ApiGarantias,$window,$route) {
            return $resource(ApiGarantias.url+'config/garantias-field', {}, {
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
            .factory('CamposEspecificosRemoveServices', CamposEspecificosRemoveServices);

        CamposEspecificosRemoveServices.$inject =  ['$resource','ApiGarantias','$window','$route'];

        function CamposEspecificosRemoveServices($resource,ApiGarantias,$window,$route) {
            return $resource(ApiGarantias.url+'config/garantias-field/{id}', {}, {
                remove: { method: 'DELETE',isArray:false, params:{id:'@id'}, headers:{'Authorization':'Bearer '+$window.localStorage.getItem('token')} }
            })
        }

    }
)();