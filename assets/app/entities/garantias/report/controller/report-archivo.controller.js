
(function () {
        'use strict';
        angular.module("wpc")
            .controller('ReporteArchivoController', ReporteArchivoController);

        ReporteArchivoController.$inject =
            ['$scope','AuthenticationFactory', 'GarantiasServices', 'NumberService',
                '$location', 'ngTableParams', '$filter', '$window','$controller','$sessionStorage','$uibModal'];

        function ReporteArchivoController($scope,AuthenticationFactory, GarantiasServices, NumberService,
                                  $location, ngTableParams, $filter, $window,$controller,$sessionStorage,$uibModal) {

         inSession($scope,AuthenticationFactory,$window);
        $scope.reporte={};
        $scope.reports=GarantiasServices.showGeneratedReportPost();
        $scope.loadReport=function(report){
            $scope.reporte=report;
        };
        $scope.results=[];
        $scope.setResultSearch=function(promise){

        }
        $scope.update=function(){
            $scope.reports=GarantiasServices.showGeneratedReportPost();
        }
        $scope.getValue=function(row,propertie){
            //debugger;
            var prop=propertie.split(".");
            var valueToReturn="";

            for(var i=0; i<prop.length;i++){
                if(row instanceof Array){
                    for(var j=0;j<row.length;j++){
                        var row2=row[j];
                        if(row2[prop[i]]!=null){
                            row2=row2[prop[i]];
                            if((i+1)==(prop.length)){valueToReturn=row2; return valueToReturn;}
                        }
                    }
                }else{
                    if(row[prop[i]]!=null){
                        row=row[prop[i]];
                        if((i+1)==(prop.length)){valueToReturn=row; return valueToReturn;}
                    }
                }
            }
            return valueToReturn

        }
        $scope.setSearchParameters=function (parameters){
            console.log(parameters);
        }
        $scope.openModalFilterReportes = function () {
            openModal($scope,$uibModal,'assets/app/entities/garantias/report/view/filtro-reportes.html','FiltrarBusquedaReportesController');

        }


        }
    })();
