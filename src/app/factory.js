angular.module('template')
    .factory('AddressResource', function($resource) {
        return $resource('http://api.opencagedata.com/geocode/v1/json?q=:address&key=2cf31d8ae4b745598f3e5ad2b28b2eac', {
            address: '@address'
        }, {
            getCoordinates: {
                method: 'GET',
                isArray: false
            }
        });
    })

.value('hereMapCredential', {
    app_id: 'YjJfIGTAZK18idodKLPM',
    app_code: 'HXyYKRKy3xKANpvW1gTFeQ'
})


.factory('HereMapResource', function($resource, hereMapCredential) {
    return $resource('https://route.cit.api.here.com/routing/7.2/calculateroute.json?waypoint0=:waypoint0lat%2C:waypoint0lng&waypoint1=:waypoint1lat%2C:waypoint1lng&mode=fastest%3Bcar%3Btraffic%3Adisabled&app_id=:app_id&app_code=:app_code', {
        app_id: '@app_id',
        app_code: '@app_code',
        waypoint0lat: '@waypoint0lat',
        waypoint0lng: '@waypoint0lng',
        waypoint1lat: '@waypoint1lat',
        waypoint1lng: '@waypoint1lng'
    }, {
        getRoute: {
            method: 'GET',
            isArray: false
        }
    });

});