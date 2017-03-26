/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function () {
    'use strict'
    angular.module('wpc')
        .factory('ShareService', ShareService);

    ShareService.$inject = [];

    function ShareService() {
        var savedData = {}
        var contxt;
        function set(data) {
            savedData = data;
        }

        function get() {
            return savedData;
        }

        function getContext(){
            return contxt;
        }
        function setContxt(nContext){
                    contxt= nContext;
                }

        return {
            set: set,
            get: get,
            getContext: getContext,
            setContxt: setContxt
        }
    }


})();




