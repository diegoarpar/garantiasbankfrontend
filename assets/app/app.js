var app= angular.module('wpc', ['xeditable', 'ngRoute','ui.bootstrap','ngTable','ngTableToCsv','ngResource']);

app.constant('ApiApp', {
  url: 'http://institucion.certicamara.co/reports/api/insert-database/'
 })
 app.constant('ApiAuth', {
  url: 'http://localhost:2022/insert-database/'
 })
 app.constant('ApiGarantias', {
  url: 'http://localhost:2020/garantias/'
 })
app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'assets/app/authentication/login.html',
            controller: 'LoginController'}
        );

        $routeProvider.when('/user-detail/:id', {
            templateUrl: 'assets/app/user/user-details.html',
            controller: 'ProductController'}
        );

        $routeProvider.when('/product-list-portales', {
            templateUrl: 'assets/app/entities/product/list-portales.html',
            controller: 'ProductController'}
        );

        $routeProvider.when('/product-list-portal-funcionario', {
            templateUrl: 'assets/app/entities/product/portal-funcionario.html',
            controller: 'ProductController'}
        );

        $routeProvider.when('/product-list-consultaExpedienteDigital', {
            templateUrl: 'assets/app/entities/product/portal-consulta-expediente-digital.html',
            controller: 'ProductController'}
        );
        $routeProvider.when('/product-list-corporativo', {
            templateUrl: 'assets/app/entities/product/listCorporativo.html',
            controller: 'ProductController'}
        );
        $routeProvider.when('/product-list-garantias', {
            templateUrl: 'assets/app/entities/product/list-garantias.html',
            controller: 'ProductController'}
        );
        $routeProvider.when('/product-list-completitud', {
            templateUrl: 'assets/app/entities/product/list-completitud.html',
            controller: 'ProductController'}
        );
        $routeProvider.when('/product-list-alistamiento-tulas', {
            templateUrl: 'assets/app/entities/product/alistamiento-tulas.html',
            controller: 'ProductSedeElectronicaController'}
        );
        $routeProvider.when('/product-list-acuse-recibido-garantia', {
            templateUrl: 'assets/app/entities/product/acuse-recibido-garantias.html',
            controller: 'ProductSedeElectronicaController'}
        );
        $routeProvider.when('/product-list-recepcion-tulas-bodega', {
            templateUrl: 'assets/app/entities/product/recepcion-tulas-bodega.html',
            controller: 'ProductSedeElectronicaController'}
        );
        $routeProvider.when('/product-list-recepcion-garantia-contenido', {
            templateUrl: 'assets/app/entities/product/recepcion-garantia-contenido.html',
            controller: 'ProductSedeElectronicaController'}
        );
        $routeProvider.when('/administrador-usuarios', {
                templateUrl: 'assets/app/authentication/administrador-usuarios.html',
                controller: 'AdministradorUsuariosController'}
         );
    

        $routeProvider.otherwise({redirectTo: '/'});
            }
        ]
        );

