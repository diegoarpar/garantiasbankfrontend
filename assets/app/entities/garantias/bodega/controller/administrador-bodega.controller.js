/**
 * Created by joag on 9/06/16.
 */

(function () {
        'use strict';
        angular.module("wpc")
            .controller('AdministradorBodegaController', AdministradorBodegaController);

        AdministradorBodegaController.$inject = ['AuthenticationFactory','$scope', 'GarantiasServices',  '$location', '$rootScope', '$window', '$route','NgTableParams'];

        function AdministradorBodegaController(AuthenticationFactory,$scope, GarantiasServices, $location, $rootScope, $window, $route,NgTableParams) {
            inSession($scope,AuthenticationFactory,$window,false);
            $scope.campo = {};
            $scope.menu_activo=true;
            $scope.change_manu_activo=function(){
                $scope.menu_activo=$scope.menu_activo==true?false:true;

            }
        var data = [{name: "Moroni", age: 50},
                      {name: "Tiancum", age: 43},
                      {name: "Jacob", age: 27},
                      {name: "Nephi", age: 29},
                      {name: "Enos", age: 34},
                      {name: "Tiancum", age: 43},
                      {name: "Jacob", age: 27},
                      {name: "Nephi", age: 29},
                      {name: "Enos", age: 34},
                      {name: "Tiancum", age: 43},
                      {name: "Jacob", age: 27},
                      {name: "Nephi", age: 29},
                      {name: "Enos", age: 34},
                      {name: "Tiancum", age: 43},
                      {name: "Jacob", age: 27},
                      {name: "Nephi", age: 29},
                      {name: "Enos", age: 34}];


          $scope.tableParams = new NgTableParams({}, { dataset: data});
        }
    })();
