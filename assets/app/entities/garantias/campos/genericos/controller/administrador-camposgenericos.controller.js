/**
 * Created by joag on 9/06/16.
 */
(function () {
        'use strict';
        angular.module("wpc")
            .controller('CamposGenericosController', CamposGenericosController);

        CamposGenericosController.$inject = ['AuthenticationFactory','$scope', 'CamposGenericosServices', 'CamposParametricosServices', '$location', '$rootScope', '$window', '$route'];

        function CamposGenericosController(AuthenticationFactory,$scope, CamposGenericosServices,  CamposParametricosServices, $location, $rootScope, $window, $route) {

            inSession($scope,AuthenticationFactory,$window);
            $scope.garantiaType = CamposParametricosServices.show({nombreparametrica: "tipogarantia", key: "-1",tenant:window.sessionStorage.getItem("tenant")});
            $scope.campo = {};
            $scope.parametrics = [];
            $scope.parametricst = [];
            $scope.loadGenericos = function (value) {
                $scope.parametrics = CamposGenericosServices.show({
                    garantiaType: value,
                    fieldType: $scope.campo.fieldType,
                    tenant:window.sessionStorage.getItem("tenant")
                });
            }
            $scope.loadGenericos2 = function (value) {
                $scope.parametrics = CamposGenericosServices.show({
                    garantiaType: $scope.campo.garantiaType,
                    fieldType: value,
                    tenant:window.sessionStorage.getItem("tenant")
                });
            }
            $scope.add = function () {
                $scope.campo.tenant=window.sessionStorage.getItem("tenant");
                $scope.parametricst.push($scope.campo);
                $scope.rta = CamposGenericosServices.create($scope.parametricst);
                $scope.parametrics = [];
                $scope.parametricst = [];
                $scope.campo = {};
            }
            $scope.remove = function (idx) {
                $scope.parametricst.push($scope.parametrics[idx]);
                CamposGenericosServices.remove({
                    garantiaType: $scope.parametrics[idx].garantiaType,
                    key: $scope.parametrics[idx].key,
                    tenant:window.sessionStorage.getItem("tenant")
                });
                $scope.parametrics = [];
                $scope.parametricst = [];
                $scope.campo = {};
            }

        }
    })();
