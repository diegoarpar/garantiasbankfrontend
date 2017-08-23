/**
 * Created by joag on 9/06/16.
 */
(function () {
        'use strict';
        angular.module("wpc")
            .controller('NavBarController', NavBarController);

        NavBarController.$inject = ['ShareService','AuthenticationFactory','GarantiasServices','$scope',  '$location', '$uibModal','$window'];

        function NavBarController(ShareService,AuthenticationFactory,GarantiasServices,$scope,  $location, $uibModal,$window) {
            inSession($scope,AuthenticationFactory,$window);
            $scope.inSession=false;
            $scope.menu={};


            $scope.userLogIn=[];
            $scope.logOut=function(){
                $window.localStorage.removeItem('token');
                $window.location.reload();
            };
            if($window.localStorage.getItem('token')){
                $scope.inSession=true;
               var logIn=AuthenticationFactory.userByToken({token:$window.localStorage.getItem('token')});
                    logIn.$promise.then(
                        function (data){
                        if(data){
                            $scope.userLogIn=data[0];
                            ShareService.setUser($scope.userLogIn.user);
                            var promise=GarantiasServices.showMenu({user:$scope.userLogIn.user});
                                promise.$promise.then(function(data){
                                        if(data)if(data.length>0)
                                        $scope.menu=data[0];
                                    }
                                );
                        }

                        }
                    );
            }
            $scope.toggleStyle = function () {
                $scope.bodyCon = !$scope.bodyCon;
                $scope.noneStyle = !$scope.noneStyle;
                $scope.menu = !$scope.menu;

            }
            $scope.open = function () {
                var modalInstance = $uibModal.open({
                        animation: $scope.animationsEnabled,
                        templateUrl: 'assets/app/authentication/view/login.html',
                        controller: 'LoginControl',
                        size: 'lg',
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
