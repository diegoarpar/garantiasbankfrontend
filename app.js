var app = angular.module('wpc', ['xeditable'
                        , 'ngRoute'
                        , 'ui.bootstrap'
                        ,'ngTable'
                        , 'ngTableToCsv'
                        , 'ngResource'
                        , 'ngFileUpload'
                        , 'pdf'
                        , 'ui.router'
                        ,'ngAria'
                        ,'ngAnimate'
                        ,'ngMaterial'
                        ,'md.data.table'
                        ,'ngSanitize'
                        , 'mgcrea.ngStrap'
                        , 'ngStorage'
                        ,'ui.tree'
                        ,'io-barcode'
                        ]);


app.constant('ApiAuth', {
    url: 'http://archivo.diego.com.co:8081/autentication/'
    //2022
});
app.constant('ApiGarantias', {
    url: 'http://archivo.diego.com.co:8081/garantias/'
    //2020
});
app.constant('ApiFiles', {
    url: 'http://archivo.diego.com.co:8081/CMS/'
    //2024
});
app.constant('cApp', {
    tenant: ''
});


function inSession($scope, AuthenticationFactory, window,principal) {
                if(!window.localStorage.getItem("tenant")){
                 console.log("verify "+location.hostname);
                 var rta = AuthenticationFactory.tenant({origin:location.hostname});
                 rta.$promise.then(function(data) {
                            if(!data[0]) alert ("este sitio no se encuentra configurado");
                            if(data[0]){
                                window.localStorage["tenant"]=data[0].name;

                                window.location.reload();
                                setStyleSheet(data[0].name);
                                //window.location.href=window.location.href;
                            }
                         });

                }else{
                    setStyleSheet(window.localStorage.getItem("tenant"));
                }

                if(!principal){
                    if(!window.localStorage.getItem("token")){
                        alert("Para hacer uso de los módulos, es necesario ingresar");
                        window.location.href = '#/product-list-portales';
                    }
                }
                //alert (cApp.tenant);

  }

