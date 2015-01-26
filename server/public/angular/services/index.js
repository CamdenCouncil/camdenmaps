/*  SERVICE.JS
*   Description: Defines a single angular service
*   Use: Registers service with service module and injects to core module 
*/

;(function () {
    "use strict";

    angular.module("maps")

    	.service("markers", require("./markers-service.js"))
    	.service("apiSearch", require("./api-search-service.js"))
    	.service("markerHandlers", require("./marker-handlers-service.js"));



        // .service("apiSearch", require("./api-search.js"));

}());



    // angular.module("maps")

    //     .controller("RootController", require("./root-controller.js"))