/**
 * Created by joag on 9/06/16.
 */
(function () {
        'use strict';
        angular.module("wpc")
            .controller('CargaDirectaController', CargaDirectaController);

        CargaDirectaController.$inject =
            ['AuthenticationFactory','$scope', 'GarantiasServices', 'NumberService',
                 '$location', 'ngTableParams', '$filter', '$window','$uibModal','$timeout'];

        function CargaDirectaController(AuthenticationFactory,$scope, GarantiasServices, NumberService,
                                                  $location, ngTableParams, $filter, $window,$uibModal,$timeout) {
            inSession($scope,AuthenticationFactory,$window);



            $scope.all_columns = [];
            $scope.columns = [];
            $scope.digital = [];
            $scope.digitalu = [];
            $scope.numero = [];
            $scope.fields=[{},{}];

            $scope.openModal = function () {
                var modalInstance = $uibModal.open({
                        templateUrl: 'assets/app/entities/garantias/carga-directa/view/seleccionar-regional-carga-directa.html',
                        controller: 'SeleccionarRegionalCargaDirectaController',
                        scope: $scope,
                        size: 'lg'
                    }
                );

            };
            $scope.confirmarPlanillaModal = function () {
                var modalInstance2 = $uibModal.open({
                        templateUrl: 'assets/app/entities/garantias/carga-directa/view/carga-directa-confirmar-recepcion.html',
                        controller: 'ConfirmarCargaDirectaController',
                        scope: $scope,
                        size: 'lg'
                    }
                );

            };
            $scope.createNewUser = function () {
                $location.path('/user-list');
            };
            $scope.reset = function () {
                $scope.digital.selected = {};
            };
            $scope.removeRow = function (index) {
                $scope.digital.splice(index, 1);
                construirTabla($scope, $scope.digital, ngTableParams, $filter);
            };
            $scope.addRow = function () {
                $scope.inserted = {
                    id: $scope.digital.length + 1
                };
                $scope.digital.push($scope.inserted);
            };

            $scope.addColumn = function (title) {
                $scope.inserted = {
                    title: title,
                    checked: true,
                    type: "string",
                    columnName: title
                };

                $scope.all_columns.push($scope.inserted);
            };

            $scope.getTemplate = function (idx) {

                if ($scope.digital.selected) {
                    if (idx == $scope.digital.selectedIndex) return 'edit';
                    else return 'display';
                }
                else return 'display';
            };

            $scope.editRow = function (idx) {
                $scope.digital.selectedIndex=idx;
                $scope.digital.selected = angular.copy($scope.digital[idx]);
            };

            $scope.saveRow = function (idx) {
                $scope.digital[idx] = angular.copy($scope.digital.selected);
                $scope.digital.selectedIndex=-1;
                $scope.getTemplate(idx);
            };
            $scope.ingreso={};
            $scope.setIngreso=function(ingreso){
                    $scope.ingreso=ingreso;
            }

            $scope.newProperties=[];
            $scope.setNewProperties=function(newProperties){
                $scope.newProperties=newProperties;
            }
            $scope.createPlanilla = function (code,ingreso) {
                    $scope.numero=[];
                    $scope.numero[0]={};
                    $scope.numero[0].number=code;
                    $scope.ingreso.numero=code;
                    changeColumnName($scope, $scope.all_columns);
                    for(var i=0;i<$scope.digital.length;i++){
                        $scope.digital[i].ingreso=$scope.ingreso;
                        $scope.digital[i].ingreso.cargaMasiva=true;
                        for(var j=0;j<$scope.newProperties.length;j++){
                            $scope.digital[i][$scope.newProperties[j].name]=$scope.newProperties[j].value;
                        }
                        var listVacio=[];
                        concatStageRow("completitud",$scope.digital[i],listVacio,listVacio);
                        concatStageRow("idoneidad",$scope.digital[i],listVacio,listVacio);
                        concatStageRow("datos",$scope.digital[i],listVacio,listVacio);
                    }

                    var promise = GarantiasServices.create($scope.digital);

                    var message="REGISTRO REALIZADO CON EL ACUSE " + $scope.numero[0].number;
                    handleSubmitServicePromise(promise,message);

                    $scope.numero = [];
                    $scope.digital = [];
                    $scope.all_columns = [];
            };

            $scope.showContent = function ($fileContent) {

                var jsontext = $fileContent.split(/\r\n|\n/);
                var jsonObject=txtToJson(jsontext, $scope);

                $scope.digital = jsonObject;
            };

            $scope.export = function ($event, fileName) {
                $scope.helper.csv.generate($event, "report.csv");
                $location.href = $scope.helper.csv.link();
            };


            $scope.$watch('all_columns', function () {
                update_columns($scope);
            }, true);

            $scope.$watch('fields',function(){

            });
            //$scope.openModal();

        }


        function concatNumber($scope) {
            for (var i = 0; i < $scope.digital.length; i++) {
                $scope.digital[i].acuse = $scope.numero[0].number;

            }
        };



        function getChange(value, listColumns) {
            for (var i = 0; i < listColumns.length; i++) {

                if (listColumns[i].title == value) {
                    if (listColumns[i].columnName == undefined) {
                        alert("Existe un valor sin equivalente");
                        throw("Existe un valor sin equivalente");
                        return "NOK";
                    }
                    return listColumns[i].columnName;
                }
            }
            return value;
        };
        function changeColumnName($scope, listColumns) {
            var newDigital=[];
            for (var i = 0; i < $scope.digital.length; i++) {
                var row={};
                for (var e in $scope.digital[i]) {
                    var newColumnName = getChange(e, listColumns);
                    if (!row[newColumnName]) {
                        row[newColumnName] = $scope.digital[i][e];
                    } else {
                        alert("Columna " + newColumnName + " repetida");
                        throw ("Columna " + newColumnName + " repetida");
                    }

                }
                newDigital.push(row);
            }
            $scope.digital = newDigital;
        };
        function construirTabla($scope, digital, ngTableParams, $filter) {
            $scope.data = digital;
            $scope.tablaGarantias = new ngTableParams({
                page: 1,
                count: 2000,
                sorting: {firstname: 'asc'}
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
    })();
