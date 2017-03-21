/**
 * Created by joag on 9/06/16.
 */
(function () {
        'use strict';
        angular.module("wpc")
            .controller('NavBarController', NavBarController);

        NavBarController.$inject = ['AuthenticationFactory','$scope', 'ProductServices', '$location', '$uibModal','$window'];

        function NavBarController(AuthenticationFactory,$scope, ProductServices, $location, $uibModal,$window) {
            inSession($scope,AuthenticationFactory,$window);
            $scope.inSession=false;

            $scope.userLogIn=[];
            if($window.localStorage.getItem('token')){
                $scope.inSession=true;
               var logIn=AuthenticationFactory.userByToken({token:$window.localStorage.getItem('token')});
                    logIn.$promise.then(
                        function (data){
                        $scope.userLogIn=data[0];
                        }
                    );
            }
            $scope.toggleStyle = function () {
                $scope.bodyCon = !$scope.bodyCon;
                $scope.noneStyle = !$scope.noneStyle;
                $scope.menu = !$scope.menu;

            }
            $scope.open = function (size) {
                var modalInstance = $uibModal.open({
                        animation: $scope.animationsEnabled,
                        templateUrl: 'assets/app/authentication/login.html',
                        controller: 'LoginControl',
                        size: size,
                        resolve: {
                            items: function () {
                                return $scope.items;
                            }
                        }

                    }
                );
            }
        }

    })();
