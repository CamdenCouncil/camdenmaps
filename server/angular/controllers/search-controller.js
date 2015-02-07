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
            $scope.title = "Find your Nearest";
            //model for placeholder
            $scope.placeholder = "Please enter a postcode";

            // Ensuring that the service that displays is decoded
            $scope.service = decodeURI($stateParams.service);

            // Ensuring that the service name in the URL is Encoded
            $stateParams.service = encodeURIComponent($scope.service);

            try {
                //model for image icon
                $scope.icon = require("../menu.json").filter(function filterImg (item) {
                    var name = item.title + item.text;
                    return name.toLowerCase() === $scope.service.toLowerCase();
                })[0].img;
            } catch (e) {
                // don't break if image couldn't load
                console.log(e);
            } 

            var path,
                destination;

            apiSearch.search($stateParams.service)
                    .success(function success (data) {
                        if(data.hasOwnProperty("error")) {
                            // display error message
                            $scope.update("error", data.message);
                            // and redirect back to services menu to try again
                            $location.path("/home/services");
                        }
                        $scope.update("results", data.properties);
                        $scope.addMarkers();
                        $scope.centre.zoom = markers.zoomCheck($scope)();
                    })
                    .error(function error(err) {
                        return $scope.update("error", err.message);
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
    
            //back button functionality
            $scope.searchAgain = buttonHandlers.searchAgain($scope, "/home/services");
            //back button text
            $scope.backButtonText = "Pick Another Service";

            $scope.toggle = buttonHandlers.toggle($scope);
            
        }
    ];
}());
