/**
 * Created by joag on 9/06/16.
 */
(function () {
        'use strict';
        angular.module("wpc")
            .controller('CamposParametricosController', CamposParametricosController);

        CamposParametricosController.$inject = ['AuthenticationFactory','$scope', 'GarantiasServices',  '$location', '$rootScope', '$window', '$route'];

        function CamposParametricosController(AuthenticationFactory,$scope, GarantiasServices, $location, $rootScope, $window, $route) {
            inSession($scope,AuthenticationFactory,$window,false);
            $scope.campo = {};
            $scope.parametrics = GarantiasServices.showParametric();
            $scope.parametricst = [];
            $scope.add = function () {
                $scope.parametricst.push($scope.campo);
                var rta = GarantiasServices.createParametric($scope.parametricst);

                rta.$promise.then(function (data){
                    var rta2 = GarantiasServices.showParametric();
                            rta2.$promise.then(function (data){
                                 $scope.parametrics = data;
                            });
                });


                $scope.parametricst = [];
                $scope.campo = {};
            }
            $scope.remove = function (idx) {
                $scope.parametricst = [];
                $scope.parametricst.push($scope.parametrics[idx]);
                var rta = GarantiasServices.removeParametric({
                            nombreparametrica: $scope.parametrics[idx].nombreparametrica,
                            key: $scope.parametrics[idx].key
                        });
                        rta.$promise.then(function (data){
                            var rta2 = GarantiasServices.showParametric();
                                rta2.$promise.then(function (data){
                                     $scope.parametrics = data;
                                });
                        });

            }
        }
    })();
