
(function () {
        'use strict';
        angular.module("wpc")
            .controller('CrearUsuarioController', CrearUsuarioController);

        CrearUsuarioController.$inject =
            ['$scope','AuthenticationFactory','ShareService', 'GarantiasServices', 'NumberService', 'CamposGenericosServices',
                'CamposEspecificosServices','CamposParametricosServices', '$location', 'ngTableParams', '$filter', '$window','$controller','$sessionStorage','$uibModalInstance'];

        function CrearUsuarioController($scope,AuthenticationFactory,ShareService, GarantiasServices, NumberService, CamposGenericosServices,
                                 CamposEspecificosServices,CamposParametricosServices, $location, ngTableParams, $filter, $window,$controller,$sessionStorage,$uibModalInstance)
         {


            inSession($scope,AuthenticationFactory,$window);


            $scope.ok = function() {

                $uibModalInstance.dismiss('cancel');
            };

            $scope.cancel = function() {
              $uibModalInstance.dismiss('cancel');
            };


        }
    })();
