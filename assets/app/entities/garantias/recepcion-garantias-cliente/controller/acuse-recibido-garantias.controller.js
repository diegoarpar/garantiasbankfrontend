/**
 * Created by joag on 9/06/16.
 */
(function(){
        'use strict';
        angular.module("wpc")
            .controller('AcuseRecibidoGarantiasController', AcuseRecibidoGarantiasController);

        AcuseRecibidoGarantiasController.$inject =
                    ['$scope', 'GarantiasServices','NumberService','GarantiasServiceGetGarantias',
                    'GarantiasServiceUpdateGarantias' ,'$location','ngTableParams','$filter'];

        function AcuseRecibidoGarantiasController($scope, GarantiasServices,NumberService,GarantiasServiceGetGarantias,
                                                  GarantiasServiceUpdateGarantias, $location,ngTableParams,$filter) {
            $scope.all_columns=[];
            $scope.columns=[];
            $scope.digital=[];
            $scope.digitalu=[];
            $scope.numero=[];
            $scope.rowDetail=[];
            $scope.dateStart = new Date();
            $scope.dateEnd = new Date();
            $scope.createNewUser = function () {
                $location.path('/user-list');
            };
            $scope.reset = function () {
                $scope.digital.selected = {};
            };
            $scope.removeRow = function(index) {
                $scope.digital.splice(index, 1);
                construirTabla($scope, $scope.digital,ngTableParams,$filter);
            };
            $scope.addRow = function() {
                $scope.inserted = {
                    id: $scope.digital.length+1
                };
                $scope.digital.push($scope.inserted);
            };

            $scope.addColumn = function(title) {
                $scope.inserted = {
                    title: title,
                    checked:true,
                    type:"string"
                };

                $scope.all_columns.push($scope.inserted);
            };

            $scope.getTemplate = function (c) {
                if($scope.digital.selected){
                    if (c.id === $scope.digital.selected.id) return 'edit';
                    else return 'display';
                }
                else return 'display';
            };

            $scope.editRow = function (c) {
                $scope.digital.selected = angular.copy(c);
            };

            $scope.saveRow = function (idx) {
                $scope.digital[idx] = angular.copy($scope.digital.selected);
                $scope.reset();
            };

            $scope.createPlanilla = function () {
                $scope.numero=NumberService.getNumber('');
                $scope.numero.$promise.then(function(data) {
                    $scope.numero=data;
                    concatNumber($scope);
                    alert("REGISTRO REALIZADO CON EL ACUSE "+$scope.numero[0].number) ;
                    generateBarCodePDF($scope.numero[0].number,document,"Acuse de Recibido");
                    GarantiasServices.create($scope.digital);

                    $scope.numero=[];
                    $scope.digital=[];
                    $scope.all_columns=[];
                });
            };

            $scope.showContent = function($fileContent){
                var jsontext = $fileContent.split('\n');
                jsontext=txtToJson(jsontext, $scope);
                $scope.digital = JSON.parse(jsontext);
            };

            $scope.export=function($event, fileName){
                $scope.helper.csv.generate($event, "report.csv");
                $location.href=$scope.helper.csv.link();
            };


            $scope.$watch('all_columns', function() {
                update_columns($scope);
            }, true);


        }


        function concatNumber($scope){
            for(var i=0;i<$scope.digital.length;i++){
                $scope.digital[i].acuse=$scope.numero[0].number;
            }
        }


        function concatGarantia($scope){
            var cont=0;
            for(var i=0;i<$scope.digital.length;i++){
                if($scope.digital[i].garantiaRecibida){
                    $scope.digital[i].fechaRecepcionGarantia=new Date();
                    $scope.digitalu[cont]=($scope.digital[i]);
                    cont++;
                }
            }
        };

        function construirTabla($scope, digital,ngTableParams,$filter){
            $scope.data = digital;
            $scope.tablaGarantias = new ngTableParams({
                page: 1,
                count: 2000,
                sorting: {firstname:'asc'}
            }, {
                total: digital.length,
                getData: function ($defer, params) {
                    params.total(digital.length);
                    $scope.data = params.sorting() ? $filter('orderBy')(digital, params.orderBy()) : digital;
                    $scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : digital;
                    $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                    $defer.resolve($scope.data);
                }
            });
        }
    }
)();
