
(function () {
        'use strict';
        angular.module("wpc")
            .controller('ConfiguracionArchivoController', ConfiguracionArchivoController);

        ConfiguracionArchivoController.$inject =
            ['$scope','AuthenticationFactory', 'GarantiasServices', 'NumberService', 'CamposGenericosServices',
                'CamposEspecificosServices','CamposParametricosServices', '$location', 'ngTableParams', '$filter', '$window','$controller','$sessionStorage','$uibModal'];

        function ConfiguracionArchivoController($scope,AuthenticationFactory, GarantiasServices, NumberService, CamposGenericosServices,
                                 CamposEspecificosServices,CamposParametricosServices, $location, ngTableParams, $filter, $window,$controller,$sessionStorage,$uibModal) {


         inSession($scope,AuthenticationFactory,$window);

         var datafondo=CamposParametricosServices.show({nombreparametrica:'fondo',tenant:window.sessionStorage.getItem("tenant")});
         var datasubfondo=CamposParametricosServices.show({nombreparametrica:'subfondo',tenant:window.sessionStorage.getItem("tenant")});
         var dataseccion=CamposParametricosServices.show({nombreparametrica:'seccion',tenant:window.sessionStorage.getItem("tenant")});
         var datasubseccion=CamposParametricosServices.show({nombreparametrica:'subseccion',tenant:window.sessionStorage.getItem("tenant")});
         var dataserie=CamposParametricosServices.show({nombreparametrica:'serie',tenant:window.sessionStorage.getItem("tenant")});
         var datasubserie=CamposParametricosServices.show({nombreparametrica:'subserie',tenant:window.sessionStorage.getItem("tenant")});
         var datatipodocumento=CamposParametricosServices.show({nombreparametrica:'tipodocumento',tenant:window.sessionStorage.getItem("tenant")});

        $scope.trd={};
        $scope.trd.tipodocumento={};
        $scope.actualsTrds=[];
        $scope.select = function (data, context){

             if(data.nombreparametrica!="tipodocumento"){
                $scope.trd[data.nombreparametrica]=data;
             }else{
                if($scope.trd.tipodocumento[data.key]==null){
                    $scope.trd.tipodocumento[data.key]=data;
                }else{
                    delete $scope.trd.tipodocumento[data.key];

                }
             }

        };

         $scope.getValue = function (data, propertie,key){
             try{
                if(key!='tipodocumento'){
                    var json=JSON.parse(data);
                    return json[propertie];
                }else{
                var rta="";
                var json=JSON.parse(data);
                   for(var p in json){
                     rta +=json[p][propertie]+" ";
                   }
                   return rta;
                }
             }catch(exc){
                return "-";
             }
        };
        $scope.actualsTrds=GarantiasServices.showtrd();
        $scope.trdssubseries=[];
        $scope.actualsTrds.$promise.then(function(data){
            for(var i=0;i<data.length;i++){
                 var subserie=JSON.parse(data[i].subserie);
                     subserie.nodes=[];
                var td=JSON.parse(data[i].tipodocumento);
                var cont=0;
                for(var p in td){
                 var tipodocumento= td[p];
                    tipodocumento.nodes=[];
                     subserie.nodes[cont]=tipodocumento;
                     cont++;
                }




                var serie=JSON.parse(data[i].serie);
                    serie.nodes=[];
                    serie.nodes[0]=subserie;
                var subfondo=JSON.parse(data[i].subfondo);
                    subfondo.nodes=[];
                    subfondo.nodes[0]=serie;
                var trd=JSON.parse(data[i].fondo);
                    trd.nodes=[];
                    trd.nodes[0]=subfondo;


                $scope.trdssubseries.push(trd)
            }
        });

        $scope.modal = this;

        $scope.modal.steps = [
                                {'id':1,data:datafondo, 'name':'Fondo',key:'fondo'},
                                {'id':2,data:datasubfondo,'name':'SubFondo',key:'subfondo'},
                                {'id':3,data:dataseccion,'name':'Sección',key:'seccion'},
                                {'id':4,data:datasubseccion,'name':'Subsección',key:'subseccion'},
                                {'id':5,data:dataserie,'name':'Serie',key:'serie'},
                                {'id':6,data:datasubserie,'name':'Subserie',key:'subserie'},
                                {'id':7,data:datatipodocumento,'name':'tiposdocumentales',key:'tipodocumento'}
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
                return $scope.modal.isCurrentStep(step)?"btn green ":"btn";
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
                var trds=[];
                trds.push($scope.trd);
                var create = GarantiasServices.createtrd(trds);
                create.$promise.then(function (data) {
                                         $scope.actualsTrds=GarantiasServices.showtrd();
                                      });
                $scope.trd={};
                $scope.actualsTrds=[];

            } else {
               $scope.modal.step += 1;
            }
        };

        $scope.showModal = false;
                        $scope.openModal = function (context) {
                        $scope.actualVariable=context.$modelValue;
                            var modalInstance = $uibModal.open({
                                    templateUrl: 'assets/app/entities/garantias/trd/view/crear-metadatos.html',
                                    controller: 'CrearMetadatosController',
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
