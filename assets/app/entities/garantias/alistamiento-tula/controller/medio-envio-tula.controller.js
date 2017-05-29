
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
                $scope.subserie=[];
                var parameter=[];
                parameter[0]={"fondo.key":$scope.ingreso.empresa.key,"subserie.key":$scope.ingreso.subserie.key};
                var promise = GarantiasServices.showMetadataPost(parameter);
                promise.$promise.then(function(data){
                    if(data!=null){
                        if(data.length>0){
                            for(var i=0;i<data.length;i++){
                                $scope.subserie.push(data[i].subserie);

                            }

                        }
                    }

                });
                $scope.downloadBarCode = function() {
                var element = angular.element($("img")[0]);
                var toPdf=element[0].currentSrc;
                var dateList=[{"name":"Codigo", "value":$scope.code}];
                for(var i =0;i<$scope.subserie.length;i++)
                    for(var j =0;j<$scope.subserie[i].metadata.length;j++){
                        if($scope.subserie[i].metadata[j].fieldType=="alistamiento")
                        dateList.push({name:$scope.subserie[i].metadata[j].value,value:$scope.subserie[i].metadata[j].result});
                    }
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
                    var newProperties=[];
                    for(var i =0;i<$scope.subserie.length;i++)
                        for(var j =0;j<$scope.subserie[i].metadata.length;j++){
                            if($scope.subserie[i].metadata[j].fieldType=="alistamiento")
                            newProperties.push({name:$scope.subserie[i].metadata[j].key,value:$scope.subserie[i].metadata[j].result});
                        }
                    $scope.setNewProperties(newProperties);
                    var envio ={numero:$scope.code,precinto:$scope.tula,medio:$scope.medioEnvioSeleccionado};
                    $scope.sendTula(envio);

                    $uibModalInstance.dismiss($scope);
                    $scope.openModal();
                };

                $scope.cancel = function() {
                    $scope.fields=[{},{},{}];
                  $uibModalInstance.dismiss('cancel');
                };


        }
    })();
