
(function () {
        'use strict';
        angular.module("wpc")
            .controller('CrearMenuController', CrearMenuController);

        CrearMenuController.$inject =
            ['$scope','AuthenticationFactory','ShareService', 'GarantiasServices', 'NumberService', 'CamposGenericosServices',
                'CamposEspecificosServices','CamposParametricosServices', '$location', 'ngTableParams', '$filter', '$window','$controller','$sessionStorage','$uibModalInstance'];

        function CrearMenuController($scope,AuthenticationFactory,ShareService, GarantiasServices, NumberService, CamposGenericosServices,
                                 CamposEspecificosServices,CamposParametricosServices, $location, ngTableParams, $filter, $window,$controller,$sessionStorage,$uibModalInstance) {


         inSession($scope,AuthenticationFactory,$window);
                var user=$scope.getSelectedUser();

                $scope.data=getMenu();
                $scope.data.user=user.user;

                var promise=GarantiasServices.showMenu({user:$scope.data.user});
                promise.$promise.then(function (data){
                                if(data)if(data.length>0){
                                    $scope.actualMenus=data[0];
                                    compareMenus($scope.data,$scope.actualMenus);
                                }
                                });


                $scope.ok = function() {
                removeNodes($scope.data);
                var list=[]; list.push($scope.data);

                var promise = GarantiasServices.createMenu(list);
                handleSubmitServicePromise(promise,null);

                $uibModalInstance.dismiss('cancel');
                };

                $scope.cancel = function() {
                  $scope.showModal = false;
                  $uibModalInstance.dismiss('cancel');
                };

                 $scope.cancel = function(node) {
                  node.active = (!node.active);
                };

        }

        function compareNodes(node1, node2){
            if(node1.hasOwnProperty("nodes")&&node2.hasOwnProperty("nodes"))
                compareNodes(node1.nodes,node2.nodes);
            for(var i=0;i<node1.length;i++){
                for(var j=0;j<node2.length;j++){
                    if(node1[i].hasOwnProperty("nodes")&&node2[j].hasOwnProperty("nodes"))
                                compareNodes(node1[i].nodes,node2[j].nodes);
                    try{
                        if(node1[i].label==node2[j].label){
                            node1[i].active=true;
                            break;
                        }
                    }catch(e){

                    }
                }
            }
        }
         function removeNodes(node){
            removeNode(node.nodes);
         }
        function removeNode(node1){
            if(node1.hasOwnProperty("nodes"))
                removeNode(node1.nodes);
            for(var i=0;i<node1.length;i++){
                if(node1[i].hasOwnProperty("nodes"))
                            removeNode(node1[i]);
                try{
                    if(!node1[i].active){
                        node1.splice(i,1);
                        i--;
                    }
                }catch(e){

                }
            }
        }
        function compareMenus(allMenus, userMenus){
            compareNodes(allMenus.nodes, userMenus.nodes);
        }
    })();
