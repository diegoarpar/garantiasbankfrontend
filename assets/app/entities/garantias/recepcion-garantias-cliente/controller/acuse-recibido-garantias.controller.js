/**
 * Created by joag on 9/06/16.
 */
(function () {
        'use strict';
        angular.module("wpc")
            .controller('AcuseRecibidoGarantiasController', AcuseRecibidoGarantiasController);

        AcuseRecibidoGarantiasController.$inject =
            ['AuthenticationFactory','$scope', 'GarantiasServices', 'NumberService',
                 '$location', 'ngTableParams', '$filter', '$window','$uibModal','$timeout'];

        function AcuseRecibidoGarantiasController(AuthenticationFactory,$scope, GarantiasServices, NumberService,
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
                        templateUrl: 'assets/app/entities/garantias/recepcion-garantias-cliente/view/seleccionar-regional-recepcion.html',
                        controller: 'SeleccionarRegionalController',
                        scope: $scope,
                        size: 'lg'
                    }
                );

            };
            $scope.confirmarPlanillaModal = function () {
                var modalInstance2 = $uibModal.open({
                        templateUrl: 'assets/app/entities/garantias/recepcion-garantias-cliente/view/confirmar-recepcion.html',
                        controller: 'ConfirmarRecepcionController',
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
                        for(var j=0;j<$scope.newProperties.length;j++){
                            $scope.digital[i][$scope.newProperties[j].name]=$scope.newProperties[j].value;
                        }
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
                    if (listColumns[i].columnName == undefined&&listColumns[i].checked) {
                        alert("Existe un valor sin equivalente");
                        throw("Existe un valor sin equivalente");
                        return "NOK";
                    }
                    return listColumns[i].columnName;
                }
            }
            return undefined;
        };
        function getIndex(value, listColumns) {
            for (var i = 0; i < listColumns.length; i++) {
                if (listColumns[i].title == value&&listColumns[i].checked) {
                    return i;
                }
            }
            return undefined;
        };
        function changeColumnName($scope, listColumns) {
            var newDigital=[];
            for (var i = 0; i < $scope.digital.length; i++) {
                var row={};
                for (var e in $scope.digital[i]) {
                    var newColumnName = getChange(e, listColumns);

                        var indexOldValue=getIndex(e,listColumns);
                    if(indexOldValue!=undefined&&indexOldValue!=null){
                        if (!row[newColumnName]&&newColumnName!=undefined&&listColumns[indexOldValue].checked) {
                            row[newColumnName] = $scope.digital[i][e];
                        } else if (newColumnName!=undefined&&listColumns[indexOldValue].checked) {
                            alert("Columna " + newColumnName + " repetida");
                            throw ("Columna " + newColumnName + " repetida");
                        }
                    }

                }
                newDigital.push(row);
            }
            $scope.digital = newDigital;
        };

    })();
