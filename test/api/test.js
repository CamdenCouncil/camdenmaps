(function (){
    "use strict";

    var Lab = require("lab"),
        lab = exports.lab = Lab.script(),
        Fs = require('fs'),
        server = require("../../server/server.js"),
        fixtures = require("../fixtures/test-fixtures.js"),
        describe = lab.experiment,
        it = lab.test,
        expect = require("code").expect;

    /*************************************************
    *   BASIC SERVER TESTS
    *   Description: Acceptance tests are written here
    *   Use: run tests by npm test
    **************************************************/

    describe("Given that server starts", function () {

        it("then runs on port 8080", function (done) {
            expect(server.info.port).to.equal(8080);
            done();
        });

        it("statusCode is 200 okay", function (done) {

            var options = {
                method: "GET",
                url: "/services/police%20station"
            };

            server.inject(options, function(response) {
                expect(response.statusCode).to.equal(200);
                done();
            });

        });

    });

    /*************************************************
    *   NEAREST ENDPOINTS SERVER TESTS
    *   Description: Acceptance tests are written here
    *   Use: run tests by npm test
    **************************************************/

    describe("Given that a Nearest api call is made", function () {

        it("then result for services is in the correct format", function (done) {

            var options = {
                method: "GET",
                url: "/services/Library"
            };

            server.inject(options, function(response) {
                expect(response.payload).to.equal(fixtures.nearest.services);
                done();
            });

        });

        // it("then result for locations is in the correct format", function (done) {
        //     var options = {
        //         method: "GET",
        //         url: "/locations/NW1%200JH"
        //     };

        //     server.inject(options, function(response) {
        //         expect(response.payload).to.equal(fixtures.nearest.locations);
        //         done();
        //     });

        // });

        it("then result for services and locations is in the correct format", function (done) {

            var options = {
                method: "GET",
                url: "/services/police%20station/locations/NW1%200JH"
            };

            server.inject(options, function(response) {
                expect(response.payload).to.equal(fixtures.nearest.servicesLocations);
                done();
            });

        });
    });

    /*************************************************
    *   PARKING ENDPOINTS
    *   Description: Acceptance tests are written here
    *   Use: run tests by npm test
    **************************************************/

    describe("Given that a parking api call is made", function () {

        it("then result for services is in the correct format", function (done) {

            var options = {
                method: "GET",
                url: "/services/Car%20club"
            };

            server.inject(options, function(response) {
                expect(response.payload).to.equal(fixtures.parking.services);
                done();
            });

        });

        it("then result for services and locations is in the correct format", function (done) {

            var options = {
                method: "GET",
                url: "/services/Permit%20holders/locations/NW1%200JH"
            };

            server.inject(options, function(response) {
                expect(response.payload).to.equal(fixtures.parking.servicesLocations);
                done();
            });

        });
    });
        
    /*************************************************
    *   RECYCLING ENDPOINTS
    *   Description: Acceptance tests are written here
    *   Use: run tests by npm test
    **************************************************/

     describe("Given that a local information api call is made", function () {

         it("then result for  uprn is in the correct format", function (done) {

             var options = {
                 method: "GET",
                 url: "/addresses/5023741"
             };

             server.inject(options, function(response) {
                 expect(response.payload).to.equal(fixtures.localInformation.uprn);
                 done();
             });

         });

     });
    
    /*************************************************
    *   RECYCLING ENDPOINTS
    *   Description: Acceptance tests are written here
    *   Use: run tests by npm test
    **************************************************/

    // describe("Given that a recycling api call is made", function () {

    //     it("then result for services is in the correct format", function (done) {

    //         var options = {
    //             method: "GET",
    //             url: "/services/police%20station"
    //         };

    //         server.inject(options, function(response) {
    //             expect(response.payload).to.equal(fixtures.recycling.services);
    //             done();
    //         });

    //     });

    //     it("then result for services and locations is in the correct format", function (done) {

    //         var options = {
    //             method: "GET",
    //             url: "/services/police%20station/locations/NW1%200JH"
    //         };

    //         server.inject(options, function(response) {
    //             expect(response.payload).to.equal(fixtures.recycling.servicesLocations);
    //             done();
    //         });

    //     });
    // });

}());
