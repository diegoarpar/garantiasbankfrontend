/**
 * Created by joag on 9/06/16.
 */
(function(){
   'use strict';
    angular.module("wpc")
            .controller('LoginControl', LoginController);     
        
    LoginController.$inject = ['$scope', 'AuthenticationFactory', '$location','$uibModalInstance','$rootScope','$window','$route'];
        
    function LoginController($scope, AuthenticationFactory, $location,$uibModalInstance,$rootScope,$window,$route) {

            // callback for ng-click 'createNewUser':
            $scope.ok = function (user, pass) {
                
                $window.localStorage.setItem('token',sha256(pass));
                var rta = AuthenticationFactory.show({user: user, password:sha256(pass)});
                $scope.token=rta.token;
                ///$route.reload();
                //$uibModalInstance.close($scope.selected.item);

                //$location.attr('href', '/encargos');
                //$window.localStorage.removeItem('token');
                $uibModalInstance.dismiss('cancel');
                $location.path('/encargos');
                $route.reload();
                $scope.$apply();
            };
            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };
    }    
        
}
)();
