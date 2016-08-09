/**
 * Created by joag on 9/06/16.
 */
(function () {
        'use strict';
        angular.module("wpc")
            .controller('UserListController', UserListController);

        UserListController.$inject = ['$scope', 'UsersFactory', 'UserFactory', '$location'];

        function UserListController($scope, UsersFactory, UserFactory, $location) {
            // callback for ng-click 'editUser':
            $scope.editUser = function (userId) {
                $location.path('/user-detail/' + userId);
            };

            // callback for ng-click 'deleteUser':
            $scope.deleteUser = function (userId) {
                UserFactory.delete({id: userId});
                $scope.users = UsersFactory.query();
            };

            // callback for ng-click 'createUser':
            $scope.createNewUser = function () {
                $location.path('/user-creation');
            };

            $scope.users = UsersFactory.query();
        }

    })();
