/**
 * Created by joag on 9/06/16.
 */
(function () {
        'use strict';
        angular.module("wpc")
            .controller('DatosController', DatosController);

        DatosController.$inject =
            ['AuthenticationFactory','$scope', 'GarantiasServices', 'NumberService', 'CamposGenericosServices',
                'CamposEspecificosServices', '$location', 'ngTableParams', '$filter', '$window','$uibModal'];

        function DatosController(AuthenticationFactory,$scope, GarantiasServices, NumberService, CamposGenericosServices,
                                 CamposEspecificosServices, $location, ngTableParams, $filter, $window,$uibModal) {
            inSession($scope,AuthenticationFactory,$window);
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
            $scope.aditionalFilter={
                                 "ingreso.enviadoTula": true,
                                 "envio.recibido": true,
                                 "validaciones.completitud": true,
                                 "validaciones.idoneidad": true,
                                 "validaciones.datos": null
                             };
            $scope.setResultSearch = function (promise) {
               $scope.mapColumns = [];
               $scope.columns = [];
               $scope.all_columns = [];
               $scope.digital=[];
               promise.$promise.then(function (data) {
                   showWaiteImage(true);
                   if(data!=null){
                       $scope.digital = data;
                       fillColumns(data, $scope);
                   }
                   showWaiteImage(false);

               });
            };
             $scope.openModalFiltro = function () {
                var modalInstance = $uibModal.open({
                        templateUrl: 'assets/app/entities/modal/filtro/view/filtro-busqueda.html',
                        controller: 'FiltrarBusquedaController',
                        scope: $scope,
                        size: 'lg'
                    }
                );
            }
             $scope.cleanDigital=function(){$scope.digital=[];};
            $scope.saveCompleteInfoRow = function () {
                completeRowDetail($scope);
                concatGontenido($scope);
                var promise=GarantiasServices.update($scope.digitalu);
                handleSubmitServicePromise(promise,null);
                $scope.digital = [];
                $scope.digitalu = [];
                $scope.showmodal = false;
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

            $scope.openModal = function (idx,object) {
                $scope.rowDetail=object;
                var modalInstance = $uibModal.open({
                        templateUrl: 'assets/app/entities/garantias/datos/view/verificar-datos-expediente.html',
                        controller: 'VerificarDatosExpedienteController',
                        scope: $scope,
                        size: 'lg'
                    }
                );
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
