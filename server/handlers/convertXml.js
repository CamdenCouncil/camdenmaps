//TODO: validate that response has x,y or z properties and if not, respond nothing 

;(function() { 
    "use strict";

    // module for converting XML to JSON 
    var xml2js = require('xml2js');
    var parser = new xml2js.Parser();
    var Config = require("../config/serverConfig.js");
    var serviceArray = Config.map.serviceArrays;

    module.exports = {
        
        //function for responding JSON to client
        convertToJson: function convertToJson (err, res, req, rep) {
            var xml, response;
            xml = [];
            response = {};

            if (serviceArray.recycling.indexOf(req.params.service) > -1) {
            
                rep(res);
            
            } else if (serviceArray.parking.indexOf(req.params.service) > -1) {
                xml = " ";
                response = {};
                
                res.on("data", function(data) {
                    xml = xml + data;                
                });

                res.on("end", function() {
                    parser.parseString(xml, function(err, result) {
                        rep(result);
                    });  
                });
            
            } else {
                // var parser = xml.parse(res);
                xml = '';
                response = {};
                response.properties = [];

                res.on('data', function(data){
                    xml = xml + data;
                });

                res.on('end', function(){
                    parser.parseString(xml, function (err, result) {
                        response.location = result.Locations.AddressSearchResults[0]['$'];
                        result.Locations.Properties[0].Property.map(function(p) {
                            var formatProperty = p['$'];
                            formatProperty.display = p.PoI[0]['$']
                            response.properties.push(formatProperty);
                        });
                        rep(response);
                    });
                });
            }
        }
    };
}());
