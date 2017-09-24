/**
 * Created by joag on 9/06/16.
 */
(function () {
        'use strict';
        angular.module("wpc")
            .controller('ReportAdministratorController', ReportAdministratorController);

        ReportAdministratorController.$inject = ['AuthenticationFactory','$scope', 'GarantiasServices',  '$location', '$rootScope', '$window', '$route'];

        function ReportAdministratorController(AuthenticationFactory,$scope, GarantiasServices, $location, $rootScope, $window, $route) {
            inSession($scope,AuthenticationFactory,$window);
            $scope.add = function () {

            }
            $scope.remove=function(){

            }
            $scope.modify=function(){

            }
        }
    })();
