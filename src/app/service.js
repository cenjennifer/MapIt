angular.module('template')
	
	
	.service('CompileYelpSearch', function(){
		var self = this;
		self.yelpSearch = '';
		self.setYelpSearch = function(search){
			self.yelpSearch = search;
		};
		self.getYelpSearch = function(){
			return self.yelpSearch;
		};
	})

	.service('CompileAddress', function(){
		var self  = this;
		self.fromAddresses;
		self.toAddresses;

		self.setAddresses = function(fromAdd, toAdd){
			self.fromAddresses = fromAdd;
			self.toAddresses = toAdd;
		};
		self.getFromAddress = function(){
			return self.fromAddresses;
		};
		self.getToAddress = function(){
			return self.toAddresses;
		};
	})

	.service('CompileCoordinates', function(){
		var self  = this;
		self.coordinates = [];

		self.clearCoordinates = function() {
			self.coordinates = [];
		};

		self.setCoordinates = function(lat, lng){
			self.coordinate = lat + "," + lng;
			self.coordinates.push(self.coordinate);

		};
		self.getCoordinates = function(){
			return self.coordinates;
			
			// This is for the CompileCoordinates tests to naively pass
			// return ['0.55555, 1.55555']
		};
	});