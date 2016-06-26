(function () {
	'use strict';
	
	angular
	.module('template')

	.factory('YelpResource', function ($resource) {
		return $resource('api/yelp/search', null, {
			getListings: {
				method: 'GET',
				isArray: false
			}
		});
	})
})()