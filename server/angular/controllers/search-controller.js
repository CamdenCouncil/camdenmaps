/********************************
*   SEARCH-CONTROLLER.JS
*
********************************/

//TODO: Better error handling
//TODO: Must have input validation for address/street name: HOW??? 


;(function () {
    "use strict";

    module.exports = [
        "$scope",
        "$stateParams",
        "$location",
        "apiSearch",
        "markers",
        "markerHandlers",
        "buttonHandlers",
        function ($scope, $stateParams, $location, apiSearch, markers, markerHandlers, buttonHandlers) {

            //model for search query
            $scope.address = "";
            //model for error messages
            $scope.error = "";
            //model for title

            // Ensuring that the service that displays is decoded
            $scope.service = decodeURI($stateParams.service);

            // Ensuring that the service name in the URL is Encoded
            $stateParams.service = encodeURIComponent($scope.service);

            //model for image icon
            $scope.icon = require("../menu.json").filter(function filterImg (item) {
                var name = item.title + item.text;
                return name.toLowerCase() === $scope.service.toLowerCase();
            })[0].img;

            var path,
                destination;

            apiSearch.search($stateParams.service)
                    .success(function success (data) {
                        $scope.update("results", data.properties);
                        $scope.addMarkers();
                        $scope.centre.zoom = markers.zoomCheck($scope)();
                    });
            // }

            $scope.$on('leafletDirectiveMarker.click', markerHandlers.markerClick($scope));

            $scope.$on('leafletDirectiveMap.click', markerHandlers.mapClick($scope));

            //redirects to next state when provided with address
            $scope.search = function search () {
                if($scope.address) {
                    if($scope.activeMarker) {
                        $scope.activeMarker.icon.iconUrl = "../img/icons/marker-hi.png";
                        $scope.update("activeMarker", 0);
                    }
                    path = "/home/" + $stateParams.service + "/location/" + $scope.address;
                    $location.path(path);

                }
            };

            $scope.searchAgain = buttonHandlers.searchAgain($scope, "/home/services");

            $scope.toggle = buttonHandlers.toggle($scope);
            
        }
    ];
}());