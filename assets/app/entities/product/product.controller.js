/**
 * Created by joag on 9/06/16.
 */
(function () {
        'use strict';
        angular.module("wpc")
            .controller('ProductController', ProductController);

        ProductController.$inject = ['AuthenticationFactory','$scope', 'ProductServices', 'ReportServicesTelefonica', '$location', 'ngTableParams', '$filter','$window'];

        function ProductController(AuthenticationFactory,$scope, ProductServices, ReportServicesTelefonica, $location, ngTableParams, $filter,$window) {
            inSession($scope,AuthenticationFactory,$window);
            $scope.dateStart = new Date();
            $scope.dateEnd = new Date();
            // callback for ng-click 'createNewUser':
            $scope.createNewUser = function () {
                $location.path('/user-list');
            };
            //$scope.users = ProductServices.show();
            var digital = [];
            $scope.find = function (process) {
                digital = ReportServicesTelefonica.show({
                    processName: process,
                    dateStart: $scope.dateStart.toDateString(),
                    dateEnd: $scope.dateEnd.toDateString()
                });

                construirTabla($scope, ReportServicesTelefonica, digital, ngTableParams, $filter);
                $scope.tablaDigitalizacion.reload();
            };
            $scope.export = function ($event, fileName) {

                $scope.helper.csv.generate($event, "report.csv");
                $location.href = $scope.helper.csv.link();

            };


            construirTabla($scope, ReportServicesTelefonica, digital, ngTableParams, $filter);
        }

        function construirTabla($scope, ReportServicesTelefonica, digital, ngTableParams, $filter) {
            //digital=ReportServicesTelefonica.show({processName:"NINGUNA",dateStart:$scope.dateStart.toDateString(),dateEnd:$scope.dateStart.toDateString()});

            $scope.data = digital;
            $scope.tablaDigitalizacion = new ngTableParams({
                page: 1,
                count: 10,
                sorting: {processkey: 'asc'}
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

    })();
