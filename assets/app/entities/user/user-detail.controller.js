/**
 * Created by joag on 9/06/16.
 */
(function(){
        'use strict';
        angular.module("wpc")
            .controller('UserDetailController', UserDetailController);

        UserDetailController.$inject =  ['$scope', '$routeParams', 'UserFactory', '$location'];

        function UserDetailController($scope, $routeParams, UserFactory, $location) {
            // callback for ng-click 'updateUser':
            $scope.updateUser = function () {
                UserFactory.update($scope.user);
                $location.path('/user-list');
            };

            // callback for ng-click 'cancel':
            $scope.cancel = function () {
                $location.path('/user-list');
            };

            $scope.user = UserFactory.show({id: $routeParams.id});
        }

    }
)();
