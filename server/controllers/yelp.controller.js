'use strict';
var OAUTH = require('../../AuthClient.js').YELP;
var yelp = require('yelp').createClient(OAUTH);

exports.search = function(req, res) {

  // Sample Request
  // http://localhost:8080/api/yelp/search?term=food&location=11221
  // https://api.yelp.com/v2/search/?ll=40.7421188,-73.993988


  yelp.search({term: req.query.term, ll: req.query.ll}, function(error, data) {
    console.log("success");
    res.send(data);
  });
};