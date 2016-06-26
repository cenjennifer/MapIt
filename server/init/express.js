'use strict';

var express = require('express');
var bodyParser = require('body-parser');

module.exports = function() {
	var app = express();
	app.use(bodyParser.json());

	// Load in Database models
	require('../models/todo.model');

	app.use(express.static('./dist'));

	// Load in Route handlers
	require('../routes/todo.routes')(app);
	require('../routes/gif.routes')(app);
	require('../routes/yelp.routes')(app);

	return app;
};