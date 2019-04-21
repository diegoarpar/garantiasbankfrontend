/**
 * Created by joag on 9/06/16.
 */

(function () {
        'use strict';
        angular.module("wpc")
            .controller('ModificarContenedorBodegaController', ModificarContenedorBodegaController);

        ModificarContenedorBodegaController.$inject = ['AuthenticationFactory','$scope', 'GarantiasServices',  '$location', '$rootScope', '$window', '$route','NgTableParams','$uibModal','$uibModalInstance'];

        function ModificarContenedorBodegaController(AuthenticationFactory,$scope, GarantiasServices, $location, $rootScope, $window, $route,NgTableParams,$uibModal,$uibModalInstance) {
            inSession($scope,AuthenticationFactory,$window,false);




            $scope.container=$scope.getData2();
            $scope.key=$scope.container.key.key;
            $scope.storage=$scope.container.storage.key;
            $scope.code=$scope.container.code;
            $scope.name=$scope.container.name;
            $scope.description=$scope.container.description;
            $scope.dimension=$scope.container.dimension;
            $scope.rta = GarantiasServices.retrivebodegacontainerubication([{"container.code":$scope.code,"container.storage.key":$scope.storage,"container.key.key":$scope.key}]);
            $scope.rta.$promise.then(function(data){
                $scope.tableParamsContenedor = new NgTableParams({}, { dataset: data});
            });


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
