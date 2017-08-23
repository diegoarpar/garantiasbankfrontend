
(function () {
        'use strict';
        angular.module("wpc")
            .controller('VerificarIdoneidadExpedienteController', VerificarIdoneidadExpedienteController);

        VerificarIdoneidadExpedienteController.$inject =
            ['$scope','AuthenticationFactory','ShareService', 'GarantiasServices', 'NumberService', 'CamposGenericosServices',
                'CamposEspecificosServices','CamposParametricosServices', '$location', 'ngTableParams', '$filter', '$window','$controller','$sessionStorage','$uibModalInstance'];

        function VerificarIdoneidadExpedienteController($scope,AuthenticationFactory,ShareService, GarantiasServices, NumberService, CamposGenericosServices,
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
            if(!$scope.masivo){
                           var row = $scope.rowDetail;
                           row=concatStageRow("idoneidad",row,$scope.subserie, $scope.tipodocumento);
                           var parameter=[];
                           parameter[0]=row;

                           $scope.rowToSave=parameter;

                           var promise = NumberService.getNumber('');
                           promise.$promise.then(function (data){
                               if(data!=null){
                                   $scope.rowToSave[0].idoneidad._date=data[0].number;
                                    $scope.cleanDigital();
                                   var promise=GarantiasServices.update(parameter);

                                   handleSubmitServicePromise(promise,null);
                               }
                           });
                }else{
                    var promise = NumberService.getNumber('');
                    promise.$promise.then(function (data){
                        if(data!=null){
                            for(var i=0;i<$scope.idoneidadMasivo.length;i++){
                                var row = $scope.idoneidadMasivo[i];
                                row=concatStageRow("idoneidad",row,$scope.subserie, $scope.tipodocumento);
                                row.idoneidad._date=data[0].number;
                                $scope.idoneidadMasivo[i]=row;
                            }
                            var promise=GarantiasServices.update($scope.idoneidadMasivo);
                            handleSubmitServicePromise(promise,null);
                        }
                    });
                     $scope.cleanDigital();
                }
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


    })();
