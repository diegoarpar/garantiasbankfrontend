
(function () {
        'use strict';
        angular.module("wpc")
            .controller('ModifyReportModalController', ModifyReportModalController);

        ModifyReportModalController.$inject =
            ['$scope','AuthenticationFactory','ShareService', 'GarantiasServices', 'NumberService',
                '$location', 'ngTableParams', '$filter', '$window','$controller','$sessionStorage','$uibModalInstance'];

        function ModifyReportModalController($scope,AuthenticationFactory,ShareService, GarantiasServices, NumberService,
                                  $location, ngTableParams, $filter, $window,$controller,$sessionStorage,$uibModalInstance) {


         inSession($scope,AuthenticationFactory,$window);
            $scope.fondos=GarantiasServices.showParametric({nombreparametrica:'fondo'});
            $scope.columnsR="";
            $scope.query="";
            if($scope.isSelectedReport){
                $scope.columnsR=JSON.stringify($scope.selectedReport.columns);
                $scope.query=JSON.stringify($scope.selectedReport.query);
            }
            $scope.save=function(){
                $scope.selectedReport.columns=JSON.parse($scope.columnsR);
                $scope.selectedReport.query=JSON.parse($scope.query);
                $scope.selectedReport.fondo=$scope.fondoSelected;
                $scope.selectedReport.subserie=$scope.subserieseleccionada;
                if($scope.isSelectedReport){

                    $scope.newReport($scope.selectedReport);
                }else{

                    $scope.newReport($scope.selectedReport);
                }
                $scope.$dismiss();
            }
            $scope.cargarSubseries = function() {
                            var parameter=[{'fondo.key':$scope.fondoSelected.key}];
                            $scope.subseries=GarantiasServices.showtrdpost(parameter);
                        }
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


                $scope.cancel = function() {
                    $scope.fields=[{},{},{}];
                  $uibModalInstance.dismiss('cancel');
                };


        }
    })();
