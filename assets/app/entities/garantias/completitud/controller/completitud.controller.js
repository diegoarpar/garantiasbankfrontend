/**
 * Created by joag on 9/06/16.
 */
(function () {
        'use strict';
        angular.module("wpc")
            .controller('CompletitudController', CompletitudController);

        CompletitudController.$inject =
            ['AuthenticationFactory','$scope', 'GarantiasServices', 'NumberService', 'CamposGenericosServices',
                'CamposEspecificosServices', '$location', 'ngTableParams', '$filter', '$window','$uibModal'];

        function CompletitudController(AuthenticationFactory,$scope, GarantiasServices, NumberService, CamposGenericosServices,
                                       CamposEspecificosServices, $location, ngTableParams, $filter, $window,$uibModal) {
            inSession($scope,AuthenticationFactory,$window);
            $scope.all_columns = [];
            $scope.columns = [];
            $scope.digital = [];
            $scope.digitalu = [];
            $scope.numero = [];
            $scope.showmodal = false;
            $scope.fields = CamposGenericosServices.show({fieldType: "datos", garantiaType: "-1"});
            $scope.visibility=new Map();
            $scope.validate=function(permission,field){
                        validateFields($scope,AuthenticationFactory,'COMPLETITUD',$window,document,permission,field);
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
            $scope.mark_all=function(){
                var actualValue=null;
                for(var i=0;i<$scope.digital.length;i++){
                    if(actualValue==null){
                        actualValue=$scope.digital[i].selected;
                        if(!actualValue){
                            actualValue=true;
                        }else{
                            actualValue=false;
                        }
                    }
                    $scope.digital[i].selected=actualValue;
                }
            };
            $scope.aditionalFilter={
                                   "ingreso.enviadoTula": true,
                                   "envio.recibido": true,
                                   "validaciones": null
                               };

            $scope.setResultSearch = function (promise) {

                showWaiteImage(true);
                $scope.mapColumns = [];
                $scope.columns = [];
                $scope.all_columns = [];
                $scope.digital=[];
                promise.$promise.then(function (data){
                    if(data!=null){
                        $scope.digital = data;
                        fillColumns(data, $scope);
                        //$scope.tablaGarantias=construirTabla($scope, $scope.digital,ngTableParams,$filter);
                    }
                });
                showWaiteImage(false);

            };


            $scope.cleanDigital=function(){$scope.digital=[];};

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
                $scope.masivo=false;
                $scope.rowDetail=object;
                delete $scope.rowDetail["selected"];
                var modalInstance = $uibModal.open({
                        templateUrl: 'assets/app/entities/garantias/completitud/view/verificar-completitud-expediente.html',
                        controller: 'VerificarCompletitudExpedienteController',
                        scope: $scope,
                        size: 'lg'
                    }
                );
            }

            $scope.openModalFiltroMasivo = function () {
               $scope.completitudMasivo=[];
                for(var i=0;i<$scope.digital.length;i++){
                    if($scope.digital[i].selected){
                        var object=JSON.parse(JSON.stringify($scope.digital[i]));
                        delete object["selected"];
                        $scope.completitudMasivo.push(object);
                    }

                }

                if($scope.completitudMasivo.length==0)return;
                $scope.masivo=true;
                $scope.rowDetail=object;
                var modalInstance = $uibModal.open({
                        templateUrl: 'assets/app/entities/garantias/completitud/view/verificar-completitud-expediente.html',
                        controller: 'VerificarCompletitudExpedienteController',
                        scope: $scope,
                        size: 'lg'
                    }
                );
            }

            $scope.openModalFiltro = function () {

                            var modalInstance = $uibModal.open({
                                    templateUrl: 'assets/app/entities/modal/filtro/view/filtro-busqueda.html',
                                    controller: 'FiltrarBusquedaController',
                                    scope: $scope,
                                    size: 'lg'
                                }
                            );
                        }
        }









    })();
