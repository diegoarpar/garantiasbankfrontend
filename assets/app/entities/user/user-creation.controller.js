/**
 * Created by joag on 9/06/16.
 */
(function () {
        'use strict';
        angular.module("wpc")
            .controller('UserCreationCtrl', UserCreationController);

        UserCreationController.$inject = ['$scope', 'UsersFactory', '$location']

        function UserCreationController($scope, UsersFactory, $location) {
            // callback for ng-click 'createNewUser':
            $scope.createNewUser = function () {
                UsersFactory.create($scope.user);
                $location.path('/user-list');
            }
        }

    })();
