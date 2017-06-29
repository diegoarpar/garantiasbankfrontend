
(function () {
        'use strict';
        angular.module("wpc")
            .controller('ReporteArchivoController', ReporteArchivoController);

        ReporteArchivoController.$inject =
            ['$scope','AuthenticationFactory', 'GarantiasServices', 'NumberService', 'CamposGenericosServices',
                'CamposEspecificosServices','CamposParametricosServices', '$location', 'ngTableParams', '$filter', '$window','$controller','$sessionStorage','$uibModal'];

        function ReporteArchivoController($scope,AuthenticationFactory, GarantiasServices, NumberService, CamposGenericosServices,
                                 CamposEspecificosServices,CamposParametricosServices, $location, ngTableParams, $filter, $window,$controller,$sessionStorage,$uibModal) {


         inSession($scope,AuthenticationFactory,$window);
        $scope.reporte={};
        $scope.loadReport=function(report){
            $scope.reporte=report;
        };
        $scope.results=[];
        $scope.setResultSearch=function(promise){
            promise.$promise.then(function(data){
                console.log(data);
                $scope.results=data;
            });
        }

        $scope.openModalFilterReportes = function () {
            var modalInstance = $uibModal.open({
                    templateUrl: 'assets/app/entities/modal/filtro/view/filtro-reportes.html',
                    controller: 'FiltrarBusquedaController',
                    scope: $scope,
                    size: 'lg'
                }
            );
        }


        }
    })();
