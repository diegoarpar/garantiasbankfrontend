/**
 * Created by joag on 9/06/16.
 */
(function () {
        'use strict';
        angular.module("wpc")
            .config(DynamicSearchState);

        DynamicSearchState.$inject = ['$routeProvider'];

        function DynamicSearchState($routeProvider) {
            $routeProvider.when('/dynamic-search', {
                    templateUrl: 'assets/app/entities/dynamic-search/view/dynamic-search.html',
                    controller: 'DynamicSearchController'
                }
            );
            $routeProvider.when('/dynamic-search-details', {
                    templateUrl: 'assets/app/entities/dynamic-search/view/dynamic-search-modal.html',
                    controller: 'DynamicSearchModalController'
                }
            );

        }


    })();
