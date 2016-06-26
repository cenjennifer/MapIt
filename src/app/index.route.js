(function () {
  'use strict';

  angular
    .module('template')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider, UI_ROUTES) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'mainCtrl'
      })
      
      .state(UI_ROUTES.kCollectDataState.stateName, {
        url: '/opencage',
        templateUrl: 'app/opencage/partials/index.html',
        controller: 'SecondController as secondCtrl'
      })

      .state(UI_ROUTES.kGenerateMapState.stateName, {
        url: '/heremap',
        templateUrl: 'app/heremap/partials/index.html',
        controller: 'ThirdController as thirdCtrl'
      })

      .state(UI_ROUTES.kGenerateMapStateChild.stateName, {
        views: {
          generateMap: {
            templateUrl: 'app/heremap/partials/generateMap.html'
          },
          yelpResults: {
            templateUrl: 'app/heremap/partials/yelpResults.html'
          }
        }
      });

    $urlRouterProvider.otherwise('/opencage');
  }

})();
