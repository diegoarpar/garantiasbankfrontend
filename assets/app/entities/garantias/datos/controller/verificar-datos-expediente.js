
(function () {
        'use strict';
        angular.module("wpc")
            .controller('VerificarDatosExpedienteController', VerificarDatosExpedienteController);

        VerificarDatosExpedienteController.$inject =
            ['$scope','AuthenticationFactory','ShareService', 'GarantiasServices', 'NumberService', 'CamposGenericosServices',
                'CamposEspecificosServices','CamposParametricosServices', '$location', 'ngTableParams', '$filter', '$window','$controller','$sessionStorage','$uibModalInstance'];

        function VerificarDatosExpedienteController($scope,AuthenticationFactory,ShareService, GarantiasServices, NumberService, CamposGenericosServices,
                                 CamposEspecificosServices,CamposParametricosServices, $location, ngTableParams, $filter, $window,$controller,$sessionStorage,$uibModalInstance)
         {


            inSession($scope,AuthenticationFactory,$window);

            $scope.rowDetailP=[];
            var trd=$scope.rowDetail.ingreso.empresa;
            var subserie=$scope.rowDetail.ingreso.subserie;
            $scope.tipodocumento=[];
            $scope.subserie=[];
            var parameter=[];
            parameter[0]={"fondo.key":trd.key,"subserie.key":subserie.key};
            var promise = GarantiasServices.showMetadataPost(parameter);
            promise.$promise.then(function(data){
                if(data!=null){
                    if(data.length>0){
                        for(var i=0;i<data.length;i++){
                            $scope.subserie.push(data[i].subserie);
                            for(var j=0;j<data[i].tipodocumento.length;j++){
                                $scope.tipodocumento.push(data[i].tipodocumento[j]);
                            }
                        }

                    }
                }

            });
            for(var p in $scope.rowDetail){
                var row={};
                row["key"]=p;
                row["value"]=$scope.rowDetail[p];
                $scope.rowDetailP.push(row);
            }
            $scope.rowDetailShow = function (row) {
                return rowDetailShow(row);
            };

            $scope.ok = function() {
                var row = $scope.rowDetail;
                row=concatGontenido(row);
                row=concatDatos(row,$scope.subserie, $scope.tipodocumento);
                var parameter=[];
                parameter[0]=row;

                $scope.rowToSave=parameter;

                var promise = NumberService.getNumber('');
                promise.$promise.then(function (data){
                    if(data!=null){
                        $scope.rowToSave[0].datos._date=data[0].number;
                        GarantiasServices.update(parameter);
                    }
                });

                $uibModalInstance.dismiss('cancel');
            };

            $scope.cancel = function() {
              $scope.showModal = false;
              $uibModalInstance.dismiss('cancel');
            };

            $scope.saveCompleteInfoRow = function () {


                $scope.digital = [];
                $scope.digitalu = [];
                $scope.showmodal = false;
            };

        }
        function concatGontenido(row) {
            var validaciones={};
            validaciones.validacionidoneidad=true;
            validaciones.validacioncompletitud=true;
            validaciones.validaciondatos=true;

            row.validaciones=validaciones;
            return row;
        }
        function concatDatos(row,subserie,tipodocumento) {
            row.datos={};
            row.datos.general=[];
            row.datos.tipoDocumento={};
            for(var i=0;i<subserie.length;i++){
                for(var j=0;j<subserie[i].metadata.length;j++){
                    if(subserie[i].metadata[j]["fieldType"]=="datos"){
                        row.datos.general.push(subserie[i].metadata[j]);
                    }
                }
            }
            for(var i=0;i<tipodocumento.length;i++){
                for(var j=0;j<tipodocumento[i].metadata.length;j++){
                    row.datos.tipoDocumento[tipodocumento[i].key]=[];
                    if(tipodocumento[i].metadata[j]["fieldType"]=="datos"){
                        row.datos.tipoDocumento[tipodocumento[i].key].push(tipodocumento[i].metadata[j]);
                    }
                }
            }
            return row;
        }
    })();
