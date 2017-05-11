/**
 * Created by joag on 9/06/16.
 */
(function () {
        'use strict';
        angular.module("wpc")
            .controller('AlistamientoTulaController', AlistamientoTulaController);

        AlistamientoTulaController.$inject =
            ['AuthenticationFactory','$scope', 'GarantiasServices', 'NumberService', 'CamposGenericosServices',
                'CamposParametricosServices', '$location', 'ngTableParams', '$filter', '$window','$uibModal'];

        function AlistamientoTulaController(AuthenticationFactory,$scope, GarantiasServices, NumberService, CamposGenericosServices,
                                            CamposParametricosServices, $location, ngTableParams, $filter, $window,$uibModal) {
            inSession($scope,AuthenticationFactory,$window);
            $scope.all_columns = [];
            $scope.columns = [];
            $scope.digital = [];
            $scope.digitalu = [];
            $scope.dataTable = [];
            $scope.numero = [];
            $scope.regionales = CamposParametricosServices.show({nombreparametrica: "origen"});
            $scope.regional={};
            $scope.tablaGarantias=construirTabla( $scope, $scope.digital,ngTableParams,$filter);

            $scope.setRegional = function (data) {
                $scope.regional=JSON.parse( data);
            }
            $scope.openModal = function () {
                var modalInstance = $uibModal.open({
                        templateUrl: 'assets/app/entities/garantias/alistamiento-tula/view/seleccionar-regional-Alistamiento.html',
                        controller: 'SeleccionarRegionalAlistamientoController',
                        scope: $scope,
                        size: 'lg'
                    }
                );
                var promise=modalInstance.closed;
                    promise.then(function (data){

                    });

            };
            $scope.openModalMedioEnvio = function () {
                var modalInstance = $uibModal.open({
                        templateUrl: 'assets/app/entities/garantias/alistamiento-tula/view/medio-envio-tula.html',
                        controller: 'SeleccionarMedioEnvioController',
                        scope: $scope,
                        size: 'lg'
                    }
                );
                var promise=modalInstance.closed;
                    promise.then(function (data){

                    });

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

            $scope.loadPlanillaToTula = function (consulta) {
                $scope.mapColumns = [];
                $scope.columns = [];
                $scope.all_columns = [];
                var parameters=[];
                parameters[0]=consulta;
                $scope.digital = GarantiasServices.showPost(parameters);
                showWaiteImage(true);
                $scope.digital.$promise.then(function (data) {
                    $scope.digital = data;
                    fillColumns(data, $scope);
                    generateColumns($scope.all_columns,$scope);

                    $scope.tablaGarantias=construirTabla($scope,  $scope.digital,ngTableParams,$filter);
                    showWaiteImage(false);
                });
            };
            $scope.mark_all=function(){
                for(var i=0;i<$scope.data.length;i++){
                    $scope.data[i].enviadoTula=(!$scope.data[i].enviadoTula);
                }

            }
            $scope.newProperties=[];
            $scope.setNewProperties=function(newProperties){
                $scope.newProperties=newProperties;
            }
            $scope.ingreso={};
            $scope.setIngreso=function(ingreso){
                    $scope.ingreso=ingreso;
            }
            $scope.sendTula = function (envio) {
                var documentosEnviados=[];

                for(var i=0;i<$scope.digital.length;i++){
                    if($scope.digital[i].enviadoTula){
                        delete $scope.digital[i].enviadoTula;
                        $scope.digital[i].envio=envio;
                        $scope.digital[i].ingreso.enviadoTula=true;
                        documentosEnviados.push($scope.digital[i]);
                        for(var j=0;j<$scope.newProperties.length;j++){
                            $scope.digital[i].envio[$scope.newProperties[j].name]=$scope.newProperties[j].value;
                        }
                    }

                }
                var promise =GarantiasServices.update(documentosEnviados);
                handleSubmitServicePromise(promise,"REGISTRO REALIZADO CON EL ID " + envio.numero);
                $scope.digital = [];
                $scope.tablaGarantias=construirTabla( $scope, $scope.digital,ngTableParams,$filter);

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


        function generateColumns(vector,$scope) {
            for(var i=0;i<vector.length;i++){
                if (vector[i].title != '_id'&&vector[i].title!= 'ingreso') {
                    $scope.all_columns[i].checked = true;
                }
                else {
                $scope.all_columns[i].checked = false;
                    $scope.all_columns.slice(i,1);
                }
            }

        }


    })();
