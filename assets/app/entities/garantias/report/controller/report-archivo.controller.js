
(function () {
        'use strict';
        angular.module("wpc")
            .controller('ReporteArchivoController', ReporteArchivoController);

        ReporteArchivoController.$inject =
            ['$scope','AuthenticationFactory', 'GarantiasServices', 'NumberService', 'CamposGenericosServices',
                'CamposEspecificosServices','CamposParametricosServices', '$location', 'ngTableParams', '$filter', '$window','$controller','$sessionStorage','$uibModal'];

        function ReporteArchivoController($scope,AuthenticationFactory, GarantiasServices, NumberService, CamposGenericosServices,
                                 CamposEspecificosServices,CamposParametricosServices, $location, ngTableParams, $filter, $window,$controller,$sessionStorage,$uibModal) {

        //db.archivo_mapfre.find({"$and":[{"ingreso.empresa.key":"MAPFRE"},{"$or":[{"NUMERO_FINANCIAMIENTO":"10011500082"},{"NUMERO_FINANCIAMIENTO":"10011500255"}]}]})

         inSession($scope,AuthenticationFactory,$window);
        $scope.reporte={};
        $scope.loadReport=function(report){
            $scope.reporte=report;
        };
        $scope.results=[];
        $scope.setResultSearch=function(promise){
            promise.$promise.then(function(data){
                $scope.results=data;
            });
        }

        $scope.setSearchParameters=function (parameters){
            console.log(parameters);
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
