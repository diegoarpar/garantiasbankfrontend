/**
 * Created by joag on 9/06/16.
 */
(function () {
        'use strict';
        angular.module("wpc")
            .controller('FiltrarBusquedaReportesController', FiltrarBusquedaReportesController);

        FiltrarBusquedaReportesController.$inject = ['AuthenticationFactory','$scope', 'DynamicSearch',
         '$uibModal', '$location', 'ShareService','$window','GarantiasServices'];

        function FiltrarBusquedaReportesController(AuthenticationFactory,$scope, DynamicSearch,
         $uibModal, $location, ShareService,$window,GarantiasServices)
         {
            inSession($scope,AuthenticationFactory,$window);
            $scope.data = {};
            $scope.lista = [];
            $scope.listaBusqueda = [];
            $scope.columnsMetadata=[];
            $scope.addColumn=function (col,index) {
                 $scope.lista.push(col);
                 $scope.columnsMetadata.splice(index, 1);
             };
             $scope.removeRow=function (col,index) {

                              $scope.lista.splice(index, 1);
                              $scope.columnsMetadata.push(col);
                          };
            $scope.fondos=GarantiasServices.showParametric({nombreparametrica:'fondo'});
            $scope.subseries=[];
            $scope.ok=function(setSearchParameters,type){


                var listToSearch=[];
                var o={};
                if($scope.aditionalFilter!=null){
                    o=JSON.parse(JSON.stringify($scope.aditionalFilter));
                }
                for(var i=0;i<$scope.lista.length;i++){
                        var fieldKey=$scope.lista[i].key;
                        var fieldType=$scope.lista[i].fieldType;
                        if(fieldType=="alistamiento")fieldKey="envio."+fieldKey;
                        o[fieldKey]=$scope.lista[i].toSearch;
                }

                if($scope.fondoSelected!=null){
                    o["ingreso.empresa.key"]=$scope.fondoSelected.key;
                 }
                if($scope.subserieseleccionada!=null){
                    o["ingreso.subserie.key"]=$scope.subserieseleccionada.key;
                 }
                 var u={};
                 u["reportName"]=$scope.reportName;
                 u["description"]=$scope.description;
                 u["batcher"]=$scope.reporteSeleccionado.batcher;
                 u["template"]=$scope.reporteSeleccionado.template;
                 u["fileOutExtension"]=$scope.reporteSeleccionado.fileOutExtension;
                if(type=="report"){
                    if($scope.reporteSeleccionado.query!=null||true){
                        var oo=o;
                        o={};
                        var query=JSON.stringify($scope.reporteSeleccionado.query);
                        do{ query=query.replace("___or","$or"); }while(query.indexOf("___or")>=0);
                        do{ query=query.replace("___and","$and"); }while(query.indexOf("___or")>=0);
                        do{query=query.replace("___",".");}while(query.indexOf("___")>=0);
                        $scope.reporteSeleccionado.query=JSON.parse(query);

                        var query=JSON.stringify($scope.reporteSeleccionado.columns);
                        do{ query=query.replace("___or","$or"); }while(query.indexOf("___or")>=0);
                        do{ query=query.replace("___and","$and"); }while(query.indexOf("___or")>=0);
                        do{query=query.replace("___",".");}while(query.indexOf("___")>=0);
                         $scope.reporteSeleccionado.columns=JSON.parse(query);
                        o["$and"]=$scope.reporteSeleccionado.query;
                        o["$and"].push(oo);

                    }
                }
                listToSearch.push(o);
                listToSearch.push(u);
                var promise=GarantiasServices.createBatcherReport(listToSearch);
                handleSubmitServicePromise(promise,null);
                $scope.setResultSearch(promise);

                if(setSearchParameters){
                    $scope.setSearchParameters(listToSearch);
                }
                $scope.lista=[];
                listToSearch=[];
                $scope.listaBusqueda=[];
                $scope.$dismiss();



            }
            $scope.okReport=function(){
                    $scope.ok(true,"report");
                    $scope.loadReport($scope.reporteSeleccionado);


                }
            $scope.cancel=function(){
                $scope.listaBusqueda=[];
                $scope.lista=[];
                $scope.$dismiss();
            }
            $scope.dateOptions = {formatYear: 'yy', startingDay: 1};
            $scope.openStartDate=function (){$scope.popupStartDate.opened = true;};
            $scope.openEndDate=function(){$scope.popupEndDate.opened = true;};
            $scope.popupStartDate = {opened: false};
            $scope.popupEndDate = {opened: false};
            $scope.data={};
            $scope.cargarSubseries = function() {
                var parameter=[{'fondo.key':$scope.fondoSelected.key}];
                $scope.subseries=GarantiasServices.showtrdpost(parameter);
            }
            $scope.cargarMetadatosReportes=function(){
                $scope.cargarMetadatos();
                var parameter=[{'fondo.key':$scope.fondoSelected.key,'subserie.key':$scope.subserieseleccionada.key}];

                var promise = GarantiasServices.showReportPost(parameter);
                $scope.reportes=promise;
            };
            $scope.cargarMetadatos = function() {
                var parameter=[{'fondo.key':$scope.fondoSelected.key,'subserie.key':$scope.subserieseleccionada.key}];

                var promise = GarantiasServices.showMetadataPost(parameter);
                promise.$promise.then(function(data){

                    if(data!=null){
                        $scope.columnsMetadata=getMetadataFactoryToSearch(data);
                    }
                });
            }
        }


    })();
