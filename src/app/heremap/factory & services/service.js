(function () {
	'use strict';
	
	angular
	.module('template')

	.service('CompileMapArray', function () {
		var self = this;
		self.MapRouteArray = [];
		self.compileRoutes = function (data) {
			for (var i = 0; i < data.response.route[0].leg[0].maneuver.length; i += 2) {
				self.MapRouteArray.push(data.response.route[0].leg[0].maneuver[i].position.latitude + ',' + data.response.route[0].leg[0].maneuver[i].position.longitude);
			}
			return self.MapRouteArray;
		};
	})

	.service('CompileYelpResults', function (YelpResource) {
		var self = this;
		self.results = [];

		self.compileYelp = function (mapArray, yelpSearch, callbackFn) {
			for (var j = 0; j < mapArray.length; j++) {
				YelpResource.getListings({term: yelpSearch, ll: mapArray[j]}, function (response) {
				
					self.results.push(response.businesses);
				});
			}
			callbackFn(self.results);
		};
	})
	
	.service('ParsingYelpResults', function () {
		var self = this;
		self.parsedResults = [];
		
		self.parsingData = function (result, callbackFn) {
			for (var i = 0; i < result.length; i++) {
				for (var j = 0; j < result[i].length; j += 5) {
						if ((self.parsedResults.indexOf(result[i][j].id) === -1) && (result[i][j].distance < 1000)) {
							var yelpObject = {
								'id': result[i][j].id,
								'name': result[i][j].name,
								'address': result[i][j].location.display_address[0] + ' ' + result[i][j].location.display_address[1] + ' ' + result[i][j].location.display_address[2],
								'url': result[i][j].url,
								'phone': result[i][j].display_phone,
								'image': result[i][j].image_url,
								'coordinates': result[i][j].location.coordinate.latitude + ',' + result[i][j].location.coordinate.longitude
							};
							
							self.parsedResults.push(yelpObject);
							console.log(self.parsedResults);
					}
				}
			}
			callbackFn(self.parsedResults);
		};
		self.addingMarkers = function (yelpCoordinates, callbackFn) {
			console.log(yelpCoordinates);
			self.allMarkers = '';
			for (var i = 0; i < yelpCoordinates.length; i++) {
				self.allMarkers += '&poix' + (i + 2) + '=' + yelpCoordinates[i].coordinates + ';1abc9c;white;18;' + (i + 1) + '.';
			}
			callbackFn(self.allMarkers);
		};
	});

})()