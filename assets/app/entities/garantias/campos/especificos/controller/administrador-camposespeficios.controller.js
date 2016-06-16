/**
 * Created by joag on 9/06/16.
 */
(function(){
   'use strict';
    angular.module("wpc")
            .controller('CamposEspecificosController', CamposEspecificosController);

    CamposEspecificosController.$inject = ['$scope', 'CamposParametricosServices','CamposEspecificosServices','CamposEspecificosRemoveServices', '$location','$rootScope','$window','$route'];

    function CamposEspecificosController($scope, CamposParametricosServices,CamposEspecificosServices,CamposEspecificosRemoveServices, $location,$rootScope,$window,$route) {
        $scope.garantiaType=CamposParametricosServices.show({nombreparametrica:"tipogarantia"});
        $scope.campo={};
        $scope.parametrics=[];
        $scope.parametricst=[];
        $scope.loadGenericos=function(value){
         $scope.parametrics=CamposEspecificosServices.show({garantiaType:value, fieldType:$scope.campo.fieldType});
        }
        $scope.loadGenericos2=function(value){
                 $scope.parametrics=CamposEspecificosServices.show({garantiaType:$scope.campo.garantiaType, fieldType:value});
        }
        $scope.add= function(){
                    $scope.parametricst.push($scope.campo);
                    $scope.rta=CamposEspecificosServices.create($scope.parametricst);
                    $scope.parametrics=[];
                    $scope.parametricst=[];
                    $scope.campo={};
        }
        $scope.remove= function(idx){
            $scope.parametricst.push($scope.parametrics[idx]);
            CamposEspecificosRemoveServices.remove({garantiaType:$scope.parametrics[idx].garantiaType,key:$scope.parametrics[idx].key});
            $scope.parametrics=[];
            $scope.parametricst=[];
            $scope.campo={};
        }

    }
    }
)();
