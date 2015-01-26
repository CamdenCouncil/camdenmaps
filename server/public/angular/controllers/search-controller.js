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
        "$http",
        function ($scope, $stateParams, $location, $http) {

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

            // if($scope.results === []) {
                console.log("results SEARCH-CONTROLLER line 42", $scope.results);
                //populate results when response is received
                $http.get("/services/" + $stateParams.service)
                    .success(function success (data) {
                        console.log("SEARCH-CONTROLLER line 44 http get");
                        $scope.update("results", data.properties);
                        $scope.addMarkers();
                    });
            // }

            //NOTE if create single function (other one in location controller) you will need to check if location marker "m0" is present
            $scope.$on('leafletDirectiveMarker.click', function(e, args) {
            // Args will contain the marker name and other relevant information      

                //resets any existing highlighted marker 
                if($scope.activeMarker) {
                    $scope.activeMarker.icon.iconUrl = "../img/icons/marker-hi.png";
                    $scope.update("activeMarker", 0);
                }

                //changes colour of marker selected
                $scope.markers[args.markerName].icon.iconUrl = "../img/icons/yellow-marker.png";                    

                //sets active marker so it can be reset when user clicks elsewhere
                $scope.activeMarker = $scope.markers[args.markerName];
                console.log("active marker SEARCH-CONTROLLER", $scope.activeMarker);


                path    = $scope.address ? "/home/" + $stateParams.service + "/location/" + $scope.address + "/" + $scope.markers[args.markerName].name
                        : "/home/" + $stateParams.service + "/search/" + $scope.markers[args.markerName].name;
                
                $location.path(path);

                
                $scope.update("centre", {
                    lat: args.leafletEvent.latlng.lat,
                    lng: args.leafletEvent.latlng.lng,
                    zoom: 15
                });
            });


            $scope.$on('leafletDirectiveMap.click', function(e, args) {
                // Args will contain the marker name and other relevant information       
                
                if($scope.activeMarker) {
                    $scope.activeMarker.icon.iconUrl = "../img/icons/marker-hi.png";
                    $scope.update("activeMarker", 0);
                }

                path    = $scope.address ? "/home/" + $stateParams.service + "/location/" + $scope.address
                        : "/home/" + $stateParams.service + "/search";
                    
                $location.path(path);
            });

            //redirects to next state when provided with address
            $scope.search = function search () {
                if ($scope.address) {
                    path = "/home/" + $stateParams.service + "/location/" + $scope.address;
                    $location.path(path);
                } else {
                    $scope.error = "Please enter an address";
                } 
            };

            $scope.searchAgain = function searchAgain () {
                $location.path("/home/services");
                $scope.update("markers", {});
                $scope.update("locationSelected", {});
                $scope.update("centre", {
                        lat: 51.535923,
                        lng: -0.139991,
                        zoom: 14
                    });
            };

            $scope.listResults = function listResults () {
                if($scope.activeMarker) {
                    $scope.activeMarker.icon.iconUrl = "../img/icons/marker-hi.png";
                    $scope.update("activeMarker", 0);
                }  

                destination = "/home/"+$stateParams.service+"/search/list"; 
                $location.path(destination);
                
            };

            $scope.exit = function exit () {
                var current = $location.path();
                destination = current.substring(0, current.indexOf("/list"));
                $location.path(destination);

            };

            $scope.toggle = function toggle() {
                if($location.path().indexOf("/list") > -1) { 
                    return $scope.exit(); 
                } else {
                    return $scope.listResults();
                }
            };
            
        }
    ];
}());
