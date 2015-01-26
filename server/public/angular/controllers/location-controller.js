/******************************
*   LOCATION-CONTROLLER.JS
*
******************************/

//TODO: Add handler for List Results and Search Again buttons
//Broken results: recyling, connexions... these could be all results with fewer than 8 results becuase of hard coding 8 markers

;(function () {
    "use strict";

    module.exports = [
        "$scope",
        "$stateParams",
        "markerHandlers",
        "apiSearch",
        "buttonHandlers",
        function ($scope, $stateParams, markerHandlers, apiSearch, buttonHandlers) {

            console.log("LOCATION-CONTROLLER");

            // Ensuring that the service that displays is decoded
            $scope.service = decodeURI($stateParams.service);

            // Ensuring that the service name in the URL is Encoded
            $stateParams.service = encodeURIComponent($scope.service);

            // Args will contain the marker name and other relevant information   
            $scope.$on('leafletDirectiveMarker.click', markerHandlers.markerClick($scope));

            // Args will contain the marker name and other relevant information 
            $scope.$on('leafletDirectiveMap.click', markerHandlers.mapClick($scope));


            //model for image icon
            $scope.icon = require("../menu.json").filter(function filterImg (item) {
                var name = item.title + item.text;
                return name.toLowerCase() === $scope.service.toLowerCase();
            })[0].img;
            
            if(!$scope.locationSelected.hasOwnProperty("Area") ){
                //reloads $scope.results with new data based on address 
                apiSearch.search($stateParams.service, $stateParams.address)
                    .success(function success (data) {
                        $scope.updateResults(data.properties);
                        $scope.update("locationSelected", data.location);
                        $scope.addMarkers();
                        $scope.update("centre", {
                            lat: Number($scope.locationSelected.Latitude),
                            lng: Number($scope.locationSelected.Longitude),
                            zoom: 15
                        });
                    });
            }

            if($stateParams.address) { console.log("address length", $stateParams.address.replace(/\s/g, "").length); }

            //this will uppercase postcodes and capitalise street addresses 
            $scope.address  = $stateParams.address.replace(/\s/g, "").length < 7
                            ? $stateParams.address.toUpperCase()
                            : $stateParams.address.replace(/\b./g, function(m){ return m.toUpperCase(); });


            $scope.searchAgain = buttonHandlers.searchAgain($scope);

            $scope.toggle = buttonHandlers.toggle($scope);


        }
    ];
}());
