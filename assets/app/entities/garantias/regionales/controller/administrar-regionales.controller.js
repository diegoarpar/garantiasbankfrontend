
(function () {
        'use strict';
        angular.module("wpc")
            .controller('ConfiguracionRegionalController', ConfiguracionRegionalController);

        ConfiguracionRegionalController.$inject =
            ['$scope','AuthenticationFactory','ShareService', 'GarantiasServices', 'NumberService', 'CamposGenericosServices',
                'CamposEspecificosServices','CamposParametricosServices', '$location', 'ngTableParams', '$filter', '$window','$controller','$sessionStorage','$uibModal'];

        function ConfiguracionRegionalController($scope,AuthenticationFactory,ShareService, GarantiasServices, NumberService, CamposGenericosServices,
                                 CamposEspecificosServices,CamposParametricosServices, $location, ngTableParams, $filter, $window,$controller,$sessionStorage,$uibModal) {


         inSession($scope,AuthenticationFactory,$window);

         var datafondo=CamposParametricosServices.show({nombreparametrica:'fondo',tenant:window.sessionStorage.getItem("tenant")});
            datafondo.$promise.then(function(data){
                for(var i=0;i<data.length;i++){
                    delete (data[i]._id);
                }
            });
        $scope.data=datafondo;

            $scope.showModal = false;
                $scope.openModal = function (context) {
                $scope.actualVariable=context.$modelValue;
                //ShareService.setContxt(context);
                    var modalInstance = $uibModal.open({
                            templateUrl: 'assets/app/entities/garantias/regionales/view/crear-regional.html',
                            controller: 'CrearRegionalController',
                            scope: $scope,
                            size: 'lg'
                        }
                    );
                }

              $scope.saveChanges = function (scope) {
                            var o = [];
                            o.push(scope.$modelValue);
                            GarantiasServices.createRegional(o);
                           };
              $scope.retrive = function (context) {

                                $scope.actualVariable=context.$modelValue;
                                if($scope.actualVariable.nodes==undefined){
                                                                    $scope.actualVariable.nodes=[];
                                                                }
                                var promise =GarantiasServices.showregional({nombreparametrica: $scope.actualVariable.nombreparametrica,key: $scope.actualVariable.key});
                                promise.$promise.then(function (data){
                                    if(data.length>0){
                                        if(data[0].nodes!=undefined){
                                            $scope.actualVariable.nodes=JSON.parse(data[0].nodes);
                                        }
                                    }

                                });

                             };
             $scope.remove = function (scope) {
                scope.remove();
              };

              $scope.toggle = function (scope) {
                scope.toggle();
              };

              $scope.moveLastToTheBeginning = function () {
                var a = $scope.data.pop();
                $scope.data.splice(0, 0, a);
              };

              $scope.newSubItem = function (scope) {
                var nodeData = scope.$modelValue;
                if(nodeData.nodes==undefined){nodeData.nodes=[]}
                nodeData.nodes.push({
                  id: nodeData.id * 10 + nodeData.nodes.length,
                  title: nodeData.title + '.' + (nodeData.nodes.length + 1),
                  nodes: []
                });
              };

              $scope.collapseAll = function () {
                $scope.$broadcast('angular-ui-tree:collapse-all');
              };

              $scope.expandAll = function () {
                $scope.$broadcast('angular-ui-tree:expand-all');
              };

        }
    })();
