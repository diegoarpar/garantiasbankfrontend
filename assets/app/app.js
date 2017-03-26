var app = angular.module('wpc', ['xeditable', 'ngRoute', 'ui.bootstrap','ngTable', 'ngTableToCsv', 'ngResource', 'ngFileUpload', 'pdf', 'ui.router','ngAria','ngAnimate','ngMaterial','ngSanitize', 'mgcrea.ngStrap', 'ngStorage','ui.tree']);

app.constant('ApiApp', {
    url: 'http://institucion.certicamara.co/reports/api/insert-database/'
})
app.constant('ApiAuth', {
    url: 'http://localhost:2022/insert-database/'
});
app.constant('ApiGarantias', {
    url: 'http://localhost:2020/garantias/'
});
app.constant('cApp', {
    tenant: ''
});

        function inSession($scope, AuthenticationFactory, window) {
                        if(!window.sessionStorage.getItem("tenant")){
                         var rta = AuthenticationFactory.tenant();
                         rta.$promise.then(function(data) {
                                    if(!data[0]) alert ("este sitio no se encuentra configurado");
                                    if(data[0]){
                                        window.sessionStorage["tenant"]=data[0].name
                                        window.location.reload();
                                    }
                                 });

                        }
                        //alert (cApp.tenant);

          }


app.config(['$routeProvider', function ($routeProvider) {

        $routeProvider.when('/login', {
                templateUrl: 'assets/app/authentication/login.html',
                controller: 'LoginController'
            }
        );

        $routeProvider.when('/product-list-portales', {
                templateUrl: 'assets/app/entities/product/list-portales.html',
                controller: 'ProductController'
            }
        );

        $routeProvider.when('/product-list-consultaExpedienteDigital', {
                templateUrl: 'assets/app/entities/product/portal-consulta-expediente-digital.html',
                controller: 'ProductController'
            }
        );
        $routeProvider.when('/product-list-completitud', {
                templateUrl: 'assets/app/entities/product/list-completitud.html',
                controller: 'ProductController'
            }
        );
        $routeProvider.when('/product-list-alistamiento-tulas', {
                templateUrl: 'assets/app/entities/garantias/alistamiento-tula/view/alistamiento-tulas.html',
                controller: 'AlistamientoTulaController'
            }
        );
        $routeProvider.when('/product-list-acuse-recibido-garantia', {
                templateUrl: 'assets/app/entities/garantias/recepcion-garantias-cliente/view/acuse-recibido-garantias.html',
                controller: 'AcuseRecibidoGarantiasController'
            }
        );
        $routeProvider.when('/product-list-recepcion-tulas-bodega', {
                templateUrl: 'assets/app/entities/garantias/recepcion-tula-bodega/view/recepcion-tulas-bodega.html',
                controller: 'RecepcionTulaBodegaController'
            }
        );
        $routeProvider.when('/product-list-recepcion-garantia-contenido', {
                templateUrl: 'assets/app/entities/garantias/completitud/view/recepcion-garantia-contenido.html',
                controller: 'CompletitudController'
            }
        );
        $routeProvider.when('/product-list-recepcion-garantia-idoneidad', {
                templateUrl: 'assets/app/entities/garantias/idoneidad/view/recepcion-garantia-idoneidad.html',
                controller: 'IdoneidadController'
            }
        );
        $routeProvider.when('/product-list-recepcion-garantia-datos', {
                templateUrl: 'assets/app/entities/garantias/datos/view/recepcion-garantia-datos.html',
                controller: 'DatosController'
            }
        );
        $routeProvider.when('/administrador-usuarios', {
                templateUrl: 'assets/app/authentication/administrador-usuarios.html',
                controller: 'AdministradorUsuariosController'
            }
        );
        $routeProvider.when('/administrador-camposGenericos', {
                templateUrl: 'assets/app/entities/garantias/campos/genericos/view/administrador-camposgenericos.html',
                controller: 'CamposGenericosController'
            }
        );
        $routeProvider.when('/administrador-camposEspecificos', {
                templateUrl: 'assets/app/entities/garantias/campos/especificos/view/administrador-camposespecificos.html',
                controller: 'CamposEspecificosController'
            }
        );
        $routeProvider.when('/administrador-camposParametricos', {
                templateUrl: 'assets/app/entities/garantias/campos/parametricos/view/administrador-camposparametricos.html',
                controller: 'CamposParametricosController'
            }
        );
        $routeProvider.when('/ubicacion-garantias', {
                templateUrl: 'assets/app/entities/garantias/ubicacion/view/ubicacion-garantia.html',
                controller: 'UbicacionGarantiasController'
            }
        );
        $routeProvider.when('/administrador-archivo', {
                templateUrl: 'assets/app/entities/garantias/trd/view/configuracion-archivo.html',
                controller: 'ConfiguracionArchivoController'
            }
        );
        $routeProvider.when('/organigrama', {
                        templateUrl: 'assets/app/entities/garantias/tree/view/configuracion-organigrama.html',
                        controller: 'ConfiguracionOrganigramaController'
                    }
        );
        $routeProvider.when('/regionales', {
                                templateUrl: 'assets/app/entities/garantias/regionales/view/administrar-regionales.html',
                                controller: 'ConfiguracionRegionalController'
                            }
        );
        $routeProvider.otherwise({redirectTo: '/'});
    }
    ]
);


