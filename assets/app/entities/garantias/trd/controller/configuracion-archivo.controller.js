
(function () {
        'use strict';
        angular.module("wpc")
            .controller('ConfiguracionArchivoController', ConfiguracionArchivoController);

        ConfiguracionArchivoController.$inject =
            ['$scope','AuthenticationFactory', 'GarantiasServices', 'NumberService', 'CamposGenericosServices',
                'CamposEspecificosServices','CamposParametricosServices', '$location', 'ngTableParams', '$filter', '$window','$controller','$sessionStorage'];

        function ConfiguracionArchivoController($scope,AuthenticationFactory, GarantiasServices, NumberService, CamposGenericosServices,
                                 CamposEspecificosServices,CamposParametricosServices, $location, ngTableParams, $filter, $window,ngMaterial,$controller,$sessionStorage) {


            inSession($scope,AuthenticationFactory,$window);

         var datafondo=CamposParametricosServices.show({nombreparametrica:'fondo',tenant:window.sessionStorage.getItem("tenant")});
         var datasubfondo=CamposParametricosServices.show({nombreparametrica:'subfondo',tenant:window.sessionStorage.getItem("tenant")});
         var dataseccion=CamposParametricosServices.show({nombreparametrica:'seccion',tenant:window.sessionStorage.getItem("tenant")});
         var datasubseccion=CamposParametricosServices.show({nombreparametrica:'subseccion',tenant:window.sessionStorage.getItem("tenant")});
         var dataserie=CamposParametricosServices.show({nombreparametrica:'serie',tenant:window.sessionStorage.getItem("tenant")});
         var datasubserie=CamposParametricosServices.show({nombreparametrica:'subserie',tenant:window.sessionStorage.getItem("tenant")});
         var datatipodocumento=CamposParametricosServices.show({nombreparametrica:'tipodocumento',tenant:window.sessionStorage.getItem("tenant")});
         $scope.panels = [
            {id:"fondos",data:datafondo,title:'Fondos', body: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.'}
            ,{id:"subfondos",data:datasubfondo,title:'Subfondos', body: 'Food truck fixie locavore, accusamus mcsweeney\'s marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee.'}
            ,{id:"secciones",data:dataseccion,title:'Secciones', body: 'Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney\'s organic lomo retro fanny pack lo-fi farm-to-table readymade.'}
            ,{id:"subsecciones",data:datasubseccion,title:'Subsecciones', body: 'Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney\'s organic lomo retro fanny pack lo-fi farm-to-table readymade.'}
            ,{id:"series",data:dataserie,title:'Serie', body: 'Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney\'s organic lomo retro fanny pack lo-fi farm-to-table readymade.'}
            ,{id:"subseries",data:datasubserie,title:'Subserie', body: 'Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney\'s organic lomo retro fanny pack lo-fi farm-to-table readymade.'}
            ,{id:"tiposdocumentales",data:datatipodocumento,title:'Tipos de documentos', body: 'Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney\'s organic lomo retro fanny pack lo-fi farm-to-table readymade.'}
            ,{id:"nivelacceso",data:datafondo,title:'Niveles de acceso', body: 'Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney\'s organic lomo retro fanny pack lo-fi farm-to-table readymade.'}
          ];
        $scope.trd={};
        $scope.select = function (data){
             $scope.trd[data.nombreparametrica]=data;
             alert("alert"+$scope.trd[data.nombreparametrica].value);
        };
         $scope.multiplePanels = {
             activePanels: []
           };
        $scope.pushPanel = function() {
            $scope.panels.push({title: 'Collapsible Group Item #4', body: 'Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid.'});
        };



        $scope.data = [{name: "Moroni", age: 50},
                         {name: "Tiancum", age: 43},
                         {name: "Jacob", age: 27},
                         {name: "Nephi", age: 29},
                         {name: "Enos", age: 34}
                         ];
        $scope.gridOptions = { data: 'myData' };

        }
    })();
