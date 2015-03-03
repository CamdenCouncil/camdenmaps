/*************************************************
*   MOBILE CAMDEN SERVICE CATEGORIES TESTS
*   Description: Acceptance tests are written here
*   Use: run tests by gulp acceptance-test
**************************************************/

var Config,
	categories,
	category,
	categoriesRepeater,
	buttons,
	servicesTypeaheadTests;

Config = require('../../config.js');
category = Config.category;
categoriesRepeater = element.all(by.repeater('category in serviceCategories'));
buttons = element.all(by.repeater('button in buttons'));
servicesTypeaheadTests = require('../../typeahead/servicestypeahead.e2e.js');

(function () {
    "use strict";

    describe("On Mobile, if the button 'Camden Services' is clicked ", function () {

    	beforeEach(function(){
    		browser.manage().window().setSize(320, 480);
			browser.get(Config.path.home);
			buttons.get(0).click();
		});

    	servicesTypeaheadTests();
    	
		describe("Home bar appears ", function() {

	        describe("containing 'Home' button ", function() {
	        	var home = element(by.id('backhome'));

	        	it("is displayed", function() {

		        	expect(home.isDisplayed()).toBe(true);
		        });
		        it("when clicked takes you path to home", function() {
		        	home.click();
		        	
		        	var url = browser.getCurrentUrl();

		        	expect(url).toBe(Config.path.main + Config.path.home);
		        });
	        });

	        it("containing correct text", function() {

	        	var elem = element(by.tagName('h3'));
	        	var text = elem.getText();

	        	var testText = 'Search a service or select one category from below';

	        	expect(text).toEqual(testText);
	        });

	        it("containing an input box", function() {

	        	var input = element(by.tagName('input'));

	        	expect(input.isDisplayed()).toBe(true);
	        });

	    });

		describe("List of Service categories ", function() {

	        it("appears", function() {

	        	expect(categoriesRepeater.get(0).isDisplayed()).toBe(true);
	        });

	        it("is the right number", function() {

	        	expect(categoriesRepeater.count()).toEqual(category.length);
	        });

	    });

        describe("category ", function() {

        	var i,
        		length = category.length;

        	function runTest(j) {

        		var currentCat = categoriesRepeater.get(j);

	            it("title " + category[j].title + " is correct", function() {

	            	var title = currentCat.getText();

		        	expect(title).toEqual(category[j].title);
		        });

		        it("Image " + category[j].title + " is correct", function() {

		        	var img = currentCat.element(by.tagName('img'));
		        	var src = img.getAttribute("src");
		        	var testImg = category[j].img.slice(3);

		        	expect(src).toEqual(Config.path.main + testImg);
		        });
        	}

        	for (i = 0; i < length; i++) {
        		runTest(i);
        	};
        });
    });
}());