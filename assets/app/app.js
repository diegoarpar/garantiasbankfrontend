var app = angular.module('wpc', ['xeditable', 'ngRoute', 'ui.bootstrap','ngTable', 'ngTableToCsv', 'ngResource', 'ngFileUpload', 'pdf', 'ui.router','ngAria','ngAnimate','ngMaterial','ngSanitize', 'mgcrea.ngStrap', 'ngStorage','ui.tree','io-barcode']);

app.constant('ApiApp', {
    url: 'http://institucion.certicamara.co/reports/api/insert-database/'
})
app.constant('ApiAuth', {
    url: 'http://localhost:2022/autentication/'
});
app.constant('ApiGarantias', {
    url: 'http://localhost:2020/garantias/'
});
app.constant('ApiFiles', {
    url: 'http://localhost:2024/CMS/'
});
app.constant('cApp', {
    tenant: ''
});


function inSession($scope, AuthenticationFactory, window,principal) {
                if(!window.sessionStorage.getItem("tenant")){
                 console.log("verify "+location.hostname);
                 var rta = AuthenticationFactory.tenant({origin:location.hostname});
                 rta.$promise.then(function(data) {
                            if(!data[0]) alert ("este sitio no se encuentra configurado");
                            if(data[0]){
                                window.sessionStorage["tenant"]=data[0].name;
                                window.location.reload();
                                setStyleSheet(data[0].name);
                            }
                         });

                }else{
                    setStyleSheet(window.sessionStorage.getItem("tenant"));
                }

                if(!principal){
                    if(!window.localStorage.getItem("token")){
                        alert("Para hacer uso de los módulos, es necesario ingresar");
                        window.location.href = '#/product-list-portales';
                    }
                }
                //alert (cApp.tenant);

  }


app.config(['$routeProvider', function ($routeProvider) {

        $routeProvider.when('/login', {
                templateUrl: 'assets/app/authentication/view/login.html',
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
        $routeProvider.when('/carga-directa-bodega', {
                templateUrl: 'assets/app/entities/garantias/carga-directa/view/carga-directa-garantias.html',
                controller: 'CargaDirectaController'
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
                templateUrl: 'assets/app/authentication/view/administrador-usuarios.html',
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
        $routeProvider.when('/dynamic-search', {
                                templateUrl: 'assets/app/entities/dynamic-search/view/dynamic-search.html',
                                controller: 'DynamicSearchController'
                            }
                );
        $routeProvider.when('/dynamic-search-functionary', {
                                templateUrl: 'assets/app/entities/dynamic-search/view/dynamic-search-functionary.html',
                                controller: 'DynamicSearchController'
                            }
                );
        $routeProvider.when('/regionales', {
                                templateUrl: 'assets/app/entities/garantias/regionales/view/administrar-regionales.html',
                                controller: 'ConfiguracionRegionalController'
                            }
        );

        $routeProvider.otherwise({});
        //$routeProvider.otherwise({redirectTo: '/'});
    }
    ]
);


