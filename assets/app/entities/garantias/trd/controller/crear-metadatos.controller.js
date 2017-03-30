
(function () {
        'use strict';
        angular.module("wpc")
            .controller('CrearMetadatosController', CrearMetadatosController);

        CrearMetadatosController.$inject =
            ['$scope','AuthenticationFactory','ShareService', 'GarantiasServices', 'NumberService', 'CamposGenericosServices',
                'CamposEspecificosServices','CamposParametricosServices', '$location', 'ngTableParams', '$filter', '$window','$controller','$sessionStorage','$uibModalInstance'];

        function CrearMetadatosController($scope,AuthenticationFactory,ShareService, GarantiasServices, NumberService, CamposGenericosServices,
                                 CamposEspecificosServices,CamposParametricosServices, $location, ngTableParams, $filter, $window,$controller,$sessionStorage,$uibModalInstance) {


         inSession($scope,AuthenticationFactory,$window);


                $scope.ok = function() {

                  var nodeData = $scope.actualVariable;
                  if(nodeData.nodes==undefined){nodeData.nodes=[]}
                  nodeData.nodes.push({
                    fieldType: $scope.campo.fieldType,
                    fieldPrototype: $scope.campo.fieldPrototype,
                    key:$scope.campo.value,
                    value:$scope.campo.name,
                    nodes: [],
                    nombreparametrica:"metadato"
                  });

                $uibModalInstance.dismiss('cancel');
                };

                $scope.cancel = function() {
                  $scope.showModal = false;
                  $uibModalInstance.dismiss('cancel');
                };


        }
    })();
