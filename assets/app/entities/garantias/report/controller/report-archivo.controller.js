
(function () {
        'use strict';
        angular.module("wpc")
            .controller('ReporteArchivoController', ReporteArchivoController);

        ReporteArchivoController.$inject =
            ['$scope','AuthenticationFactory', 'GarantiasServices', 'NumberService', 'CamposGenericosServices',
                'CamposEspecificosServices','CamposParametricosServices', '$location', 'ngTableParams', '$filter', '$window','$controller','$sessionStorage','$uibModal'];

        function ReporteArchivoController($scope,AuthenticationFactory, GarantiasServices, NumberService, CamposGenericosServices,
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
             data.metadata=[];
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
                    var json=data;
                    return json[propertie];
                }else{
                var rta="";
                var json=data;
                   for(var p in json){
                     rta +=json[p][propertie]+" ";
                   }
                   return rta;
                }
             }catch(exc){
                return "-";
             }
        };
        $scope.trdssubseries=[];
        $scope.actualsTrds=GarantiasServices.showtrd();
        $scope.getMetadata = function () {
             $scope.trdssubseries=[];
             var promise=GarantiasServices.showMetadata();
             promise.$promise.then(function(data){
                for(var i=0;i<data.length;i++){
                    var td=data[i].tipodocumento;
                    var tiposdocumentos=[];
                    for(var p in td){
                     var tipodocumento= td[p];
                         tipodocumento.nodes=[];
                         var metadata=tipodocumento.metadata;
                         if(metadata!=null){
                             for(var j=0;j<metadata.length;j++)
                                 tipodocumento.nodes.push(metadata[j]);
                         }
                         delete tipodocumento.metadata;
                         tiposdocumentos.push(tipodocumento);

                    }
                     var subserie=data[i].subserie;
                         subserie.nodes=[];
                         var metadata=subserie.metadata;
                         if(metadata!=null){
                             for(var j=0;j<metadata.length;j++)
                                 subserie.nodes.push(metadata[j]);
                         }
                         for(var j=0;j<tiposdocumentos.length;j++)
                            subserie.nodes.push(tiposdocumentos[j]);
                         delete subserie.metadata;
                    var serie=data[i].serie;
                        serie.nodes=[];
                        var metadata=serie.metadata;
                        if(metadata!=null){
                            for(var j=0;j<metadata.length;j++)
                                serie.nodes.push(metadata[j]);
                        }
                        serie.nodes.push(subserie);
                        delete serie.metadata;
                    var subseccion=data[i].subseccion;
                        subseccion.nodes=[];
                        var metadata=subseccion.metadata;
                        if(metadata!=null){
                            for(var j=0;j<metadata.length;j++)
                                subseccion.nodes.push(metadata[j]);
                        }
                        subseccion.nodes.push(serie);
                        delete subseccion.metadata;
                    var seccion=data[i].seccion;
                        seccion.nodes=[];
                        var metadata=seccion.metadata;
                        if(metadata!=null){
                            for(var j=0;j<metadata.length;j++)
                                seccion.nodes.push(metadata[j]);
                        }
                        seccion.nodes.push(subseccion);
                        delete seccion.metadata;
                    var subfondo=data[i].subfondo;
                        subfondo.nodes=[];
                        var metadata=subfondo.metadata;
                        if(metadata!=null){
                            for(var j=0;j<metadata.length;j++)
                                subfondo.nodes.push(metadata[j]);
                        }
                        subfondo.nodes.push(seccion);
                        delete subfondo.metadata;
                    var trd=data[i].fondo;
                        trd.nodes=[];
                        var metadata=trd.metadata;
                        if(metadata!=null){
                            for(var j=0;j<metadata.length;j++)
                                trd.nodes.push(metadata[j]);
                        }
                        trd.nodes.push(subfondo);
                        delete trd.metadata;

                    $scope.trdssubseries.push(trd);
                }
            });
        };

        //$scope.getMetadata();
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
                var metadata=[];
                trds.push($scope.trd);
                metadata.push($scope.trd);
                var create = GarantiasServices.createtrd(trds);

                GarantiasServices.createMetadata(metadata);
                create.$promise.then(function (data) {
                     $scope.actualsTrds=GarantiasServices.showtrd();
                     $scope.getMetadata();
                  });
                $scope.trd={};
                $scope.trd.tipodocumento={};
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
          $scope.getMetadatoFromNode=function(nodes){
            var metadatos=[];

            for(var i=0;i<nodes.length;i++){
                if(nodes[i].nombreparametrica=="metadato"){
                   metadatos[metadatos.length]=nodes[i];
               }
            }
            return metadatos;

          };
           $scope.getNodeName=function(name,node){
            var indexNode=0;
            for(var i=0;i<node.length;i++){
                if(node[i].nombreparametrica==name){
                    return i;
                }
            }
            return indexNode;
           }
          $scope.saveChanges = function (scope) {
                var trd=[];
                for(var i=0;i<$scope.trdssubseries.length;i++){
                    var subserie;
                    var serie;
                    var seccion;
                    var subseccion;
                    var subfondo;
                    var fondo;
                    var tipodocumento;

                    var indexSubfondo;
                    var indexNodeSeccion;
                    var indexNodeSubseccion;
                    var indexNodeSerie;
                    var indexNodeSubserie;
                    try{
                        indexSubfondo=$scope.getNodeName("subfondo",$scope.trdssubseries[i].nodes);
                    }catch(e){}
                    try{
                        indexNodeSeccion=$scope.getNodeName("seccion",$scope.trdssubseries[i].nodes[indexSubfondo].nodes);
                    }catch(e){}
                    try{
                        indexNodeSubseccion=$scope.getNodeName("subseccion",$scope.trdssubseries[i].nodes[indexSubfondo].nodes[indexNodeSeccion].nodes);
                    }catch(e){}
                    try{
                        indexNodeSerie=$scope.getNodeName("serie",$scope.trdssubseries[i].nodes[indexSubfondo].nodes[indexNodeSeccion].nodes[indexNodeSubseccion].nodes);
                    }catch(e){}
                    try{
                        indexNodeSubserie=$scope.getNodeName("subserie",$scope.trdssubseries[i].nodes[indexSubfondo].nodes[indexNodeSeccion].nodes[indexNodeSubseccion].nodes[indexNodeSerie].nodes);
                    }catch(e){}
                    try{
                        tipodocumento=$scope.trdssubseries[i].nodes[indexSubfondo].nodes[indexNodeSeccion].nodes[indexNodeSubseccion].nodes[indexNodeSerie].nodes[indexNodeSubserie].nodes;
                        var temp=[];

                        for(var k=0;k<tipodocumento.length;k++){
                           if(tipodocumento[k].nombreparametrica=="tipodocumento"){
                            tipodocumento[k].metadata=$scope.getMetadatoFromNode(tipodocumento[k].nodes);
                            delete tipodocumento[k].nodes;
                            temp.push(tipodocumento[k]);
                           }
                        }
                        delete tipodocumento.nodes;
                        tipodocumento=temp;
                    }catch (e){}
                    try{
                        subserie=$scope.trdssubseries[i].nodes[indexSubfondo].nodes[indexNodeSeccion].nodes[indexNodeSubseccion].nodes[indexNodeSerie].nodes[indexNodeSubserie];
                        subserie.metadata=$scope.getMetadatoFromNode(subserie.nodes);
                        delete subserie.nodes;
                    }catch (e){}
                    try{
                        serie=$scope.trdssubseries[i].nodes[indexSubfondo].nodes[indexNodeSeccion].nodes[indexNodeSubseccion].nodes[indexNodeSerie];
                        serie.metadata=$scope.getMetadatoFromNode(serie.nodes);
                        delete serie.nodes;
                    }catch (e){}
                     try{
                        subseccion=$scope.trdssubseries[i].nodes[indexSubfondo].nodes[indexNodeSeccion].nodes[indexNodeSubseccion];
                        subseccion.metadata=$scope.getMetadatoFromNode(serie.nodes);
                        delete subseccion.nodes;
                    }catch (e){}
                     try{
                        seccion=$scope.trdssubseries[i].nodes[indexSubfondo].nodes[indexNodeSeccion];
                        seccion.metadata=$scope.getMetadatoFromNode(serie.nodes);
                        delete seccion.nodes;
                    }catch (e){}
                    try{
                        subfondo=$scope.trdssubseries[i].nodes[indexSubfondo];
                        subfondo.metadata=$scope.getMetadatoFromNode(subfondo.nodes);
                        delete subfondo.nodes;
                    }catch (e){}
                    try{
                        fondo=$scope.trdssubseries[i];
                        fondo.metadata=$scope.getMetadatoFromNode(fondo.nodes);
                        delete fondo.nodes;
                    }catch (e){}
                    delete fondo["_id"];

                    trd[i]={};
                    trd[i]["fondo"]=fondo;
                    trd[i]["subfondo"]=subfondo;
                    trd[i]["seccion"]=seccion;
                    trd[i]["subseccion"]=subseccion;
                    trd[i]["serie"]=serie;
                    trd[i]["subserie"]=subserie;
                    trd[i]["tipodocumento"]=tipodocumento;
                }
                $scope.trdssubseries=[];
                var promise=GarantiasServices.saveChangesMetadata(trd);
                handleSubmitServicePromise(promise,null);
                $scope.retrive();
               };
          $scope.retrive = function (context) {
           $scope.getMetadata();

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
