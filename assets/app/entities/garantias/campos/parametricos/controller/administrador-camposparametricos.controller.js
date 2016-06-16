/**
 * Created by joag on 9/06/16.
 */
(function(){
   'use strict';
    angular.module("wpc")
            .controller('CamposParametricosController', CamposParametricosController);

    CamposParametricosController.$inject = ['$scope', 'CamposParametricosServices','CamposParametricosRemoveServices', '$location','$rootScope','$window','$route'];

    function CamposParametricosController($scope, CamposParametricosServices,CamposParametricosRemoveServices, $location,$rootScope,$window,$route) {
        $scope.campo={};
        $scope.parametrics=CamposParametricosServices.show();
        $scope.parametricst=[];
        $scope.add= function(){
            $scope.parametricst.push($scope.campo);
            $scope.rta=CamposParametricosServices.create($scope.parametricst);
            $scope.parametrics=CamposParametricosServices.show();
            $scope.parametrics.$promise.then(function(data){
                $scope.parametrics=CamposParametricosServices.show();
            });

            $scope.parametricst=[];
            $scope.campo={};
        }
        $scope.remove= function(idx){
                    $scope.parametricst.push($scope.parametrics[idx]);
                    CamposParametricosRemoveServices.remove({nombreparametrica:$scope.parametrics[idx].nombreparametrica,key:$scope.parametrics[idx].key});
                    $scope.parametrics=CamposParametricosServices.show();
                    $scope.parametrics.$promise.then(function(data){
                        $scope.parametrics=data;
                    });

                    $scope.parametricst=[];
                    $scope.campo={};
                }
    }
   }
)();
