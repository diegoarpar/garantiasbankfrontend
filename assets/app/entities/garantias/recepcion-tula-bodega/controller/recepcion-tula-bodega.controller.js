/**
 * Created by joag on 9/06/16.
 */
(function () {
        'use strict';
        angular.module("wpc")
            .controller('RecepcionTulaBodegaController', RecepcionTulaBodegaController);

        RecepcionTulaBodegaController.$inject =
            ['AuthenticationFactory','$scope', 'GarantiasServices', 'NumberService', 'CamposGenericosServices',
                'GarantiasServiceUpdateGarantias', '$location', 'ngTableParams', '$filter', '$window'];

        function RecepcionTulaBodegaController(AuthenticationFactory,$scope, GarantiasServices, NumberService, CamposGenericosServices,
                                               GarantiasServiceUpdateGarantias, $location, ngTableParams, $filter, $window) {
            inSession($scope,AuthenticationFactory,$window);
            $scope.all_columns = [];
            $scope.columns = [];
            $scope.digital = [];
            $scope.digitalu = [];
            $scope.numero = [];
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

            $scope.checkInTula = function () {
                concatGarantia($scope);
                GarantiasServices.update($scope.digitalu);
                $scope.digital = [];
                $scope.digitalu = [];
            };
            $scope.catchTula = function () {
                $scope.mapColumns = [];
                $scope.columns = [];
                $scope.all_columns = [];
                $scope.digital = GarantiasServices.show({
                    tula: $scope.tula,
                    enviadoTula: "true",
                    idtula: $scope.idtula,
                    garantiaRecibida: "null"
                });
                $scope.digital.$promise.then(function (data) {
                    $scope.digital = data;
                    fillColumns(data, $scope);

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


        function concatGarantia($scope) {
            var cont = 0;
            for (var i = 0; i < $scope.digital.length; i++) {
                if ($scope.digital[i].garantiaRecibida) {
                    $scope.digital[i].fechaRecepcionGarantia = new Date();
                    $scope.digital[i].validacionidoneidad = "false";
                    $scope.digital[i].validacioncompletitud = "false";
                    $scope.digital[i].validaciondatos = "false";
                    $scope.digitalu[cont] = ($scope.digital[i]);

                    cont++;
                }
            }
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
