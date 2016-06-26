angular
	.module('template')

	.directive('ymResults', function () {
		return {
			controller: 'YMResultsCtrl as yelpResultsCtrl',
			scope: true
		};
	})

	.directive('ymDirections', function () {
		return {
			templateUrl: 'app/heremap/partials/ymDirections.html'
		};
	})
	
	.controller('YMResultsCtrl', function (HereMapResource, hereMapCredential, CompileAddress, CompileCoordinates, SplitCoordinates) {
		var self = this;
		self.clicked = false;

		self.result = function (resultCoordinates) {
			self.clicked = true;

			self.gettingCoordinates = CompileCoordinates.getCoordinates();

			self.splitFromAddress = SplitCoordinates.splitting(self.gettingCoordinates[0]);
			self.splitDestinationAddress = SplitCoordinates.splitting(resultCoordinates);

			HereMapResource.getRoute({
				app_id: hereMapCredential.app_id,
				app_code: hereMapCredential.app_code,
					waypoint0lat: self.splitFromAddress[0],
					waypoint0lng: self.splitFromAddress[1],
					waypoint1lat: self.splitDestinationAddress[0],
					waypoint1lng: self.splitDestinationAddress[1],
					poix0: self.splitFromAddress[0] + '%2C' + self.splitFromAddress[1] + '%3B00a3f2%3B00a3f2%3B11%3B.',
					poix1: self.splitDestinationAddress[0] + '%2C' + self.splitDestinationAddress[1] + '%3Bwhite%3Bwhite%3B11%3B.'
				}).$promise.then(function onSuccess(data) {
					self.direction = '';
						for (var i = 0; i < data.response.route[0].leg[0].maneuver.length; i++) {
							self.direction += (i + 1) + '. ' + data.response.route[0].leg[0].maneuver[i].instruction + '<br>';
						}
					return self.direction;
				});
		};
	});
