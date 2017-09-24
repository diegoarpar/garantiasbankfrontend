
(function () {
        'use strict';
        angular.module("wpc")
            .controller('AdministradorPermisosController', AdministradorPermisosController);

        AdministradorPermisosController.$inject =
            ['$scope','AuthenticationFactory','ShareService', 'GarantiasServices', 'NumberService',
                '$location', 'ngTableParams', '$filter', '$window','$controller','$sessionStorage','$uibModalInstance'];

        function AdministradorPermisosController($scope,AuthenticationFactory,ShareService, GarantiasServices, NumberService,
                                  $location, ngTableParams, $filter, $window,$controller,$sessionStorage,$uibModalInstance) {


         inSession($scope,AuthenticationFactory,$window);
                $scope.permissionsType=AuthenticationFactory.showParametrics({"DOMINIO":"TIPO_PERMISOS"});
                $scope.userPermisions=AuthenticationFactory.showPermissions({user:$scope.getSelectedUser().user});

                $scope.ok = function() {
                    AuthenticationFactory.update($scope.userPermisions);
                    $uibModalInstance.dismiss('cancel');

                };
                $scope.getPermissionsType=function(){
                    $scope.objectsPermissions=AuthenticationFactory.showParametrics({"DOMINIO":$scope.selectedPermissionType.VALOR+"_PERMISOS"});
                };
                $scope.getPermissionsObject=function(){
                    $scope.permissions=AuthenticationFactory.showParametrics({"DOMINIO":$scope.selectedObject.VALOR+"_PERMISOS"});
                };

                $scope.cancel = function() {
                    $scope.showModal = false;
                    $uibModalInstance.dismiss('cancel');
                };

                $scope.add = function() {
                    var permission={type:$scope.selectedPermissionType.VALOR,
                                    name:$scope.selectedObject.VALOR,
                                    value:$scope.selectedPermission.VALOR,
                                    user:$scope.getSelectedUser().user};
                    $scope.userPermisions.push(permission);

                };
                $scope.remove= function(idx) {
                     $scope.userPermisions.splice(idx,1);
                };



        }

    })();
