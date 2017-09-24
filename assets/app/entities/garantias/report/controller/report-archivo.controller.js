
(function () {
        'use strict';
        angular.module("wpc")
            .controller('ReporteArchivoController', ReporteArchivoController);

        ReporteArchivoController.$inject =
            ['$scope','AuthenticationFactory', 'GarantiasServices', 'NumberService',
                '$location', 'ngTableParams', '$filter', '$window','$controller','$sessionStorage','$uibModal'];

        function ReporteArchivoController($scope,AuthenticationFactory, GarantiasServices, NumberService,
                                  $location, ngTableParams, $filter, $window,$controller,$sessionStorage,$uibModal) {

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
