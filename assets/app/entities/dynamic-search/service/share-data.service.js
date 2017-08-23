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
        var _user;
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
        function setUser(user){
            _user=user;
        }
        function getUser(){
                    return _user;
                }
        return {
            setUser:setUser,
            getUser:getUser,
            set: set,
            get: get,
            getContext: getContext,
            setContxt: setContxt
        }
    }


})();




