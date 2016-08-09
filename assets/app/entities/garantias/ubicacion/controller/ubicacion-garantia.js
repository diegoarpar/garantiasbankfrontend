/**
 * Created by joag on 9/06/16.
 */
(function () {
        'use strict';
        angular.module("wpc")
            .controller('UbicacionGarantiasController', UbicacionGarantiasController);

        UbicacionGarantiasController.$inject =
            ['$scope', 'GarantiasServices', 'NumberService', 'CamposGenericosServices',
                'CamposEspecificosServices', '$location', 'ngTableParams', '$filter', '$window'];

        function UbicacionGarantiasController($scope, GarantiasServices, NumberService, CamposGenericosServices,
                                              CamposEspecificosServices, $location, ngTableParams, $filter, $window) {
            $scope.all_columns = [];
            $scope.columns = [];
            $scope.digital = [];
            $scope.digitalu = [];
            $scope.numero = [];
            $scope.showmodal = false;
            $scope.fields = CamposGenericosServices.show({fieldType: "datos", garantiaType: "-1"});
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

            $scope.getTemplate = function (c) {
                if ($scope.digital.selected) {
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

            $scope.catchGarantias = function () {
                $scope.mapColumns = [];
                $scope.columns = [];
                $scope.all_columns = [];
                $scope.digital = GarantiasServices.show({
                    tula: $scope.tula,
                    enviadoTula: "true",
                    garantiaRecibida: "true",
                    validaciondatos: "false"
                });
                $scope.digital.$promise.then(function (data) {
                    $scope.digital = data;
                    fillColumns(data, $scope);

                });
            };

            $scope.saveCompleteInfoRow = function () {
                completeRowDetail($scope);
                concatGontenido($scope);
                GarantiasServices.update($scope.digitalu);
                $scope.digital = [];
                $scope.digitalu = [];
                $scope.showmodal = false;
            };

            $scope.completeInfo = function (idx, c) {
                $scope.showmodal = true;
                $scope.selectedRow = c;
                $scope.selectedRowIndex = idx;
                $scope.rowDetails = [];
                $scope.rowDetail = [];
                datosFillComplementarios($scope, $scope.selectedRow.tipogarantia, CamposEspecificosServices);
                for (var key in c) {
                    if (!$scope.rowDetails[key] && key.indexOf("$") === -1 && key !== "toJSON") {
                        $scope.rowDetails[key] = key;
                        $scope.rowDetail.push({key: key, value: c[key]});
                    }
                }

            };
            function datosFillComplementarios($scope, gt, service) {
                $scope.datoscomplementariosgenericos = [];
                $scope.datoscomplementariosgenericosTemp = service.show({fieldType: "datos", garantiaType: "-1"});
                $scope.datoscomplementariosgenericosTemp.$promise.then(function (data) {
                    for (var i = 0; i < data.length; i++) {
                        if (!$scope.rowDetails[data[i].key]) {
                            data[i].value = "";
                            $scope.datoscomplementariosgenericos.push(data[i]);
                        }
                    }
                });
                //$scope.datoscomplementariosgenericos=service.show({fieldType:"datos",garantiaType:"-1"});
                $scope.datoscomplementariosespecificos = service.show({fieldType: "datos", garantiaType: gt});

            }

            $scope.showContent = function ($fileContent) {
                var jsontext = $fileContent.split('\n');
                jsontext = txtToJson(jsontext, $scope);
                $scope.digital = JSON.parse(jsontext);
            };

            $scope.export = function ($event, fileName) {
                $scope.helper.csv.generate($event, "report.csv");
                $location.href = $scope.helper.csv.link();
            };


            $scope.$watch('all_columns', function () {
                update_columns($scope);
            }, true);


        }


        function concatGontenido($scope) {
            var cont = 0;
            $scope.selectedRow.fechavalidaciondatos = new Date();
            $scope.selectedRow.validaciondatos = true;
            $scope.digitalu[cont] = $scope.selectedRow;
            $scope.selectedRow = {};

        }

        function completeRowDetail($scope) {
            for (var i = 0; i < $scope.datoscomplementariosespecificos.length; i++)
                $scope.selectedRow[$scope.datoscomplementariosespecificos[i].key] = $scope.datoscomplementariosespecificos[i].value;
            for (var i = 0; i < $scope.datoscomplementariosgenericos.length; i++)
                $scope.selectedRow[$scope.datoscomplementariosgenericos[i].key] = $scope.datoscomplementariosgenericos[i].value;

        }

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
