/**
 * Created by joag on 9/06/16.
 */
(function(){
   'use strict';
    angular.module("wpc")
            .controller('CamposGenericosController', AdministradorUsuariosController);

    AdministradorUsuariosController.$inject = ['$scope','CamposGenericosServices', 'CamposGenericosRemoveServices','CamposParametricosServices', '$location','$rootScope','$window','$route'];

    function AdministradorUsuariosController($scope, CamposGenericosServices,CamposGenericosRemoveServices,CamposParametricosServices, $location,$rootScope,$window,$route) {
        $scope.garantiaType=CamposParametricosServices.show({nombreparametrica:"tipogarantia",key:"-1"});
        $scope.campo={};
        $scope.parametrics=[];
        $scope.parametricst=[];
        $scope.loadGenericos=function(value){
         $scope.parametrics=CamposGenericosServices.show({garantiaType:value});
        }
        $scope.add= function(){
                    $scope.parametricst.push($scope.campo);
                    $scope.rta=CamposGenericosServices.create($scope.parametricst);
                    $scope.parametrics=[];
                    $scope.campo={};
                }
                $scope.remove= function(idx){
                    $scope.parametricst.push($scope.parametrics[idx]);
                    CamposGenericosRemoveServices.remove({garantiaType:$scope.parametrics[idx].garantiaType,key:$scope.parametrics[idx].key});
                    $scope.parametrics=[];
                    $scope.campo={};
                }

    }
 }
)();
