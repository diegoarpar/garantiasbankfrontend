
(function () {
        'use strict';
        angular.module("wpc")
            .controller('AsociarRolController', AsociarRolController);

        AsociarRolController.$inject =
            ['$scope','AuthenticationFactory','ShareService', 'GarantiasServices', 'NumberService',
                '$location', 'ngTableParams', '$filter', '$window','$controller','$sessionStorage','$uibModalInstance'];

        function AsociarRolController($scope,AuthenticationFactory,ShareService, GarantiasServices, NumberService,
                                  $location, ngTableParams, $filter, $window,$controller,$sessionStorage,$uibModalInstance)
         {


            inSession($scope,AuthenticationFactory,$window);

            var user=$scope.getSelectedUser();
            $scope.selectedUser=user;
            $scope.roles=AuthenticationFactory.showRoles({user:user.user});
            $scope.ok = function() {
                for(var i=0;i<$scope.roles.length;i++){
                    delete $scope.roles[i]["_id"];
                }

                AuthenticationFactory.createRoles($scope.roles);
                $uibModalInstance.dismiss('cancel');
            };
            $scope.add = function() {
                var role={rol:$scope.selectedRole, user:$scope.getSelectedUser().user};
                $scope.roles.push(role);

            };
            $scope.remove = function(idx) {

                $scope.roles.splice(idx,1);

            };
            $scope.cancel = function() {
              $uibModalInstance.dismiss('cancel');
            };


        }
    })();
