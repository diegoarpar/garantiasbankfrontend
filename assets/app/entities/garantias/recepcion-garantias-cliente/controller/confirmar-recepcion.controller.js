
(function () {
        'use strict';
        angular.module("wpc")
            .controller('ConfirmarRecepcionController', ConfirmarRecepcionController);

        ConfirmarRecepcionController.$inject =
            ['$scope','AuthenticationFactory','ShareService', 'GarantiasServices', 'NumberService', 'CamposGenericosServices',
                'CamposEspecificosServices','CamposParametricosServices', '$location', 'ngTableParams', '$filter', '$window','$controller','$sessionStorage','$uibModalInstance'];

        function ConfirmarRecepcionController($scope,AuthenticationFactory,ShareService, GarantiasServices, NumberService, CamposGenericosServices,
                                 CamposEspecificosServices,CamposParametricosServices, $location, ngTableParams, $filter, $window,$controller,$sessionStorage,$uibModalInstance) {


         inSession($scope,AuthenticationFactory,$window);
            $scope.code = "";
             $scope.type = "CODE128B";

            $scope.downloadBarCode = function() {
            var element = angular.element($("img")[0]);
            var toPdf=element[0].currentSrc;
            var dateList=[{name:"Código",value:$scope.code},{name:"Valija",value:$scope.valija},{name:"Precinto",value:$scope.precinto}];
            downloadPDF("label.pdf",toPdf,dateList);

            };
            $scope.generateBarcode = function() {
                $scope.code = '';
                var promise = NumberService.getNumber('');
                promise.$promise.then(function (data){
                    if(data!=null)
                    $scope.code = data[0].number;
                });

            };
            $scope.ok = function() {
                $scope.createPlanilla($scope.code);
                $uibModalInstance.dismiss('cancel');
            };

            $scope.cancel = function() {
              $uibModalInstance.dismiss('cancel');
            };
        }
    })();
