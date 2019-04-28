app.config(['$routeProvider', function ($routeProvider) {

        $routeProvider.when('/login', {
                templateUrl: 'assets/app/authentication/view/login.html',
                controller: 'LoginController'
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
        $routeProvider.when('/modalFiltro', {
                                templateUrl: 'assets/app/entities/modal/filtro/view/filtro-busqueda.html',
                                controller: 'FiltrarBusquedaController'
                            }
        );

        $routeProvider.when('/modalBarras', {
                                        templateUrl: 'assets/app/entities/modal/filtro/view/modal-barras.html',
                                        controller: 'GenerarBarrasController'
                                    }
                );
        $routeProvider.when('/AdministrarPermisos', {
                                templateUrl: 'assets/app/authentication/view/administrador-permisos.html',
                                controller: 'AdministradorPermisosController'
                            }
        );
        $routeProvider.when('/AdministrarPermisos', {
                                        templateUrl: 'assets/app/authentication/view/administrador-permisos.html',
                                        controller: 'AdministradorPermisosController'
                                    }
                );
        $routeProvider.when('/modalReport', {
                                     templateUrl: 'assets/app/entities/modal/filtro/view/filtro-reportes.html',
                                     controller: 'FiltrarBusquedaController'
                                 }
             );
        $routeProvider.when('/dynamic-search-report', {
                                        templateUrl: 'assets/app/entities/garantias/report/view/report-archivo.html',
                                        controller: 'ReporteArchivoController'
                                    }
                );
        $routeProvider.when('/administrador-reportes', {
                                                templateUrl: 'assets/app/entities/garantias/report/view/report-administrator.html',
                                                controller: 'ReportAdministratorController'
                                            }

        );
        $routeProvider.when('/radicacion-tramite', {
                                                        templateUrl: 'assets/app/entities/ventanilla/radicacion/view/radicacion-tramite.html',
                                                        controller: 'VentanillaRadicacionTramiteController'
                                                    }

                );
         $routeProvider.when('/administrar-ubicacion-bodega', {
                                             templateUrl: 'assets/app/entities/garantias/bodega/view/administrador-bodega.html',
                                             controller: 'AdministradorBodegaController'
                                             }

         );
         $routeProvider.when('/ubicar-contenido-bodega', {
                                              templateUrl: 'assets/app/entities/garantias/bodega/view/ubicar-contenido.html',
                                              controller: 'UbicarContenidoBodegaController'
                                              }

          );

          $routeProvider.when('/administrador-camposBusqueda', {
                                                templateUrl: 'assets/app/entities/garantias/campos/busqueda/view/administrador-camposbusqueda.html',
                                                controller: 'AdministradorCamposBusqueda'
                                                }

            );
            $routeProvider.when('/administrador-prestamos-bodega', {
                                                templateUrl: 'assets/app/entities/garantias/bodega/view/administrador-prestamos-bodega.html',
                                                controller: 'AdministrarPrestamosBodegaController'
                                                }

            );
        $routeProvider.otherwise({});
        //$routeProvider.otherwise({redirectTo: '/'});
    }
    ]
);


