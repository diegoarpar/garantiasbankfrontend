/**
 * Created by joag on 9/06/16.
 */

(function () {
        'use strict';
        angular.module("wpc")
            .controller('CrearUbicacionGraficaBodegaController', CrearUbicacionGraficaBodegaController);

        CrearUbicacionGraficaBodegaController.$inject = ['AuthenticationFactory','$scope', 'GarantiasServices',  '$location', '$rootScope', '$window', '$route','NgTableParams','$uibModal','$uibModalInstance'];

        function CrearUbicacionGraficaBodegaController(AuthenticationFactory,$scope, GarantiasServices, $location, $rootScope, $window, $route,NgTableParams,$uibModal,$uibModalInstance) {
            inSession($scope,AuthenticationFactory,$window,false);
            $scope.fondos=GarantiasServices.showParametric({nombreparametrica:'fondo',tenant:window.sessionStorage.getItem("tenant")});
            $scope.cargarBodegas=function(fondo){
                GarantiasServices.showbodega([{nombreparametrica: $scope.fondoSeleccionado.nombreparametrica,key: $scope.fondoSeleccionado.key}]).$promise.then(function (data){
                    $scope.bodegas=[];
                    for (var i=0;!!data&&i< data.length;i++)
                        for (var j=0;!!data[i]&&!!data[i].nodes&&j< data[i].nodes.length;i++)
                            $scope.bodegas.push(data[i].nodes[j]);
                });

            }

            $scope.metadataContenedores=[];
            $scope.selection=function(context){
                var positionX=(event.pageX - $("#img").offset().left);
                var positionY=(event.pageY - $("#img").offset().top);
                var img=("#img");
                var canvas=$("#canvas");
                alert(" \n or X="+(event.pageX - $("#img").offset().left)+" Y="+(event.pageY - $("#img").offset().top));

                debugger;

                var cnvs = $("#canvas")[0];

                cnvs.style.position = "absolute";
                cnvs.style.left = "0px";
                cnvs.style.top = "0px";
                cnvs.style.display = "inherit";
                var ctx = cnvs.getContext("2d");
                ctx.beginPath();
                ctx.arc(positionX, positionY, 10, 0, 360, false);
                ctx.lineWidth = 3;
                ctx.strokeStyle = '#00ff00';
                ctx.stroke();

            }

            $scope.relocalizar=function(context){

                var cnvs=$("#canvas")[0];
                cnvs.style.display = "none";
                cnvs.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);


            }


            $scope.container={};

            $scope.ok=function(){
                $scope.container.container={};
                $scope.container.container.key=$scope.fondoSeleccionado;
                $scope.container.container.estado="N";
                $scope.container.container.storage=$scope.bodegaSeleccionada;
                GarantiasServices.createbodegacontainerubication([$scope.container]).$promise.then(function(data){
                    $scope.cargarUbicacionBodega();
                   $scope.cargarContenedorBodega();
                    $uibModalInstance.dismiss();
                });

            }

            $scope.cancel=function(){
                $uibModalInstance.dismiss();
            }

          $scope.ubicaciones=[];
          $scope.tableParamsContenedor = new NgTableParams({}, { dataset: $scope.ubicaciones});

          $scope.addUbicacion=function(){
            $scope.ubicaciones.push({code:"",name:""});
            $scope.tableParamsContenedor = new NgTableParams({}, { dataset: $scope.ubicaciones});

          }
          $scope.remove=function(_this){
              $scope.ubicaciones.splice(_this.$index,1);
              $scope.tableParamsContenedor = new NgTableParams({}, { dataset: $scope.ubicaciones});

            }



        }
    })();
