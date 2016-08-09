var compression = require('compression') //libreria para comprimir los datos cuando los envia
var serveStatic = require('serve-static')//Manejo de los archivos de forma estatica
var express = require("express");
var server = express();

var maxAge = 86400000; //Max age for caching, currently set to single day

// compress all requests 
server.use(compression());
// Serve up content from public directory
server.use(serveStatic(__dirname + '/dist', {'maxAge': maxAge}));
//app.use(express.static(__dirname + '/dist'));

server.listen(process.env.PORT || 9050,
    function () {
        console.log('I am running on port ' + (process.env.PORT || 9050) + ' biatch');
    }
);
