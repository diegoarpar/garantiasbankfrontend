/**
 * Created by joag on 9/06/16.
 */
(function () {
        'use strict';
        angular.module("wpc")
            .controller('AlistamientoTulaController', AlistamientoTulaController);

        AlistamientoTulaController.$inject =
            ['$scope', 'GarantiasServices', 'NumberService', 'CamposGenericosServices',
                'CamposParametricosServices', '$location', 'ngTableParams', '$filter', '$window'];

        function AlistamientoTulaController($scope, GarantiasServices, NumberService, CamposGenericosServices,
                                            CamposParametricosServices, $location, ngTableParams, $filter, $window) {
            $scope.all_columns = [];
            $scope.columns = [];
            $scope.digital = [];
            $scope.digitalu = [];
            $scope.numero = [];
            $scope.regionales = CamposParametricosServices.show({nombreparametrica: "regional"});
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

            $scope.loadPlanillaToTula = function () {
                $scope.mapColumns = [];
                $scope.columns = [];
                $scope.all_columns = [];
                $scope.digital = GarantiasServices.show({
                    regional: $scope.regional,
                    oficina: $scope.oficina,
                    enviadoTula: "null"
                });
                $scope.digital.$promise.then(function (data) {
                    $scope.digital = data;
                    fillColumns(data, $scope);

                });
            };
            $scope.sendTula = function () {
                $scope.numero = NumberService.getNumber('');
                $scope.numero.$promise.then(function (data) {
                    $scope.idtula = data;
                    concatTula($scope);
                    GarantiasServices.update($scope.digitalu);
                    alert("REGISTRO REALIZADO CON EL ID " + $scope.numero[0].number);
                    generateBarCodePDF($scope.numero[0].number, document, "Número Id Tula");
                    $scope.digital = [];
                    $scope.digitalu = [];

                });
            };
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


        function concatTula($scope) {
            var cont = 0;
            for (var i = 0; i < $scope.digital.length; i++) {
                if ($scope.digital[i].enviadoTula) {
                    $scope.digital[i].idtula = $scope.idtula[0].number;
                    $scope.digital[i].tula = $scope.tula;
                    $scope.digital[i].fechaEnvioTula = new Date();
                    $scope.digitalu[cont] = ($scope.digital[i]);
                    cont++;
                }
            }
        }

        function generateColumns(vector) {
            $scope.allColumns = {};
            angular.forEach(vector, function (object, key) {
                angular.forEach(object, function (object2, key2) {
                    if (key2 != '_id') {
                        $scope.allColumns[key2] = true;
                    }
                    else {
                        $scope.allColumns[key2] = false;
                    }
                })
            })
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
