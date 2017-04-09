
(function () {
        'use strict';
        angular.module("wpc")
            .controller('VerificarCompletitudExpedienteController', VerificarCompletitudExpedienteController);

        VerificarCompletitudExpedienteController.$inject =
            ['$scope','AuthenticationFactory','ShareService', 'GarantiasServices', 'NumberService', 'CamposGenericosServices',
                'CamposEspecificosServices','CamposParametricosServices', '$location', 'ngTableParams', '$filter', '$window','$controller','$sessionStorage','$uibModalInstance'];

        function VerificarCompletitudExpedienteController($scope,AuthenticationFactory,ShareService, GarantiasServices, NumberService, CamposGenericosServices,
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
                row=concatCompletitud(row,$scope.subserie, $scope.tipodocumento);
                var parameter=[];
                parameter[0]=row;

                GarantiasServices.update(parameter);
                $scope.catchGarantias();

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
            validaciones.validacionidoneidad=false;
            validaciones.validacioncompletitud=true;
            validaciones.validaciondatos=false;

            row.validaciones=validaciones;
            return row;
        }
        function concatCompletitud(row,subserie,tipodocumento) {
            row.completitud={};
            row.completitud.general=[];
            row.completitud.tipoDocumento={};
            for(var i=0;i<subserie.length;i++){
                for(var j=0;j<subserie[i].metadata.length;j++){
                    if(subserie[i].metadata[j]["fieldType"]=="completitud"){
                        row.completitud.general.push(subserie[i].metadata[j]);
                    }
                }
            }
            for(var i=0;i<tipodocumento.length;i++){
                for(var j=0;j<tipodocumento[i].metadata.length;j++){
                    row.completitud.tipoDocumento[tipodocumento[i].key]=[];
                    if(tipodocumento[i].metadata[j]["fieldType"]=="completitud"){
                        row.completitud.tipoDocumento[tipodocumento[i].key].push(tipodocumento[i].metadata[j]);
                    }
                }
            }

            return row;
        }
    })();
