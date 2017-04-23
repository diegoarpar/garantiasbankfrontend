/**
 * Created by joag on 9/06/16.
 */
(function () {
        'use strict';
        angular.module("wpc")
            .controller('LoginControl', LoginController);

        LoginController.$inject = ['$scope', 'AuthenticationFactory', '$location', '$uibModalInstance', '$rootScope', '$window', '$route'];

        function LoginController($scope, AuthenticationFactory, $location, $uibModalInstance, $rootScope, $window, $route) {
            inSession($scope,AuthenticationFactory,$window,true);
            // callback for ng-click 'createNewUser':
            $scope.ok = function () {

                $window.localStorage.removeItem('token');

                var tenant=$window.sessionStorage.getItem("tenant");
                var rta = AuthenticationFactory.logIn({user: $scope.user, pass: sha256($scope.pass),tenant:tenant});
                $scope.token = rta;
                $scope.token.$promise.then(function (data) {
                    if (!data.token) {
                        alert("Usuario o Contraseña incorrecto");

                    }
                    else {
                        $scope.token = data.token;
                        $uibModalInstance.dismiss('cancel');
                        $window.localStorage.setItem('token', $scope.token);
                        $window.location.reload();
                    }

                });
            };
            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
        }

    })();
