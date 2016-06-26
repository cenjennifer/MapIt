(function() {
	'use strict';

	angular
		.module('template')
		.controller('SecondController', function (UI_ROUTES, $state, $timeout, AddressResource, CompileCoordinates, CompileYelpSearch, CompileAddress) {
			var self = this;

			self.loading = false;
			self.submitButton = false;

			self.generateYelpMapState = UI_ROUTES.kGenerateMapStateChild.stateName;
			self.collectDataState = UI_ROUTES.kCollectDataState.stateName;
			self.generateMapState = UI_ROUTES.kGenerateMapState.stateName;


			self.FromCoordinateArray = [];
			self.ToCoordinateArray = [];

			self.formComment = false;
			self.onSubmit = function (fromAddress, toAddress, yelpSearch, goToState) {

				//Validating Form
				if (!self.myForm.$valid) {
					self.formComment = true;
				} else {
					self.formComment = false;
					self.submitButton = true;
					self.loading = true;

					
					CompileAddress.setAddresses(fromAddress, toAddress);

					CompileCoordinates.clearCoordinates();

					AddressResource.getCoordinates({
						address: fromAddress
					}).$promise.then(function onSuccess(response) {
						self.fromLat = response.results[0].geometry.lat;
						self.fromLng = response.results[0].geometry.lng;
						CompileCoordinates.setCoordinates(self.fromLat, self.fromLng);
						self.response1 = response;
						if ((self.response1) && (self.response2)) {
								$state.go(goToState);
						}
					});

					AddressResource.getCoordinates({
						address: toAddress
					}).$promise.then(function onSuccess(response) {
						self.toLat = response.results[0].geometry.lat;
						self.toLng = response.results[0].geometry.lng;
						CompileCoordinates.setCoordinates(self.toLat, self.toLng);
						self.response2 = response;
						if ((self.response1) && (self.response2)) {
								$state.go(goToState);
						}
					});

					CompileYelpSearch.setYelpSearch(yelpSearch);

				}
			};
		});
})()