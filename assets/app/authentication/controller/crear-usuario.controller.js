
(function () {
        'use strict';
        angular.module("wpc")
            .controller('CrearUsuarioController', CrearUsuarioController);

        CrearUsuarioController.$inject =
            ['$scope','AuthenticationFactory','ShareService', 'GarantiasServices', 'NumberService',
                 '$location', 'ngTableParams', '$filter', '$window','$controller','$sessionStorage','$uibModalInstance'];

        function CrearUsuarioController($scope,AuthenticationFactory,ShareService, GarantiasServices, NumberService,
                                  $location, ngTableParams, $filter, $window,$controller,$sessionStorage,$uibModalInstance)
         {


            inSession($scope,AuthenticationFactory,$window);


            $scope.ok = function() {

                var users=[];
                $scope.user.pass=sha256($scope.user.pass);
                users[0]=$scope.user;
                var promise=AuthenticationFactory.createUser(users);
                promise.$promise.then(function(data){
                    $scope.getUsers();
                }
                );
                $uibModalInstance.dismiss('cancel');
            };

            $scope.cancel = function() {
              $uibModalInstance.dismiss('cancel');
            };


        }
    })();
