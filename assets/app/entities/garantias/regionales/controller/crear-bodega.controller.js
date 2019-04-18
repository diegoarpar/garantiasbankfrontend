
(function () {
        'use strict';
        angular.module("wpc")
            .controller('CrearBodegaController', CrearBodegaController);

        CrearBodegaController.$inject =
            ['$scope','AuthenticationFactory','ShareService', 'GarantiasServices', 'NumberService',
                '$location', 'ngTableParams', '$filter', '$window','$controller','$sessionStorage','$uibModalInstance'];

        function CrearBodegaController($scope,AuthenticationFactory,ShareService, GarantiasServices, NumberService,
                                  $location, ngTableParams, $filter, $window,$controller,$sessionStorage,$uibModalInstance) {


         inSession($scope,AuthenticationFactory,$window);


                $scope.ok = function() {

                  var nodeDatab = $scope.actualVariableb;
                  if(nodeDatab.nodes==undefined){nodeDatab.nodes=[]}
                  nodeDatab.nodes.push({
                    location: $scope.location,
                    value: $scope.value,
                    key:$scope.key,
                    nodes: []
                  });

                $uibModalInstance.dismiss('cancel');
                };

                $scope.cancel = function() {
                  $uibModalInstance.dismiss('cancel');
                };


        }
    })();
