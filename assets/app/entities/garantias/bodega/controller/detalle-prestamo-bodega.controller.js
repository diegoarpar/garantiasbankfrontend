/**
 * Created by joag on 9/06/16.
 */

(function () {
        'use strict';
        angular.module("wpc")
            .controller('DetallePrestamoBodegaController', DetallePrestamoBodegaController);

        DetallePrestamoBodegaController.$inject = ['AuthenticationFactory','$scope', 'GarantiasServices',  '$location', '$rootScope', '$window', '$route','NgTableParams','$uibModal','$uibModalInstance','ShareService','UserLoginService'];

        function DetallePrestamoBodegaController(AuthenticationFactory,$scope, GarantiasServices, $location, $rootScope, $window, $route,NgTableParams,$uibModal,$uibModalInstance,ShareService,UserLoginService) {
            inSession($scope,AuthenticationFactory,$window,false);
            $scope.prestamoSeleccionado=$scope.getPrestamoSeleccionado();
            fillColumns($scope.prestamoSeleccionado.entity,$scope);
            update_columns($scope);

            $scope.openModalFunctionary=openModalFunctionary;
            $scope.desasociar=function(row,$index){
                row.prestamo=null;
                GarantiasServices.update([row]);
                $scope.prestamoSeleccionado.entity.splice($index,1);

               var removePrestamo=GarantiasServices.removeprestamo([{estado:"PENDIENTE_CONFIRMAR",usuario:UserLoginService.getUser()}]);
               removePrestamo.$promise.then(function(data){
                    $scope.prestamoSeleccionado._id=null;
                    GarantiasServices.createprestamo([$scope.prestamoSeleccionado]);

               });
            }



            function openModalFunctionary(entity) {

                ShareService.set(entity);
                var modalInstance = $uibModal.open({
                        templateUrl: 'assets/app/entities/dynamic-search/view/dynamic-search-modal-functionary.html',
                        controller: 'DynamicSearchModalController',
                        scope: $scope,
                        size: 'lg'
                    }
                );
            }


}


    })();
