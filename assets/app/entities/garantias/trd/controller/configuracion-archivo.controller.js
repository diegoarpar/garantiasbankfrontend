
(function () {
        'use strict';
        angular.module("wpc")
            .controller('ConfiguracionArchivoController', ConfiguracionArchivoController);

        ConfiguracionArchivoController.$inject =
            ['$scope','AuthenticationFactory', 'GarantiasServices', 'NumberService', 'CamposGenericosServices',
                'CamposEspecificosServices','CamposParametricosServices', '$location', 'ngTableParams', '$filter', '$window','$controller','$sessionStorage'];

        function ConfiguracionArchivoController($scope,AuthenticationFactory, GarantiasServices, NumberService, CamposGenericosServices,
                                 CamposEspecificosServices,CamposParametricosServices, $location, ngTableParams, $filter, $window,ngMaterial,$controller,$sessionStorage) {


            inSession($scope,AuthenticationFactory,$window);

         var datafondo=CamposParametricosServices.show({nombreparametrica:'fondo',tenant:window.sessionStorage.getItem("tenant")});
         var datasubfondo=CamposParametricosServices.show({nombreparametrica:'subfondo',tenant:window.sessionStorage.getItem("tenant")});
         var dataseccion=CamposParametricosServices.show({nombreparametrica:'seccion',tenant:window.sessionStorage.getItem("tenant")});
         var datasubseccion=CamposParametricosServices.show({nombreparametrica:'subseccion',tenant:window.sessionStorage.getItem("tenant")});
         var dataserie=CamposParametricosServices.show({nombreparametrica:'serie',tenant:window.sessionStorage.getItem("tenant")});
         var datasubserie=CamposParametricosServices.show({nombreparametrica:'subserie',tenant:window.sessionStorage.getItem("tenant")});
         var datatipodocumento=CamposParametricosServices.show({nombreparametrica:'tipodocumento',tenant:window.sessionStorage.getItem("tenant")});

        $scope.trd={};
        $scope.select = function (data){
             $scope.trd[data.nombreparametrica]=data;
        };




        $scope.modal = this;

        $scope.modal.steps = [
                                {'id':1,data:datafondo, 'name':'Fondo'},
                                {'id':2,data:datasubfondo,'name':'SubFondo'},
                                {'id':3,data:dataseccion,'name':'Sección'},
                                {'id':4,data:datasubseccion,'name':'Subsección'},
                                {'id':5,data:dataserie,'name':'Serie'},
                                {'id':6,data:datasubserie,'name':'Subserie'},
                                {'id':7,data:datatipodocumento,'name':'tiposdocumentales'}
                                ];
        $scope.modal.step = $scope.modal.steps[0].id;
        $scope.modal.wizard = {tacos: 2};

       $scope.modal.isFirstStep = function () {
            return ($scope.modal.step ) === ($scope.modal.steps[0].id );
        };

        $scope.modal.isLastStep = function () {
            return $scope.modal.step === ($scope.modal.steps[$scope.modal.steps.length-1].id );
        };
        $scope.modal.getClass = function (step) {
                return $scope.modal.isCurrentStep(step)?"btn green":"btn";
            };

        $scope.modal.isCurrentStep = function (step) {
            return $scope.modal.step === step;
        };

       $scope.modal.setCurrentStep = function (step) {
            $scope.modal.step = step;
        };

        $scope.modal.getCurrentStep = function () {
            return $scope.modal.steps[$scope.modal.step];
        };

        $scope.modal.getNextLabel = function () {
            return ($scope.modal.isLastStep()) ? 'Confirmar' : 'Siguiente';
        };

        $scope.modal.handlePrevious = function () {
            $scope.modal.step -= ($scope.modal.isFirstStep()) ? 0 : 1;
        };

        $scope.modal.handleNext = function () {
            if ($scope.modal.isLastStep()) {
                alert('GUARDADO');
            } else {
               $scope.modal.step += 1;
            }
        };
        }
    })();
