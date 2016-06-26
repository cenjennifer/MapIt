(function () {
	'use strict';
	
	angular
	.module('template')

	.service('SplitCoordinates', function () {
		var self = this;
		
		self.splitting = function (coordinates) {
			return coordinates.split(',');
		};
	});
})()