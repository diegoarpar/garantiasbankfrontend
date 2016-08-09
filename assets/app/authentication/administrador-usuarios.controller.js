/**
 * Created by joag on 9/06/16.
 */
(function () {
        'use strict';
        angular.module("wpc")
            .controller('AdministradorUsuariosController', AdministradorUsuariosController);

        AdministradorUsuariosController.$inject = ['$scope', 'AuthenticationGetUserServices', 'AuthenticationGetRolesServices', 'AuthenticationGetPermissionServices', '$location', '$rootScope', '$window', '$route'];

        function AdministradorUsuariosController($scope, AuthenticationGetUserServices, AuthenticationGetRolesServices, AuthenticationGetPermissionServices, $location, $rootScope, $window, $route) {
            $scope.users = AuthenticationGetUserServices.show();
            $scope.roles = AuthenticationGetRolesServices.show();
            $scope.permission = [];
            $scope.selectedUser = {};
            $scope.selectedRole = {};
            $scope.addUser = function () {
                var user = {user: $scope.nombre, pass: $scope.contrasena, completeName: $scope.nombreCompleto};


                AuthenticationGetUserServices.create({
                    user: $scope.nombre,
                    pass: sha256($scope.contrasena),
                    completeName: $scope.nombreCompleto
                })
                    .$promise.then(function (data) {
                        $scope.users = AuthenticationGetUserServices.show();
                    },
                    function (error) {
                        alert(error);
                    });

            };
            $scope.editPermission = function (c) {
                $scope.selectedUser = c;
                $scope.permission = AuthenticationGetPermissionServices.show({user: $scope.selectedUser.user});
            };
            $scope.editInformation = function (c) {
                $scope.selectedUser = c;

            };
            $scope.removeUser = function (idx) {
                $scope.users.splice(idx, 1);
            };
            $scope.saveRole = function () {
                var permission = {user: $scope.selectedUser.user, roleName: $scope.selectedRole};
                AuthenticationGetPermissionServices.create({
                    user: $scope.selectedUser.user,
                    roleName: $scope.selectedRole
                });
                $scope.permission = AuthenticationGetPermissionServices.show({user: $scope.selectedUser.user});
            };
        }
    })();
