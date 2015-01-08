/************************************************************************************
*   APP.JS
*   Description: Define core angular module
*   Use: Initialize core angular module and register controllers, directives and services.i
*
*************************************************************************************/

//TODO: Find out why it only works when controllers and services are registered directly
//TODO: Find out why controllers only work when written directly here rather than requiring (browserify not working properly)

;(function () {
    "use strict";

    var angular = require("angular");

    angular.module("maps", [
            require("angular-ui-router"),
 //           require("./controllers/controllers.js"), 
 //           require("./directives/directive.js"), 
 //           require("./services/service.js")
    ])


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~CONTROLLERS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        .controller("RootController", [
            "$scope",
            function ($scope) {
                
                //initialize $scope.results at root level
                $scope.results = [];

            }  
        ])

        .controller("LandingController", [
            "$scope",
            function ($scope) {
                
                //stores function names and corresponding paths for landing-page buttons
                $scope.buttons = [
                    {
                        id: "findYourNearest",
                        title: "Find Your Nearest",
                        path: "root.landing.services",
                        iconUrl: "img/icons/find-your-nearest.svg"
                    },
                    {
                        id: "aboutYourNeighbourhood",
                        title: "About Your Neighbourhood",
                        path: "/neighbourhood/search",
                        iconUrl: "img/icons/your-neighbourhood.svg"
                    },
                    {
                        id: "liveStreetworks",
                        title: "Live Streetworks",
                        path: "/streetworks/search",
                        iconUrl: "img/icons/streetworks.svg"
                    }
                ]; 
                
            }
        ])

        .config( require("./config.js") ) 
        
        .controller("ServicesController", [
            "$scope",
            "$location",
            "$http",
            //"menu",
            function ($scope, $location, $http/*, menu*/) {
         

                //***************** Initialize menu and variables **************
               
                //current index of visibleItems within currentCategory
                var currentIndex = 0, 
                //number of items visible in menu
                    numberOfItems = 3,
                //current position in the menu
                    currentPosition = 0,
                //all items in current category
                    currentCategory = [],
                //stores full menu
                    menu = [];
                //stores currently visible items
                $scope.visibleItems = [];
               
               
                //****************** Menu population functions ***************** 
                
                //makes visible 4 items from current category
                function getVisibleItems(index) {
                    $scope.visibleItems = currentCategory[index];
                }
                
                //handler that either redirects user or opens new category 
                function clickHandler (item) {
                    if (item.type === "service") {
                        var path = "/" + item.text + "/search";
                        $location.path(path);
                    } else if (item.type === "category") {
                        currentIndex = 0;
                        currentPosition = item.id;
                        getCurrentCategory(currentPosition, numberOfItems);
                        getVisibleItems(currentIndex);
                    }
                }
                
                //adds click handler functions to menu items
                function addClickHandler (item) {
                    return function () {
                        clickHandler(item)
                    };
                }
                
                //populates currentCategory with items in current position in menu
                function getCurrentCategory(positionInMenu, amountPerPage) {
                    currentCategory = [];
                    var fullCategory = menu.filter(function (item) {
                        return Number(item.parentId) === Number(positionInMenu);
                    });
                    var i, index = 0;
                    for (i = 0; i < fullCategory.length; i += 1) {
                        if (i && i % amountPerPage === 0) {
                            index = i / amountPerPage;
                            currentCategory[index] = [];
                        } else if (!i) {
                            currentCategory[index] = [];
                        }
                        fullCategory[i].handler = addClickHandler(fullCategory[i]);
                        currentCategory[index].push(fullCategory[i]);
                    }
                }
                
                //loads menu 
                $http.get("menu.json")
                    .success(function success (data) {
                        menu = data;
                        getCurrentCategory(currentPosition, numberOfItems);
                        getVisibleItems(currentIndex);
                    });

                //********************* Menu control functions ******************
               
                //loads next page of items
                $scope.nextItems = function nextItems () {
                    if (currentIndex === currentCategory.length-1) {
                        return;
                    } else {
                        currentIndex += 1;
                        getVisibleItems(currentIndex);
                    }
                }
                //loads previous page of items
                $scope.prevItems = function prevItems () {
                    if (currentIndex === 0) {
                        return;
                    } else {
                        currentIndex -= 1;
                        getVisibleItems(currentIndex);
                    }
                }
                //loads parent category
                $scope.backOneCategory = function backOneCategory () {
                    console.log(currentCategory);
                    if (currentPosition === 0) {
                        return;
                    } else {
                        currentPosition = menu.filter(function(item){
                            return item.id === currentPosition;
                        })[0].parentId;
                        currentIndex = 0;
                        getCurrentCategory(currentPosition, numberOfItems);
                        getVisibleItems(currentIndex);
                    }
                }
               
                //execute function to solve scoping issues with ng-repeat & ng-click
                $scope.execute = function execute (fn) {
                    fn();
                }

            }
        ])
        
        
//        .controller("RootController", require("./controllers/root-controller.js"))  
//        .controller("LandingController", require("./controllers/landing-controller.js"))  
//        .service("apiSearch", require("./services/api-search.js"));
    }());
