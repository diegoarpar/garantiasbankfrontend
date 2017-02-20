/**
 * Created by joag on 9/06/16.
 */
(function () {
        'use strict';
        angular.module("wpc")
            .controller('CamposParametricosController', CamposParametricosController);

        CamposParametricosController.$inject = ['AuthenticationFactory','$scope', 'CamposParametricosServices',  '$location', '$rootScope', '$window', '$route'];

        function CamposParametricosController(AuthenticationFactory,$scope, CamposParametricosServices, $location, $rootScope, $window, $route) {
            inSession($scope,AuthenticationFactory,$window);
            $scope.campo = {};
            $scope.parametrics = CamposParametricosServices.show();
            $scope.parametricst = [];
            $scope.add = function () {
                $scope.campo.tenant=window.sessionStorage.getItem("tenant");
                $scope.parametricst.push($scope.campo);
                $scope.rta = CamposParametricosServices.create($scope.parametricst);
                $scope.parametrics = CamposParametricosServices.show();
                $scope.parametrics.$promise.then(function (data) {
                    $scope.parametrics = CamposParametricosServices.show();
                });

                $scope.parametricst = [];
                $scope.campo = {};
            }
            $scope.remove = function (idx) {
                $scope.parametricst.push($scope.parametrics[idx]);
                var response = CamposParametricosServices
                    .remove({
                            nombreparametrica: $scope.parametrics[idx].nombreparametrica,
                            key: $scope.parametrics[idx].key,
                            tenant: window.sessionStorage.getItem("tenant")
                        },
                        function (success) {
                            $scope.parametrics = CamposParametricosServices.show();
                            $scope.parametrics.$promise.then(function (data) {
                                $scope.parametrics = data;
                            });

                            $scope.parametricst = [];
                            $scope.campo = {};
                        },
                        function (error) {
                            alert("error")
                        });

            }
        }
    })();
