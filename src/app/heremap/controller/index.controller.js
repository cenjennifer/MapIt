(function() {
	'use strict';

	angular
		.module('template')
		.controller('ThirdController', function (UI_ROUTES, $state, $timeout, hereMapCredential, HereMapResource, CompileCoordinates, CompileAddress, CompileYelpSearch, CompileYelpResults, YelpResource, ParsingYelpResults, CompileMapArray) {
			var self = this;

			// self.detailedMap = false;
			
			self.fromAddress = CompileAddress.getFromAddress();
			self.toAddress = CompileAddress.getToAddress();
			self.yelpSearch = CompileYelpSearch.getYelpSearch();
			 

			self.gettingCoordinates = CompileCoordinates.getCoordinates();
			 

			self.collectDataState = UI_ROUTES.kCollectDataState.stateName;
			self.generateMapState = UI_ROUTES.kGenerateMapState.stateName;

			var mapheight = window.innerHeight || document.body.clientHeight;

			var width = window.innerWidth || document.body.clientWidth;
			var mapWidth = Math.ceil(width*.65);

			self.addingAllYelpMarkers = '';
			var yelpImgUrl = 'http://image.maps.cit.api.here.com/mia/1.6/routing?app_id=YjJfIGTAZK18idodKLPM&app_code=HXyYKRKy3xKANpvW1gTFeQ&waypoint0=' + self.gettingCoordinates[0] + '&waypoint1=' + self.gettingCoordinates[1] + '&lc=1652B4&lw=6&t=13&ppi=320&f=2&w=' + mapWidth + '&h=' + mapheight + '&poix0=' + self.gettingCoordinates[0] + ';00a3f2;white;18;A.&poix1=' + self.gettingCoordinates[1] + ';00a3f2;white;18;B.';

			self.refresh = function () {
				self.YelpResults.length = 0;
				self.gettingCoordinates.length = 0;
				self.MapRouteArray.length = 0;
				self.parsedResults.length = 0;
			};

			if (self.gettingCoordinates.length !== 0) {
				self.coords = self.gettingCoordinates.toString().split(',');

				HereMapResource.getRoute({
					app_id: hereMapCredential.app_id,
					app_code: hereMapCredential.app_code,
					waypoint0lat: self.coords[0],
					waypoint0lng: self.coords[1],
					waypoint1lat: self.coords[2],
					waypoint1lng: self.coords[3],
					poix0: self.coords[0] + '%2C' + self.coords[1] + '%3B00a3f2%3B00a3f2%3B11%3B.',
					poix1: self.coords[2] + '%2C' + self.coords[3] + '%3Bwhite%3Bwhite%3B11%3B.'
				}).$promise.then(function onSuccess(data) {
					self.MapRouteArray = CompileMapArray.compileRoutes(data);

					console.log(self.MapRouteArray);
					
					self.yelpResults = CompileYelpResults.compileYelp(self.MapRouteArray, self.yelpSearch, function (result) {
						$timeout(function () {
							self.parsedResults = result;

							ParsingYelpResults.parsingData(result, function (parsedResult) {
								$timeout(function () {

									self.YelpResults = parsedResult;
									console.log(self.YelpResults);

									ParsingYelpResults.addingMarkers(parsedResult, function (mapCoordinates) {
										$timeout(function () {
												self.addingAllYelpMarkers = yelpImgUrl + mapCoordinates;
												console.log(self.addingAllYelpMarkers);
											}, 500);
									});
								}, 1000);
							});
						}, 5000);
					});
				});
			}
		});
})()
