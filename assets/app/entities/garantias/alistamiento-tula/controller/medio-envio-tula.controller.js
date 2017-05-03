
(function () {
        'use strict';
        angular.module("wpc")
            .controller('SeleccionarMedioEnvioController', SeleccionarMedioEnvioController);

        SeleccionarMedioEnvioController.$inject =
            ['$scope','AuthenticationFactory','ShareService', 'GarantiasServices', 'NumberService', 'CamposGenericosServices',
                'CamposEspecificosServices','CamposParametricosServices', '$location', 'ngTableParams', '$filter', '$window','$controller','$sessionStorage','$uibModalInstance'];

        function SeleccionarMedioEnvioController($scope,AuthenticationFactory,ShareService, GarantiasServices, NumberService, CamposGenericosServices,
                                 CamposEspecificosServices,CamposParametricosServices, $location, ngTableParams, $filter, $window,$controller,$sessionStorage,$uibModalInstance) {


         inSession($scope,AuthenticationFactory,$window);
                $scope.medioEnvioSeleccionado={};
                $scope.listaMedioEnvio=[{value:"Tula",name:"Tula"},{value:"Caja_X200",name:"Caja X200"},{value:"Caja_X300",name:"Caja X300"}];
                $scope.code = "";
                $scope.type = "CODE128B";

                $scope.downloadBarCode = function() {
                var element = angular.element($("img")[0]);
                var toPdf=element[0].currentSrc;

                     var doc = new jsPDF('p', 'mm');
                             doc.addImage(toPdf, 'PNG', 10, 10);
                             doc.text(40, 41, 'Código '+$scope.code);
                             doc.save('sample-file.pdf');
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
                debugger;
                    var envio ={numero:$scope.code,precinto:$scope.tula,medio:$scope.medioEnvioSeleccionado};
                    $scope.sendTula(envio);
                    $uibModalInstance.dismiss($scope);
                };

                $scope.cancel = function() {
                    $scope.fields=[{},{},{}];
                  $uibModalInstance.dismiss('cancel');
                };


        }
    })();
