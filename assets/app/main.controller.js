/**
 * Created by joag on 9/06/16.
 */
(function () {
        'use strict';
        angular.module("wpc")
            .controller('MainController', MainController);

        MainController.$inject = ['$scope', 'ngTableParams', '$filter']

        function MainController($scope, ngTableParams, $filter) {
            $scope.showContent = function ($fileContent) {
                alert($fileContent);
                var digital = $fileContent.split('\n');
                construirTabla($scope, digital, ngTableParams, $filter);
                //$scope.content = $fileContent;
            };
        }

    })();
