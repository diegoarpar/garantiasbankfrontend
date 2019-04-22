/**
 * Created by joag on 9/06/16.
 */

(function () {
        'use strict';
        angular.module("wpc")
            .controller('DocumentosContenedorBodegaController', DocumentosContenedorBodegaController);

        DocumentosContenedorBodegaController.$inject = ['AuthenticationFactory','$scope', 'GarantiasServices',  '$location', '$rootScope', '$window', '$route','NgTableParams','$uibModal','$uibModalInstance'];

        function DocumentosContenedorBodegaController(AuthenticationFactory,$scope, GarantiasServices, $location, $rootScope, $window, $route,NgTableParams,$uibModal,$uibModalInstance) {
            inSession($scope,AuthenticationFactory,$window,false);






            $scope.ok=function(){
                var ubication=$scope.tableParamsContenedor.data;

                for(var i=0;!!ubication&&i<ubication.length;i++){
                    ubication[i].container=$scope.container;
                }

                GarantiasServices.createbodegacontainerubication(ubication);

            }




          $scope.addUbicacion=function(){
            var ubication=!!$scope.tableParamsContenedor&&!!$scope.tableParamsContenedor.data?$scope.tableParamsContenedor.data:[];

            ubication.push({code:"",name:""});
            $scope.tableParamsContenedor = new NgTableParams({}, { dataset: ubication});

          }
          $scope.remove=function(_this){
              var ubication=$scope.tableParamsContenedor.data;
              ubication.splice(_this.$index,1);
              $scope.tableParamsContenedor = new NgTableParams({}, { dataset: ubication});

            }
        }

    })();
