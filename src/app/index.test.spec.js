(function () {
	'use strict';

	describe('CompileCoordinates tests', function () {
		var CompileCoordinatestoTest;



		beforeEach(module('template'));

		beforeEach(inject(function (_CompileCoordinates_) {
			CompileCoordinatestoTest = _CompileCoordinates_;

			it ('should compile the coordinates correctly', function () {
				var resultSet = CompileCoordinatestoTest.setCoordinates('0.55555', '1.55555');
				var resultGet = CompileCoordinatestoTest.getCoordinates();

				//Test to Fail
				expect(resultGet).toEqual(['0.55555, 1.55555']);
				//Test to Pass in app/service.js
				expect(resultGet).toEqual(['0.55555, 1.55555']);
			});

			it ('should compile the coordinates correctly with no coordinates given', function () {	
				//Edge Case with no coordinates given
				var resultSet = CompileCoordinatestoTest.setCoordinates();
				var resultGet = CompileCoordinatestoTest.getCoordinates();

				expect(resultGet).toEqual([]);

			});
		}));


	});
})()