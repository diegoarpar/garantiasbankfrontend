/**
 * Created by joag on 9/06/16.
 */

(function () {
        'use strict';
        angular.module("wpc")
            .controller('CrearContenedorBodegaController', CrearContenedorBodegaController);

        CrearContenedorBodegaController.$inject = ['AuthenticationFactory','$scope', 'GarantiasServices',  '$location', '$rootScope', '$window', '$route','NgTableParams'];

        function CrearContenedorBodegaController(AuthenticationFactory,$scope, GarantiasServices, $location, $rootScope, $window, $route,NgTableParams) {
            inSession($scope,AuthenticationFactory,$window,false);
            $scope.fondos=GarantiasServices.showParametric({nombreparametrica:'fondo',tenant:window.sessionStorage.getItem("tenant")});
            $scope.menu_activo=true;
            $scope.change_manu_activo=function(){
                $scope.menu_activo=$scope.menu_activo==true?false:true;

            }



          $scope.ubicaciones=[];



          $scope.tableParamsContenedor = new NgTableParams({}, { dataset: $scope.ubicaciones});

          $scope.addUbicacion=function(){
            $scope.ubicaciones.push({code:"",name:""});
            $scope.tableParamsContenedor = new NgTableParams({}, { dataset: $scope.ubicaciones});

          }
          $scope.remove=function(_this){
              $scope.ubicaciones.splice(_this.$index,1);
              $scope.tableParamsContenedor = new NgTableParams({}, { dataset: $scope.ubicaciones});

            }
        }
    })();
