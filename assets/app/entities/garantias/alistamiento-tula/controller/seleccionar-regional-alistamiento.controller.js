
(function () {
        'use strict';
        angular.module("wpc")
            .controller('SeleccionarRegionalAlistamientoController', SeleccionarRegionalAlistamientoController);

        SeleccionarRegionalAlistamientoController.$inject =
            ['$scope','AuthenticationFactory','ShareService', 'GarantiasServices', 'NumberService', 'CamposGenericosServices',
                'CamposEspecificosServices','CamposParametricosServices', '$location', 'ngTableParams', '$filter', '$window','$controller','$sessionStorage','$uibModalInstance'];

        function SeleccionarRegionalAlistamientoController($scope,AuthenticationFactory,ShareService, GarantiasServices, NumberService, CamposGenericosServices,
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
                    var empresa = JSON.parse($scope.fondoSeleccionado);
                    var regional = JSON.parse($scope.regionalSeleccionada);
                    var consulta={"ingreso.empresa.key":empresa.key,"ingreso.regional.key":regional.key,"envio.numero":null};

                    $scope.setRegional($scope.regionalSeleccionada);
                    var ingreso={};
                         $scope.regionalSeleccionada instanceof String? ingreso.regional=JSON.parse($scope.regionalSeleccionada):ingreso.regional=$scope.regionalSeleccionada;
                         $scope.subserieseleccionada instanceof String? ingreso.subserie=JSON.parse($scope.subserieseleccionada):ingreso.subserie=$scope.subserieseleccionada;
                         $scope.fondoSeleccionado instanceof String? ingreso.empresa=JSON.parse($scope.fondoSeleccionado):ingreso.empresa=$scope.fondoSeleccionado;

                     $scope.setIngreso(ingreso);
                    $scope.loadPlanillaToTula(consulta);

                    $uibModalInstance.dismiss($scope);
                };

                $scope.cancel = function() {
                    $scope.fields=[{},{},{}];
                  $uibModalInstance.dismiss('cancel');
                };


        }
    })();
