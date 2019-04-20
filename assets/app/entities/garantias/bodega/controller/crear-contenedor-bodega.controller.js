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

            $scope.cargarBodegas=function(fondo){
                $scope.bodegasrta=GarantiasServices.showbodega({nombreparametrica: $scope.fondoSeleccionado.nombreparametrica,key: $scope.fondoSeleccionado.key});
                $scope.bodegasrta.$promise.then(function (data){
                        $scope.bodegas=[];
                        for (var i=0;!!data&&i< data.length;i++)
                            for (var j=0;!!data[i]&&!!data[i].nodes&&j< data[i].nodes.length;i++)
                                $scope.bodegas.push(data[i].nodes[j]);
                    }
                );

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
