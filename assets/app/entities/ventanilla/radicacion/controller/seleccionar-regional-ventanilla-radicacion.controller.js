
(function () {
        'use strict';
        angular.module("wpc")
            .controller('SeleccionarRegionalVentanillaRadicacionController', SeleccionarRegionalVentanillaRadicacionController);

        SeleccionarRegionalVentanillaRadicacionController.$inject =
            ['$scope','AuthenticationFactory','ShareService', 'GarantiasServices', 'NumberService',
                '$location', 'ngTableParams', '$filter', '$window','$controller','$sessionStorage','$uibModalInstance'];

        function SeleccionarRegionalVentanillaRadicacionController($scope,AuthenticationFactory,ShareService, GarantiasServices, NumberService,
                                 $location, ngTableParams, $filter, $window,$controller,$sessionStorage,$uibModalInstance) {


         inSession($scope,AuthenticationFactory,$window);
            $scope.fondos=GarantiasServices.showParametric({nombreparametrica:'fondo'});
            $scope.regionales=[];
            $scope.subseries=[];
                $scope.cargarRegionales = function(value) {
                    var regionalSeleccionada=$scope.fondoSeleccionado;
                    var fondo3=[{'fondo.key':regionalSeleccionada.key}];

                    $scope.subseries=GarantiasServices.showtrdpost(fondo3);
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
                    var subserie = $scope.subserieseleccionada;

                    var subserieRetrive=[{'subserie.key':subserie.key}];
                    var promise=GarantiasServices.showMetadataPost(subserieRetrive);
                        promise.$promise.then(function (data){

                            if(data!=null){
                                if(data.length>0){
                                    $uibModalInstance.dismiss('cancel');
                                    $scope.fields.splice(0,$scope.fields.length);
                                    for(var i=0;i<data[0].subserie.metadata.length;i++){
                                        $scope.fields.push(data[0].subserie.metadata[i]);
                                        }
                                     var ingreso={};
                                         $scope.regionalSeleccionada instanceof String? ingreso.regional=JSON.parse($scope.regionalSeleccionada):ingreso.regional=$scope.regionalSeleccionada;
                                         $scope.subserieseleccionada instanceof String? ingreso.subserie=JSON.parse($scope.subserieseleccionada):ingreso.subserie=$scope.subserieseleccionada;
                                         $scope.fondoSeleccionado instanceof String? ingreso.empresa=JSON.parse($scope.fondoSeleccionado):ingreso.empresa=$scope.fondoSeleccionado;

                                     $scope.setIngreso(ingreso);
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
