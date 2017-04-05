
(function () {
        'use strict';
        angular.module("wpc")
            .controller('SeleccionarRegionalController', SeleccionarRegionalController);

        SeleccionarRegionalController.$inject =
            ['$scope','AuthenticationFactory','ShareService', 'GarantiasServices', 'NumberService', 'CamposGenericosServices',
                'CamposEspecificosServices','CamposParametricosServices', '$location', 'ngTableParams', '$filter', '$window','$controller','$sessionStorage','$uibModalInstance'];

        function SeleccionarRegionalController($scope,AuthenticationFactory,ShareService, GarantiasServices, NumberService, CamposGenericosServices,
                                 CamposEspecificosServices,CamposParametricosServices, $location, ngTableParams, $filter, $window,$controller,$sessionStorage,$uibModalInstance) {


         inSession($scope,AuthenticationFactory,$window);
            $scope.fondos=CamposParametricosServices.show({nombreparametrica:'fondo'});
            $scope.regionales=[];
            $scope.subseries=[];
                $scope.cargarRegionales = function(value) {
                    var regionalSeleccionada=JSON.parse($scope.fondoSeleccionado);
                    var fondo3=[{'fondo.key':regionalSeleccionada.key}];

                    $scope.subseries=$scope.actualsTrds=GarantiasServices.showtrdpost(fondo3);
                    var promise=GarantiasServices.showregional({nombreparametrica: regionalSeleccionada.nombreparametrica,key: regionalSeleccionada.key});
                    promise.$promise.then(function (data){
                        if(data!=null){
                            if(data.length>0){
                                $scope.regionales=data[0].nodes;
                                }
                            }
                    });

                }

                $scope.ok = function() {
                    var subserie = JSON.parse($scope.subserieseleccionada);

                    var subserieRetrive=[{'subserie.key':subserie.key}];
                    var promise=GarantiasServices.showMetadataPost(subserieRetrive);
                        promise.$promise.then(function (data){

                            if(data!=null){
                                if(data.length>0){
                                    $uibModalInstance.dismiss('cancel');
                                    $scope.fields.splice(0,$scope.fields.length);
                                    for(var i=0;i<data[0].subserie.metadata.length;i++)
                                        $scope.fields.push(data[0].subserie.metadata[i]);
                                }else{
                                    alert("no hay datos asociados");
                                }
                                    }
                        });


                };

                $scope.cancel = function() {
                    $scope.fields=[{},{},{}];
                  $uibModalInstance.dismiss('cancel');
                };


        }
    })();
