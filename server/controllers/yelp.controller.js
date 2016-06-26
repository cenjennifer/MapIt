'use strict';

var yelp = require('yelp').createClient({
  'consumer_key': 'IcLQmkLCJ_NIQKs9E7KYyQ', 
  'consumer_secret': 'J_PoTOphoppCvNtXY_xc9-ZGVNs',
  'token': 'zG4khVjJmUX7CN6RVSfKpYenJS6s7O3G',
  'token_secret': 'BzJMlfFfrCv-rjEYrq7Bs-jQZ18'
});


exports.search = function(req, res) {

  // Sample Request
  // http://localhost:8080/api/yelp/search?term=food&location=11221

  // https://api.yelp.com/v2/search/?ll=40.7421188,-73.993988


  yelp.search({term: req.query.term, ll: req.query.ll}, function(error, data) {
    console.log("success");
    res.send(data);
  });
};