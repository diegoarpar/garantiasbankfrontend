var app= angular.module('wpc', ['xeditable', 'wpc.services', 'wpc.controllers','ngRoute','ui.bootstrap','ngTable','ngTableToCsv']);

app.constant('ApiApp', {
  url: 'http://institucion.certicamara.co/reports/api/insert-database/'
 })
 app.constant('ApiAuth', {
  url: 'http://institucion.certicamara.co/autentication/api/insert-database/'
 })
 app.constant('ApiGarantias', {
  url: 'http://localhost:2020/garantias/'
 })
app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {templateUrl: 'pages/login/login.html', controller: 'LoginControl'});
        $routeProvider.when('/user-detail/:id', {templateUrl: 'partials/user-detail.html', controller: 'ProductControl'});
        $routeProvider.when('/product-list-portales', {templateUrl: 'pages/products/listportales.html', controller: 'ProductControl'});
        $routeProvider.when('/product-list-portalFuncionario', {templateUrl: 'pages/products/portalFuncionario.html', controller: 'ProductControl'});
        
        $routeProvider.when('/product-list-consultaExpedienteDigital', {templateUrl: 'pages/products/portalConsultaExpedienteDigital.html', controller: 'ProductControl'});
        $routeProvider.when('/product-list-corporativo', {templateUrl: 'pages/products/listCorporativo.html', controller: 'ProductControl'});
        $routeProvider.when('/product-list-garantias', {templateUrl: 'pages/products/listGarantias.html', controller: 'ProductControl'});
        $routeProvider.when('/product-list-completitud', {templateUrl: 'pages/products/listcompletitud.html', controller: 'ProductControl'});
        $routeProvider.when('/product-list-alistamiento-tulas', {templateUrl: 'pages/products/alistamiento-tulas.html', controller: 'ProductControlSedeElectronica'});
        $routeProvider.when('/product-list-acuse-recibido-garantia', {templateUrl: 'pages/products/acuse-recibido-garantias.html', controller: 'ProductControlSedeElectronica'});
        $routeProvider.when('/product-list-recepcion-tulas-bodega', {templateUrl: 'pages/products/recepcion-tulas-bodega.html', controller: 'ProductControlSedeElectronica'});
        $routeProvider.when('/product-list-recepcion-garantia-contenido', {templateUrl: 'pages/products/recepcion-garantia-contenido.html', controller: 'ProductControlSedeElectronica'});
        
        $routeProvider.otherwise({redirectTo: '/'});
            }
        ]
        );

