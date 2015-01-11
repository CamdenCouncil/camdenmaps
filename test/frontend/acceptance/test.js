/*************************************************
*   test.js
*   Description: Acceptance tests are written here
*   Use: run tests by npm test
**************************************************/

/************************************************
*    Landing Tests go Here
*************************************************/
(function () {
    "use strict";

    describe("As a user, I want to have clear call to actions when I arrive on the landing page", function () {

        it("title to be Camden Council: Find Your Nearest", function() {

            browser.get('#/home');

            var title = browser.getTitle();

            expect(title).toEqual('Camden Council: Find Your Nearest');

        });
        describe("There are three call to actions with icons, ", function() {

            it("Find your nearest, ", function () {
                
                var findYourNearest = element(by.id('findYourNearest'));
                var nearestText = findYourNearest.element(by.tagName('h4')).getText();
                
                expect(nearestText).toEqual('Find Your Nearest');
            });
            it("About Your Neighbourhood, ", function () {

                var aboutYourNeighbourhood = element(by.id('aboutYourNeighbourhood'));
                var neighbourhoodText = aboutYourNeighbourhood.element(by.tagName('h4')).getText();
                
                expect(neighbourhoodText).toEqual('About Your Neighbourhood');
            });
            it("and Live Streetworks", function () {

                var liveStreetworks = element(by.id('liveStreetworks'));
                var streetworksText = liveStreetworks.element(by.tagName('h4')).getText();
                
                expect(streetworksText).toEqual('Live Streetworks');
            });

        });
        it("The header includes Camden Logo and correct alternate text", function() {

            var logo = element(by.id('camden-logo'));
            var alt = logo.getAttribute("alt");

            expect(logo.isDisplayed()).toBe(true);
            expect(alt).toBe('Camden');
        });
        it("page loads, the map renders", function() {

            var leaflet = element(by.css('.leaflet-tile'));

            expect(leaflet.isDisplayed()).toBe(true);

        });
    });


/**********************************************
*   Service and Service Category Tests
***********************************************/

    describe("As a user, I want to be able to enter a Camden postcode so that I can find the nearest point of interest to me.", function () {

        describe("Find Your Nearest option is clicked", function () {
            it("section is revealed", function () {

                browser.get('#/home');

                element(by.id('findYourNearest')).click();    
                expect(element(by.id('find-your-nearest')).isDisplayed()).toBe(true);
            });

            it("with 10 service categories, only 3 visable", function () {

                var serviceCategories = element.all(by.repeater('item in visibleItems'));

                expect(serviceCategories.count()).toBe(3);
            });
        });

        describe("navigation arrows are functioning:", function () {
            it("back arrow ", function () {

                var serviceCategories = element(by.repeater('item in visibleItems'));
                var text = serviceCategories.element(by.tagName('h4')).getText();

                element(by.css('[ng-click="execute(item.handler)"]')).click();
                element(by.css('[ng-click="backOneCategory()"]')).click();

                var serviceCategories2 = element(by.repeater('item in visibleItems'));
                var text2 = serviceCategories.element(by.tagName('h4')).getText();

                expect(text).toEqual(text2);

            });
            it("and carousal arrows", function () {

                var firstServiceCategories = element(by.repeater('item in visibleItems')).element(by.tagName('h4')).getText();
                element(by.css('[ng-click="nextItems()"]')).click();
                var secondServiceCategories = element(by.repeater('item in visibleItems')).element(by.tagName('h4')).getText();

                expect(firstServiceCategories).not.toEqual(secondServiceCategories);

                element(by.css('[ng-click="prevItems()"]')).click();
                var thirdServiceCategories = element(by.repeater('item in visibleItems')).element(by.tagName('h4')).getText();

                expect(firstServiceCategories).toEqual(thirdServiceCategories);
            });
        });
	});

/**********************************************
*   After service is selected tests
***********************************************/
    describe("As a user, I want to enter a postcode to search the closest results from me", function () {
        it("a postcode is entered, then it is validated to ensure it is a valid Camden postcode.", function () {
         //Need to test
        });
        it("an invalid postcode is entered, then a message informs the user that the postcode is either not correct or in Camden.", function () {

        });
        describe ("given a valid camden postcode is entered", function () {
            it("list button appears", function () {

            });
            it("list button is clicked and items list", function () {

            });
            it("list items also display on map ", function () {

            });
        });

    });
//Above needs to be tested with street addresses and area codes as well


/**********************************************
*   Single Result tests
***********************************************/
    describe("As a user, I want to find contact information for service items so that I can contact them easily.", function () {
        
        it("an item in the list of nearby services is clicked, then the map is centered on the corresponding pin and its information box opens.", function () {
            //Need to test
        });
        it("a pin on the map is clicked, then the map centres the pin on the map and highlights it in the list and displays its information box the on map.", function () {
            //Need to test
        });
        it("the information box is displayed, then it contains contains its information for example: phone number, website, description, opening hours, (?).", function () {
             //Need to test
        });
        it("if the phone icon is clicked on a mobile device, the number is dialled automatically.", function () {

        });
        it("if the website icon is clicked, the service's website is opened in a new tab or window.", function () {

        });
        it("if the travel icon is clicked, google is opened in a new tab or window.", function () {

        });

    });

}());