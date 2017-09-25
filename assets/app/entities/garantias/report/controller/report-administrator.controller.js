/**
 * Created by joag on 9/06/16.
 */
(function () {
        'use strict';
        angular.module("wpc")
            .controller('ReportAdministratorController', ReportAdministratorController);

        ReportAdministratorController.$inject = ['AuthenticationFactory','$scope', 'GarantiasServices',
        '$location', '$rootScope', '$window', '$route','ngTableParams','$uibModal'];

        function ReportAdministratorController(AuthenticationFactory,$scope, GarantiasServices,
        $location, $rootScope, $window, $route,ngTableParams,$uibModal) {
            inSession($scope,AuthenticationFactory,$window);
            $scope.reports=GarantiasServices.showReport();
            $scope.add=function () {
                $scope.isSelectedReport=false;
                $scope.selectedReport={};
                openModal($scope,$uibModal,"assets/app/entities/garantias/report/view/modify-report-modal.html","ModifyReportModalController");
            }

            $scope.newReport=function(newReport){
                delete newReport._id;
                if($scope.isSelectedReport){
                    var tempObject=[{nombre:newReport.nombre
                                    ,"subserie.key":newReport.subserie.key
                                    ,"fondo.key":newReport.fondo.key

                                    }];
                    var rta=GarantiasServices.removeReportPost(tempObject)
                    rta.$promise.then(function(data){
                            var rta2=GarantiasServices.createReport([newReport])
                                rta2.$promise.then(function(data){
                                    var rta3=GarantiasServices.showReport();
                                        rta3.$promise.then(function(data){
                                            $scope.reports=data;
                                        });
                                });
                    });
                }else{
                var rta=GarantiasServices.createReport([newReport])
                    rta.$promise.then(function(data){
                        var rta2=GarantiasServices.showReport();
                            rta2.$promise.then(function(data){
                                $scope.reports=data;
                            });
                    });
                }


            }
            $scope.edit=function (idx) {
                $scope.isSelectedReport=true;
                $scope.selectedIndex=idx;
                $scope.selectedReport=$scope.reports[idx];
                openModal($scope,$uibModal,"assets/app/entities/garantias/report/view/modify-report-modal.html","ModifyReportModalController");
            }

            $scope.remove=function(idx){

                var tempObject=[{nombre:$scope.reports[idx].nombre
                ,"subserie.key":$scope.reports[idx].subserie.key
                ,"fondo.key":$scope.reports[idx].fondo.key

                }];
                var rta =GarantiasServices.removeReportPost(tempObject);
                    rta.$promise.then(function(data){
                        var rta2=GarantiasServices.showReport();
                            rta2.$promise.then(function(data){
                                $scope.reports=data;
                            });
                    });
            }

        }
    })();
