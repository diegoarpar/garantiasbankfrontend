/**
 * Created by joag on 9/06/16.
 */

(function () {
        'use strict';
        angular.module("wpc")
            .controller('CrearCampoArchivoController', CrearCampoArchivoController);

        CrearCampoArchivoController.$inject = ['AuthenticationFactory','$scope', 'GarantiasServices',  '$location', '$rootScope', '$window', '$route','NgTableParams','$uibModal','$uibModalInstance'];

        function CrearCampoArchivoController(AuthenticationFactory,$scope, GarantiasServices, $location, $rootScope, $window, $route,NgTableParams,$uibModal,$uibModalInstance) {
            inSession($scope,AuthenticationFactory,$window,false);
            $scope.fondos=GarantiasServices.showParametric({nombreparametrica:'fondo',tenant:window.sessionStorage.getItem("tenant")}); //fondo
            $scope.recargarCamposParametricosPrincipal=function(){
                $scope.recargarCamposParametricos();
            }
            $scope.seccionBodegaRegional=true;
            $scope.validarSeleccion=function(data){
                $scope.seccionBodegaRegional=true;
                if($scope.campo.nombreparametricas.name=="bodegaContenedor"||$scope.campo.nombreparametricas.name=="bodegaUbicacion"){
                    $scope.seccionBodegaRegional=false;
                }


            }
            $scope.recargarBodega=function(){
                $scope.bodegarta=GarantiasServices.showbodega([{nombreparametrica: $scope.campo.add1.nombreparametrica,key: $scope.campo.add1.key}]);
                $scope.bodegarta.$promise.then(function(data){
                    $scope.bodega=[];
                    for(var i =0; data!=null&&i<data.length;i++){
                        for(var j =0; data[i].nodes!=null&&j<data[i].nodes.length;j++){
                            $scope.bodega.push(data[i].nodes[j]);
                        }
                    }
                });
            }
            $scope.tipoParametrica=[{name:"fondo",value:"Fondo"},{name:"subfondo",value:"Sub Fondo"},{name:"seccion",value:"Sección"},{name:"subseccion",value:"Subseccion"}
                                    ,{name:"serie",value:"Serie"}
                                    ,{name:"subserie",value:"Subserie"}
                                    ,{name:"tipodocumento",value:"Tipo de Documento"}
                                    ,{name:"bodegaContenedor",value:"Datos de Bodega-Contenedor"}
                                    ,{name:"bodegaUbicacion",value:"Datos de Bodega-Ubicación"}
                                    ];
            $scope.ok = function () {
                $scope.campo.nombreparametrica=$scope.campo.nombreparametricas.name;
                $scope.campo.nombreparametricas=null;
                var rta = GarantiasServices.createParametric([$scope.campo]);
                rta.$promise.then(function(data){
                    $scope.recargarCamposParametricosPrincipal();
                }
                );



                $scope.parametricst = [];
                $scope.campo = {};
                $uibModalInstance.dismiss($scope);
            }

}})();
