
(function () {
        'use strict';
        angular.module("wpc")
            .controller('ConfiguracionArchivoController', ConfiguracionArchivoController);

        ConfiguracionArchivoController.$inject =
            ['$scope','AuthenticationFactory', 'GarantiasServices', 'NumberService', 'CamposGenericosServices',
                'CamposEspecificosServices', '$location', 'ngTableParams', '$filter', '$window','$controller','$sessionStorage'];

        function ConfiguracionArchivoController($scope,AuthenticationFactory, GarantiasServices, NumberService, CamposGenericosServices,
                                 CamposEspecificosServices, $location, ngTableParams, $filter, $window,ngMaterial,$controller,$sessionStorage) {

        $window.sessionStorage.setItem("tenant","pruebas");
      inSession($scope,AuthenticationFactory,$window);
            $scope.showContent = function ($fileContent) {
                var jsontext = $fileContent.split('\n');
                jsontext = txtToJson(jsontext, $scope);
                $scope.digital = JSON.parse(jsontext);
            };

         $scope.panels = [
            {id:"fondos",title:'Fondos', body: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.'}
            ,{id:"subfondos",title:'Subfondos', body: 'Food truck fixie locavore, accusamus mcsweeney\'s marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee.'}
            ,{id:"secciones",title:'Secciones', body: 'Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney\'s organic lomo retro fanny pack lo-fi farm-to-table readymade.'}
            ,{id:"subsecciones",title:'Subsecciones', body: 'Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney\'s organic lomo retro fanny pack lo-fi farm-to-table readymade.'}
            ,{id:"series",title:'Serie', body: 'Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney\'s organic lomo retro fanny pack lo-fi farm-to-table readymade.'}
            ,{id:"subseries",title:'Subserie', body: 'Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney\'s organic lomo retro fanny pack lo-fi farm-to-table readymade.'}
            ,{id:"tiposdocumentales",title:'Tipos de documentos', body: 'Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney\'s organic lomo retro fanny pack lo-fi farm-to-table readymade.'}
            ,{id:"nivelacceso",title:'Niveles de acceso', body: 'Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney\'s organic lomo retro fanny pack lo-fi farm-to-table readymade.'}
          ];


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
