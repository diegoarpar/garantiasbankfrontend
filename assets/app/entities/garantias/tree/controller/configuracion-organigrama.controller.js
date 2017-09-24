
(function () {
        'use strict';
        angular.module("wpc")
            .controller('ConfiguracionOrganigramaController', ConfiguracionOrganigramaController);

        ConfiguracionOrganigramaController.$inject =
            ['$scope','AuthenticationFactory', 'GarantiasServices', 'NumberService',
             '$location', 'ngTableParams', '$filter', '$window','$controller','$sessionStorage'];

        function ConfiguracionOrganigramaController($scope,AuthenticationFactory, GarantiasServices, NumberService,
                                $location, ngTableParams, $filter, $window,ngMaterial,$controller,$sessionStorage) {


         inSession($scope,AuthenticationFactory,$window);


        }
    })();
