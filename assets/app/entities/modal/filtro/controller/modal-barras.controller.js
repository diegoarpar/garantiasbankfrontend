/**
 * Created by joag on 9/06/16.
 */
(function () {
        'use strict';
        angular.module("wpc")
            .controller('GenerarBarrasController', GenerarBarrasController);

        GenerarBarrasController.$inject = ['AuthenticationFactory','$scope', 'DynamicSearch', 'CamposGenericosServices', '$uibModal', '$location', 'ShareService','$window','CamposParametricosServices','GarantiasServices'];

        function GenerarBarrasController(AuthenticationFactory,$scope, DynamicSearch, CamposGenericosServices, $uibModal, $location, ShareService,$window,CamposParametricosServices,GarantiasServices)
         {

            inSession($scope,AuthenticationFactory,$window);
            $scope.subserie=[];
            $scope.type = "CODE128B";

            $scope.cancell=function(){
                $scope.$dismiss();
            }
            $scope.getCode=function(){
                try{
                    $scope.code=$scope.getBarCode();
                }catch(e){
                    $scope.code="1111";
                }
            };

            $scope.getMetadata=function(){
                try{
                    $scope.subserie=$scope.getBarCodeSubserie();
                }catch(e){

                }
            };
            $scope.downloadBarCode = function() {
                var element = angular.element($("img")[0]);
                var toPdf=element[0].currentSrc;
                var dateList=[{"name":"Codigo", "value":$scope.code}];
                $scope.getMetadata();
                for(var i =0;i<$scope.subserie.length;i++)
                    for(var j =0;j<$scope.subserie[i].metadata.length;j++){
                        if($scope.subserie[i].metadata[j].fieldType=="alistamiento")
                        dateList.push({name:$scope.subserie[i].metadata[j].value,value:$scope.subserie[i].metadata[j].result});
                    }
                 downloadPDF("label.pdf",toPdf,dateList);
            };

            $scope.getCode();
        }


    })();
