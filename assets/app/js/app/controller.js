var app = angular.module('wpc.controllers', []);

app.controller('UserListCtrl', ['$scope', 'UsersFactory', 'UserFactory', '$location',
    function ($scope, UsersFactory, UserFactory, $location) {

        // callback for ng-click 'editUser':
        $scope.editUser = function (userId) {
            $location.path('/user-detail/' + userId);
        };

        // callback for ng-click 'deleteUser':
        $scope.deleteUser = function (userId) {
            UserFactory.delete({ id: userId });
            $scope.users = UsersFactory.query();
        };

        // callback for ng-click 'createUser':
        $scope.createNewUser = function () {
            $location.path('/user-creation');
        };

        $scope.users = UsersFactory.query();
    }]);

app.controller('UserDetailCtrl', ['$scope', '$routeParams', 'UserFactory', '$location',
    function ($scope, $routeParams, UserFactory, $location) {

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
    }]);

app.controller('UserCreationCtrl', ['$scope', 'UsersFactory', '$location',
    function ($scope, UsersFactory, $location) {

        // callback for ng-click 'createNewUser':
        $scope.createNewUser = function () {
            UsersFactory.create($scope.user);
            $location.path('/user-list');
        }
    }]);

app.controller('ProductControl', ['$scope', 'ProductServices','ReportServicesTelefonica' ,'$location','ngTableParams','$filter',
    function ($scope, ProductServices,ReportServicesTelefonica, $location,ngTableParams,$filter) {
         $scope.dateStart = new Date();
          $scope.dateEnd = new Date();
        // callback for ng-click 'createNewUser':
        $scope.createNewUser = function () {
            $location.path('/user-list');
        };
        //$scope.users = ProductServices.show();
        var digital=[];
        $scope.find = function (process) {
            digital=ReportServicesTelefonica.show({processName:process,dateStart:$scope.dateStart.toDateString(),dateEnd:$scope.dateEnd.toDateString()});
            
             construirTabla($scope,ReportServicesTelefonica, digital,ngTableParams,$filter);
             $scope.tablaDigitalizacion.reload();
        };
        $scope.export=function($event, fileName){
           
            $scope.helper.csv.generate($event, "report.csv");
            $location.href=$scope.helper.csv.link();

            };
            
        
           construirTabla($scope,ReportServicesTelefonica, digital,ngTableParams,$filter);
        
            
    }]);

function construirTabla($scope,ReportServicesTelefonica, digital,ngTableParams,$filter){
     //digital=ReportServicesTelefonica.show({processName:"NINGUNA",dateStart:$scope.dateStart.toDateString(),dateEnd:$scope.dateStart.toDateString()});
        
           $scope.data = digital;
            $scope.tablaDigitalizacion = new ngTableParams({
                page: 1,
                count: 10,
                sorting: {processkey:'asc'}
            }, {
                total: digital.length, 
                
                getData: function ($defer, params) {
                        params.total(digital.length);
                        $scope.data = params.sorting() ? $filter('orderBy')(digital, params.orderBy()) : digital;
                        $scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : digital;
                        $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        $defer.resolve($scope.data);
                }
            });
    
}
app.controller('LoginControl', ['$scope', 'AutenticationFactory', '$location','$uibModalInstance','$rootScope','$window','$route',
    function ($scope, AutenticationFactory, $location,$uibModalInstance,$rootScope,$window,$route) {

        // callback for ng-click 'createNewUser':
         $scope.ok = function (user, pass) {
             
             
             $window.localStorage.setItem('token',sha256(pass));
             var rta = AutenticationFactory.show({user: user, password:sha256(pass)});
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
    }]);

app.controller('NavBarControl', ['$scope', 'ProductServices', '$location','$uibModal',
    function ($scope, ProductServices, $location,$uibModal) {
        
        $scope.open = function (size) {
        var modalInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'pages/login/login.html',
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
       
        
    }]);