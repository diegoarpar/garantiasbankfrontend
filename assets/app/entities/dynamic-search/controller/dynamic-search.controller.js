/**
 * Created by joag on 9/06/16.
 */
(function () {
        'use strict';
        angular.module("wpc")
            .controller('DynamicSearchController', DynamicSearchController);

        DynamicSearchController.$inject = ['AuthenticationFactory','$scope', 'DynamicSearch', '$uibModal', '$location',
        'ShareService','$window','GarantiasServices','NumberService','UserLoginService'];

        function DynamicSearchController(AuthenticationFactory,$scope, DynamicSearch, $uibModal,
         $location, ShareService,$window,GarantiasServices,NumberService,UserLoginService)
         {
            inSession($scope,AuthenticationFactory,$window);
            $scope.data = {};
            $scope.lista = [];
            $scope.listaBusqueda = [];
            $scope.addColumn = addColumn;
            $scope.buscar = buscar;
            $scope.removeRow = removeRow;
            //$scope.generateColumns = generateColumns;
            $scope.filterSearchResult = filterSearchResult;
            $scope.openStartDate = openStartDate;
            $scope.openEndDate = openEndDate;
            $scope.openModal = openModal;
            $scope.switchBoolean = switchBoolean;
            $scope.openModalFunctionary=openModalFunctionary;
            $scope.dateOptions = {
                formatYear: 'yy',
                startingDay: 1
            };

            $scope.prestar=function(row){
                $scope.row=row;
                NumberService.getNumber().$promise.then(function(dataN){
                    if(!!dataN&&!!dataN[0]){
                        $scope.row.prestamo={estado:"PENDIENTE_CONFIRMAR",numero:dataN[0].number};
                        GarantiasServices.update([$scope.row]);
                        GarantiasServices.showprestamo([{estado:"PENDIENTE_CONFIRMAR",solicitudUsuario:UserLoginService.getUser()}]).$promise.then(function(data){
                            $scope.prestamoP={};
                            if(!!data&&data.length>0){
                                $scope.prestamoP=data[0];
                                $scope.prestamoP.entity.push(row);
                            }else{
                                 $scope.prestamoP.solicitudUsuario=UserLoginService.getUser();
                                 $scope.prestamoP.fechaPresta=$scope.row.prestamo.numero;
                                 $scope.prestamoP.estado="PENDIENTE_CONFIRMAR";
                                 $scope.prestamoP.numero= $scope.row.prestamo.numero;
                                 $scope.prestamoP.entity=[];
                                 $scope.prestamoP.entity.push(row);
                            }

                            GarantiasServices.removeprestamo([{$and:[{estado:{$eq:"PENDIENTE_CONFIRMAR"},solicitudUsuario:{$eq:UserLoginService.getUser()}}]}]).$promise.then(function(data){
                                 $scope.prestamoP._id=null;
                                 GarantiasServices.createprestamo([$scope.prestamoP]);

                                });

                            });
                }});
            }
            $scope.openModalFiltro = function () {

                var modalInstance = $uibModal.open({
                        templateUrl: 'assets/app/entities/modal/filtro/view/filtro-busqueda.html',
                        controller: 'FiltrarBusquedaController',
                        scope: $scope,
                        size: 'lg'
                    }
                );
            }
            $scope.popupStartDate = {
                opened: false
            };
            $scope.popupEndDate = {
                opened: false
            };

            $scope.fondos=GarantiasServices.showParametric({nombreparametrica:'fondo'});
            $scope.subseries=[];

            $scope.cargarSubseries = function() {
                var parameter=[{'fondo.key':$scope.fondoSelected.key}];
                $scope.subseries=GarantiasServices.showtrdpost(parameter);
            }
            $scope.cargarMetadatos = function() {
                var parameter=[{'fondo.key':$scope.fondoSelected.key,'subserie.key':$scope.subserieseleccionada.key}];

                var promise = GarantiasServices.showMetadataPost(parameter);

                promise.$promise.then(function(data){

                    if(data!=null){
                        $scope.columnsMetadata=getMetadataFactoryToSearch(data);
                    }
                });
            }
            function openStartDate() {
                $scope.popupStartDate.opened = true;
            };
            function openEndDate() {
                $scope.popupEndDate.opened = true;
            };

            function addColumn(col) {
                $scope.lista.push($scope.columnsMetadata[col]);
                $scope.columnsMetadata.splice(col, 1);
            }

            $scope.setResultSearch = function (promise) {

                showWaiteImage(true);
                $scope.mapColumns = [];
                $scope.columns = [];
                $scope.all_columns = [];
                $scope.digital=[];
                promise.$promise.then(function (data){
                    if(data!=null){
                        $scope.searchResults = data;
                        fillColumns(data,$scope);
                        update_columns($scope);
                        $scope.generateColumns=$scope.all_columns;
                    }
                });
                showWaiteImage(false);

            };
            function buscar() {
             showWaiteImage(true);
                var searchVector = [];
                for (var i = 0; i < $scope.lista.length; i++) {
                    searchVector[i] = {
                        key: $scope.lista[i].key,
                        value: $scope.listaBusqueda[i]
                    };
                }

                var search = {
                    queryString: searchVector
                };

                if (angular.isDefined($scope.data.word)) {
                    search.word = $scope.data.word;
                }

                if (angular.isDefined($scope.data.startDate)) {
                    search.startDate = $scope.data.startDate.getTime();
                }
                if (angular.isDefined($scope.data.endDate)) {
                    search.endDate = $scope.data.endDate.getTime();
                }


                DynamicSearch.searchWithMetadata(search).success(function (data) {
                    $scope.searchResults = data;

                    fillColumns(data,$scope);
                    update_columns($scope);
                    $scope.generateColumns=$scope.all_columns;
                    showWaiteImage(false);

                }).error(function (error) {
                    alert(error)
                    showWaiteImage(false);
                })
            }

            function removeRow(index) {
                if (index == 0) {
                    $scope.lista.shift();
                    $scope.listaBusqueda.shift();
                }
                else {
                    $scope.columnsMetadata[$scope.columnsMetadata.length] = $scope.lista[index];
                    $scope.lista.splice(index, 1);
                    $scope.listaBusqueda.splice(index, 1);
                }
            }



            function filterSearchResult() {
                $scope.copySearchResult = [];
                angular.forEach(vector, function (object, key) {

                })
            }

            function openModal(entity) {

                !!entity&&!!entity.validaciones?entity.rta_validac="COMPLETITUD:"+entity.validaciones.completitud+" IDONEIDAD: "+entity.validaciones.idoneidad:false;

                ShareService.set(entity);
                var modalInstance = $uibModal.open({
                        templateUrl: 'assets/app/entities/dynamic-search/view/dynamic-search-modal.html',
                        controller: 'DynamicSearchModalController',
                        scope: $scope,
                        size: 'lg'
                    }
                );
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
            function switchBoolean(key) {
                $scope.all_columns[r].checked = !$scope.all_columns[key].checked;
            }
        }


    })();
