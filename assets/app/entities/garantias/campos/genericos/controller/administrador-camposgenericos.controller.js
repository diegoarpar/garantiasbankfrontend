/**
 * Created by joag on 9/06/16.
 */
(function(){
   'use strict';
    angular.module("wpc")
            .controller('CamposGenericosController', CamposGenericosController);

    CamposGenericosController.$inject = ['$scope','CamposGenericosServices', 'CamposGenericosRemoveServices','CamposParametricosServices', '$location','$rootScope','$window','$route'];

    function CamposGenericosController($scope, CamposGenericosServices,CamposGenericosRemoveServices,CamposParametricosServices, $location,$rootScope,$window,$route) {
        $scope.garantiaType=CamposParametricosServices.show({nombreparametrica:"tipogarantia",key:"-1"});
        $scope.campo={};
        $scope.parametrics=[];
        $scope.parametricst=[];
        $scope.loadGenericos=function(value){
         $scope.parametrics=CamposGenericosServices.show({garantiaType:value, fieldType:$scope.campo.fieldType});
        }
        $scope.loadGenericos2=function(value){
                 $scope.parametrics=CamposGenericosServices.show({garantiaType:$scope.campo.garantiaType, fieldType:value});
        }
        $scope.add= function(){
                    $scope.parametricst.push($scope.campo);
                    $scope.rta=CamposGenericosServices.create($scope.parametricst).$promise.then(
                        function(datos){
                            $scope.parametrics=CamposGenericosServices.show({garantiaType:$scope.campo.garantiaType, fieldType:value});
                        },
                        function(error){
                            alert(error);
                        }
                    );
                    $scope.parametrics=[];
                    $scope.parametricst=[];
                    $scope.campo={};
        }
        $scope.remove= function(idx){
            $scope.parametricst.push($scope.parametrics[idx]);
            CamposGenericosRemoveServices.remove({garantiaType:$scope.parametrics[idx].garantiaType,key:$scope.parametrics[idx].key});
            $scope.parametrics=[];
            $scope.parametricst=[];
            $scope.campo={};
        }

    }
 }
)();
