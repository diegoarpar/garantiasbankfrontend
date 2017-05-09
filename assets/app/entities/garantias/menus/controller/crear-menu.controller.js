
(function () {
        'use strict';
        angular.module("wpc")
            .controller('CrearMenuController', CrearMenuController);

        CrearMenuController.$inject =
            ['$scope','AuthenticationFactory','ShareService', 'GarantiasServices', 'NumberService', 'CamposGenericosServices',
                'CamposEspecificosServices','CamposParametricosServices', '$location', 'ngTableParams', '$filter', '$window','$controller','$sessionStorage','$uibModalInstance'];

        function CrearMenuController($scope,AuthenticationFactory,ShareService, GarantiasServices, NumberService, CamposGenericosServices,
                                 CamposEspecificosServices,CamposParametricosServices, $location, ngTableParams, $filter, $window,$controller,$sessionStorage,$uibModalInstance) {


         inSession($scope,AuthenticationFactory,$window);


                $scope.ok = function() {

                  var nodeData = $scope.actualVariable;
                  if(nodeData.nodes==undefined){nodeData.nodes=[]}
                  nodeData.nodes.push({
                    location: $scope.location,
                    value: $scope.value,
                    key:$scope.key,
                    nodes: []
                  });

                $uibModalInstance.dismiss('cancel');
                };

                $scope.cancel = function() {
                  $scope.showModal = false;
                  $uibModalInstance.dismiss('cancel');
                };


        }
    })();
