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

        $routeProvider.when('/product-list-portales', {
            templateUrl: 'assets/app/entities/product/list-portales.html',
            controller: 'ProductController'}
        );

        $routeProvider.when('/product-list-consultaExpedienteDigital', {
            templateUrl: 'assets/app/entities/product/portal-consulta-expediente-digital.html',
            controller: 'ProductController'}
        );
        $routeProvider.when('/product-list-completitud', {
            templateUrl: 'assets/app/entities/product/list-completitud.html',
            controller: 'ProductController'}
        );
        $routeProvider.when('/product-list-alistamiento-tulas', {
            templateUrl: 'assets/app/entities/garantias/envio-tula-bodega/view/alistamiento-tulas.html',
            controller: 'ProductSedeElectronicaController'}
        );
        $routeProvider.when('/product-list-acuse-recibido-garantia', {
            templateUrl: 'assets/app/entities/garantias/recepcion-garantias-cliente/view/acuse-recibido-garantias.html',
            controller: 'ProductSedeElectronicaController'}
        );
        $routeProvider.when('/product-list-recepcion-tulas-bodega', {
            templateUrl: 'assets/app/entities/garantias/recepcion-tula-bodega/view/recepcion-tulas-bodega.html',
            controller: 'ProductSedeElectronicaController'}
        );
        $routeProvider.when('/product-list-recepcion-garantia-contenido', {
            templateUrl: 'assets/app/entities/garantias/completitud/view/recepcion-garantia-contenido.html',
            controller: 'ProductSedeElectronicaController'}
        );
        $routeProvider.when('/product-list-recepcion-garantia-idoneidad', {
                    templateUrl: 'assets/app/entities/garantias/idoneidad/view/recepcion-garantia-idoneidad.html',
                    controller: 'ProductSedeElectronicaController'}
                );
        $routeProvider.when('/administrador-usuarios', {
                templateUrl: 'assets/app/authentication/administrador-usuarios.html',
                controller: 'AdministradorUsuariosController'}
         );
        $routeProvider.when('/administrador-camposGenericos', {
                    templateUrl: 'assets/app/entities/garantias/campos/genericos/view/administrador-camposgenericos.html',
                    controller: 'CamposGenericosController'}
        );
        $routeProvider.when('/administrador-camposEspecificos', {
                        templateUrl: 'assets/app/entities/garantias/campos/especificos/view/administrador-camposespecificos.html',
                        controller: 'CamposEspecificosController'}
        );
        $routeProvider.when('/administrador-camposParametricos', {
                                templateUrl: 'assets/app/entities/garantias/campos/parametricos/view/administrador-camposparametricos.html',
                                controller: 'CamposEspecificosController'}
                );
        $routeProvider.otherwise({redirectTo: '/'});
            }
        ]
        );

