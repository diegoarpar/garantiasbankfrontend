/**
 * Created by joag on 9/06/16.
 */
(function () {
        'use strict';
        angular.module("wpc")
            .controller('AdministradorUsuariosController', AdministradorUsuariosController);

        AdministradorUsuariosController.$inject = ['$scope', 'AuthenticationFactory',  '$location', '$rootScope', '$window', '$route','$uibModal'];

        function AdministradorUsuariosController($scope, AuthenticationFactory,   $location, $rootScope, $window, $route,    $uibModal) {
            inSession($scope,AuthenticationFactory,$window);
            $scope.getUsers=function(){
                $scope.users = AuthenticationFactory.showAll();
            }
            $scope.getUsers();
            $scope.permission = [];
            $scope.selectedUser = {};
            $scope.selectedRole = {};

            $scope.getSelectedUser = function () {
                return $scope.selectedUser;
            };
            $scope.removeUser = function (idx) {
                $scope.users.splice(idx, 1);
            };

            $scope.openModal = function(){
                var modalInstance = $uibModal.open({
                        templateUrl: 'assets/app/authentication/view/crear-usuario.html',
                        controller: 'CrearUsuarioController',
                        scope: $scope,
                        size: 'lg'
                    }
                );
            };

            $scope.editMenus = function(user){
                $scope.selectedUser=user;
                var modalInstance = $uibModal.open({
                        templateUrl: 'assets/app/authentication/view/administrar-menus.html',
                        controller: 'CrearMenuController',
                        scope: $scope,
                        size: 'lg'
                    }
                );
            };
            $scope.editPermisions = function(user){
                $scope.selectedUser=user;
                var modalInstance = $uibModal.open({
                        templateUrl: 'assets/app/authentication/view/administrador-permisos.html',
                        controller: 'AdministradorPermisosController',
                        scope: $scope,
                        size: 'lg'
                    }
                );
            };
            $scope.defineRol = function(user){
                $scope.selectedUser=user;
                var modalInstance = $uibModal.open({
                        templateUrl: 'assets/app/authentication/view/asociar-rol.html',
                        controller: 'AsociarRolController',
                        scope: $scope,
                        size: 'lg'
                    }
                );
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
