/**
 * Created by joag on 9/06/16.
 */
(function () {
        'use strict';
        angular.module("wpc")
            .controller('ModalTipoDocumentoController', ModalTipoDocumentoController);

        ModalTipoDocumentoController.$inject = ['AuthenticationFactory','$scope', 'DynamicSearch',
         '$uibModal', '$location', 'ShareService','$window','GarantiasServices'];

        function ModalTipoDocumentoController(AuthenticationFactory,$scope, DynamicSearch,
         $uibModal, $location, ShareService,$window,GarantiasServices)
         {
            inSession($scope,AuthenticationFactory,$window);
            $scope.data = {};
            $scope.documentsType = [];
            $scope.selectedDocumentType={};
            $scope.columnsMetadata=[];
            $scope.addColumn=function (col,index) {
                 $scope.lista.push(col);
                 $scope.columnsMetadata.splice(index, 1);
             };

             $scope.removeRow=function (col,index) {

                              $scope.lista.splice(index, 1);
                              $scope.columnsMetadata.push(col);
                          };

            $scope.ok=function(setSearchParameters,type){
                $scope.$dismiss();
                $scope.saveDocumentType($scope.lista,$scope.selectedDocumentType);
            }
            $scope.okReport=function(){

                }
            $scope.cancel=function(){
                $scope.listaBusqueda=[];
                $scope.lista=[];
                $scope.$dismiss();
            }

            $scope.changedDocumentype=function(){
                $scope.lista=getMetadataFactoryToSearchDocumentType($scope.documentsType,$scope.selectedDocumentType.key);
            }


            $scope.cargarMetadatos = function() {
                var parameter=[{'fondo.key':$scope.entity.ingreso.empresa.key,'subserie.key':$scope.entity.ingreso.subserie.key}];

                var promise = GarantiasServices.showMetadataPost(parameter);
                promise.$promise.then(function(data){

                    if(data!=null){
                        $scope.documentsType=data[data.length-1].tipodocumento;
                    }
                });
            }
            $scope.cargarMetadatos();
        }

        function getMetadataFactoryToSearchDocumentType(data,documentType){
            var dataList=[];
            if(data!=null){
                    for(var j=0;j<data.length;j++){
                        if(data[j].key==documentType)
                        for(var k=0;k<data[j].metadata.length;k++){
                            dataList.push({fieldType:data[j].metadata[k].fieldType,key:data[j].metadata[k].key,value:data[j].metadata[k].value,fieldPrototype:data[j].metadata[k].fieldPrototype})

                        }
                    }

            }
            return dataList;

        }



    })();
