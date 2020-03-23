/**
 * Created by joag on 9/06/16.
 */
(function () {
        'use strict';
        angular.module("wpc")
            .controller('CrearPrestamoBodegaController', CrearPrestamoBodegaController);

        CrearPrestamoBodegaController.$inject = ['UserLoginService','NumberService','AuthenticationFactory','ApiFiles','$scope', 'ShareService', 'UploadFilesService', 'Upload', '$timeout', 'ApiGarantias', 'ShowFiles', '$sce','$window','CMSController','$http','$uibModal','GarantiasServices'];

        function CrearPrestamoBodegaController(UserLoginService,NumberService,AuthenticationFactory,ApiFiles,$scope, ShareService, UploadFilesService, Upload, $timeout, ApiGarantias, ShowFiles, $sce,$window,CMSController,$http,$uibModal,GarantiasServices) {

            inSession($scope,AuthenticationFactory,$window);
            $scope.tipoPrioridadPrestamo=GarantiasServices.showParametric({nombreparametrica:'tipoPrioridadPrestamo',tenant:window.sessionStorage.getItem("tenant")}); //fondo
            $scope.entity = ShareService.get();
            $scope.garantiaid = $scope.entity._id;

            $scope.log = [];
            $scope.usuarios = AuthenticationFactory.showAll();

             $scope.metadataUbicacion=[];
             if($scope.entity.ubicacionbodega!=null)
            GarantiasServices.showParametricpost([{nombreparametrica:"bodegaUbicacion","add1.key":$scope.entity.ubicacionbodega.container.key.key,"add2.key":$scope.entity.ubicacionbodega.container.storage.key}]).$promise.then(function(data){
                $scope.metadataUbicacion=data;
            });
            $scope.rowDetailShow=function(rowSelected){
                 var row={};
                row["key"]=rowSelected;

                return rowDetailShow(row);
            }
            $scope.getBarCode=function(){
                return $scope.barcodenumber;
            };
            $scope.getBarCodeSubserie=function(){
                return $scope.entity.ingreso.subserie;
            };
            $scope.cancel=function(){
                $scope.$dismiss()
            };
            $scope.ok=function(){
                $scope.row=$scope.entity;

                NumberService.getNumber().$promise.then(function(dataN){
                    if(!!dataN&&!!dataN[0]){


                        $scope.row.prestamo={estado:"PENDIENTE_CONFIRMAR",numero:dataN[0].number,solicitudUsuario:UserLoginService.getUser()};
                        $scope.row.prestamo.tipoPrioridadPrestamo=$scope.prioridadPrestamo;

                        GarantiasServices.update([$scope.row]);
                        GarantiasServices.showprestamo([{estado:"PENDIENTE_CONFIRMAR",solicitudUsuario:UserLoginService.getUser(),tipoPrioridadPrestamo:$scope.prioridadPrestamo.value}]).$promise.then(function(data){
                            $scope.prestamoP={};
                            if(!!data&&data.length>0){
                                $scope.prestamoP=data[0];
                                $scope.prestamoP.entity.push($scope.row);
                            }else{
                                 $scope.prestamoP.solicitudUsuario=UserLoginService.getUser();
                                 $scope.prestamoP.fechaPresta=$scope.row.prestamo.numero;
                                 $scope.prestamoP.estado="PENDIENTE_CONFIRMAR";
                                 $scope.prestamoP.numero= $scope.row.prestamo.numero;
                                 $scope.prestamoP.entity=[];
                                 $scope.prestamoP.entity.push($scope.row);
                                 $scope.prestamoP.tipoPrioridadPrestamo=$scope.prioridadPrestamo.value;
                            }

                            GarantiasServices.removeprestamo([{$and:[{estado:{$eq:"PENDIENTE_CONFIRMAR"},solicitudUsuario:{$eq:UserLoginService.getUser()},tipoPrioridadPrestamo:{$eq:$scope.prioridadPrestamo.value}}]}]).$promise.then(function(data){
                                 $scope.prestamoP._id=null;
                                 GarantiasServices.createprestamo([$scope.prestamoP]);
                                     $scope.$dismiss();
                                });

                            });
                }});
            }
            $scope.okBodega=function(){
                NumberService.getNumber().$promise.then(function(dataN){
                    if(!!dataN&&!!dataN[0]){
                        $scope.prestamoP={estado:"PENDIENTE_CONFIRMACION_BODEGA",numero:dataN[0].number,solicitudUsuario:$scope.usuario.user,solicitudUsuarioBodega:UserLoginService.getUser()};
                        $scope.prestamoP.tipoPrioridadPrestamo=$scope.prioridadPrestamo.key;
                        $scope.prestamoP.usuarioBodegaAprueba=UserLoginService.getUser();
                        $scope.prestamoP.usuarioBodegaApruebaFecha=dataN[0].number;
                        $scope.prestamoP.fechaPresta=$scope.prestamoP.numero;
                        $scope.prestamoP.entity=[];
                        GarantiasServices.createprestamo([$scope.prestamoP]);
                }});
            }
            if(!!$scope.garantiaid)
            ShowFiles.listOfFiles.get({garid: $scope.garantiaid}).$promise.then(
                function (data) {
                    if(data!=null)
                    $scope.listOfFiles = data;
                },
                function (error) {

                }
            );


        }


    })();