/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('template')

	.constant('UI_ROUTES', {
		kCollectDataState: {
			stateName: 'collectData'
		},
		kGenerateMapState: {
			stateName: 'generateMap'
		},
		kGenerateMapStateChild: {
			stateName: 'generateMap.child'
		}
		// kGenerateYelpStateChild: {
		// 	stateName: 'generateMap.child.yelpResults'
		// },
		// kGenerateYelpStateChildDetails: {
		// 	stateName: 'generateMap.child.yelpResults.details'
		// }


	});

		
})();
