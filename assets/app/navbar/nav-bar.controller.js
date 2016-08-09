/**
 * Created by joag on 9/06/16.
 */
(function () {
        'use strict';
        angular.module("wpc")
            .controller('NavBarController', NavBarController);

        NavBarController.$inject = ['$scope', 'ProductServices', '$location', '$uibModal'];

        function NavBarController($scope, ProductServices, $location, $uibModal) {
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
