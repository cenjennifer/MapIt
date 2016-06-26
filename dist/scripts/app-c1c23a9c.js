!function(){"use strict";angular.module("template",["ngAnimate","ngResource","ui.router","ui.bootstrap","ngSanitize"])}(),function(){"use strict";angular.module("template").controller("SecondController",["UI_ROUTES","$state","$timeout","AddressResource","CompileCoordinates","CompileYelpSearch","CompileAddress",function(e,t,a,r,o,s,n){var i=this;i.loading=!1,i.submitButton=!1,i.generateYelpMapState=e.kGenerateMapStateChild.stateName,i.collectDataState=e.kCollectDataState.stateName,i.generateMapState=e.kGenerateMapState.stateName,i.FromCoordinateArray=[],i.ToCoordinateArray=[],i.formComment=!1,i.onSubmit=function(e,a,l,p){i.myForm.$valid?(i.formComment=!1,i.submitButton=!0,i.loading=!0,n.setAddresses(e,a),o.clearCoordinates(),r.getCoordinates({address:e}).$promise.then(function(e){i.fromLat=e.results[0].geometry.lat,i.fromLng=e.results[0].geometry.lng,o.setCoordinates(i.fromLat,i.fromLng),i.response1=e,i.response1&&i.response2&&t.go(p)}),r.getCoordinates({address:a}).$promise.then(function(e){i.toLat=e.results[0].geometry.lat,i.toLng=e.results[0].geometry.lng,o.setCoordinates(i.toLat,i.toLng),i.response2=e,i.response1&&i.response2&&t.go(p)}),s.setYelpSearch(l)):i.formComment=!0}}])}()(function(){"use strict";angular.module("template").service("SplitCoordinates",function(){var e=this;e.splitting=function(e){return e.split(",")}})})(),angular.module("template").directive("ymResults",function(){return{controller:"YMResultsCtrl as yelpResultsCtrl",scope:!0}}).directive("ymDirections",function(){return{templateUrl:"app/heremap/partials/ymDirections.html"}}).controller("YMResultsCtrl",["HereMapResource","hereMapCredential","CompileAddress","CompileCoordinates","SplitCoordinates",function(e,t,a,r,o){var s=this;s.clicked=!1,s.result=function(a){s.clicked=!0,s.gettingCoordinates=r.getCoordinates(),s.splitFromAddress=o.splitting(s.gettingCoordinates[0]),s.splitDestinationAddress=o.splitting(a),e.getRoute({app_id:t.app_id,app_code:t.app_code,waypoint0lat:s.splitFromAddress[0],waypoint0lng:s.splitFromAddress[1],waypoint1lat:s.splitDestinationAddress[0],waypoint1lng:s.splitDestinationAddress[1],poix0:s.splitFromAddress[0]+"%2C"+s.splitFromAddress[1]+"%3B00a3f2%3B00a3f2%3B11%3B.",poix1:s.splitDestinationAddress[0]+"%2C"+s.splitDestinationAddress[1]+"%3Bwhite%3Bwhite%3B11%3B."}).$promise.then(function(e){s.direction="";for(var t=0;t<e.response.route[0].leg[0].maneuver.length;t++)s.direction+=t+1+". "+e.response.route[0].leg[0].maneuver[t].instruction+"<br>";return s.direction})}}]),function(){"use strict";angular.module("template").service("CompileMapArray",function(){var e=this;e.MapRouteArray=[],e.compileRoutes=function(t){for(var a=0;a<t.response.route[0].leg[0].maneuver.length;a+=2)e.MapRouteArray.push(t.response.route[0].leg[0].maneuver[a].position.latitude+","+t.response.route[0].leg[0].maneuver[a].position.longitude);return e.MapRouteArray}}).service("CompileYelpResults",["YelpResource",function(e){var t=this;t.results=[],t.compileYelp=function(a,r,o){for(var s=0;s<a.length;s++)e.getListings({term:r,ll:a[s]},function(e){t.results.push(e.businesses)});o(t.results)}}]).service("ParsingYelpResults",function(){var e=this;e.parsedResults=[],e.parsingData=function(t,a){for(var r=0;r<t.length;r++)for(var o=0;o<t[r].length;o+=5)if(-1===e.parsedResults.indexOf(t[r][o].id)&&t[r][o].distance<1e3){var s={id:t[r][o].id,name:t[r][o].name,address:t[r][o].location.display_address[0]+" "+t[r][o].location.display_address[1]+" "+t[r][o].location.display_address[2],url:t[r][o].url,phone:t[r][o].display_phone,image:t[r][o].image_url,coordinates:t[r][o].location.coordinate.latitude+","+t[r][o].location.coordinate.longitude};e.parsedResults.push(s),console.log(e.parsedResults)}a(e.parsedResults)},e.addingMarkers=function(t,a){console.log(t),e.allMarkers="";for(var r=0;r<t.length;r++)e.allMarkers+="&poix"+(r+2)+"="+t[r].coordinates+";1abc9c;white;18;"+(r+1)+".";a(e.allMarkers)}})}()(function(){"use strict";angular.module("template").factory("YelpResource",["$resource",function(e){return e("api/yelp/search",null,{getListings:{method:"GET",isArray:!1}})}])})()(function(){"use strict";angular.module("template").controller("ThirdController",["UI_ROUTES","$state","$timeout","hereMapCredential","HereMapResource","CompileCoordinates","CompileAddress","CompileYelpSearch","CompileYelpResults","YelpResource","ParsingYelpResults","CompileMapArray",function(e,t,a,r,o,s,n,i,l,p,d,c){var u=this;u.fromAddress=n.getFromAddress(),u.toAddress=n.getToAddress(),u.yelpSearch=i.getYelpSearch(),u.gettingCoordinates=s.getCoordinates(),console.log(u.gettingCoordinates),u.collectDataState=e.kCollectDataState.stateName,u.generateMapState=e.kGenerateMapState.stateName;var g=window.innerWidth||document.body.clientWidth,m=Math.ceil(.59*g);console.log(g),console.log(m),u.addingAllYelpMarkers="";var h="http://image.maps.cit.api.here.com/mia/1.6/routing?app_id=YjJfIGTAZK18idodKLPM&app_code=HXyYKRKy3xKANpvW1gTFeQ&waypoint0="+u.gettingCoordinates[0]+"&waypoint1="+u.gettingCoordinates[1]+"&lc=1652B4&lw=6&t=13&ppi=320&f=2&w="+m+"&h=550&poix0="+u.gettingCoordinates[0]+";00a3f2;white;18;A.&poix1="+u.gettingCoordinates[1]+";00a3f2;white;18;B.";u.refresh=function(){u.YelpResults.length=0,u.gettingCoordinates.length=0,u.MapRouteArray.length=0,u.parsedResults.length=0},0!==u.gettingCoordinates.length&&(u.coords=u.gettingCoordinates.toString().split(","),o.getRoute({app_id:r.app_id,app_code:r.app_code,waypoint0lat:u.coords[0],waypoint0lng:u.coords[1],waypoint1lat:u.coords[2],waypoint1lng:u.coords[3],poix0:u.coords[0]+"%2C"+u.coords[1]+"%3B00a3f2%3B00a3f2%3B11%3B.",poix1:u.coords[2]+"%2C"+u.coords[3]+"%3Bwhite%3Bwhite%3B11%3B."}).$promise.then(function(e){u.MapRouteArray=c.compileRoutes(e),console.log(u.MapRouteArray),u.yelpResults=l.compileYelp(u.MapRouteArray,u.yelpSearch,function(e){a(function(){u.parsedResults=e,d.parsingData(e,function(e){a(function(){u.YelpResults=e,console.log(u.YelpResults),d.addingMarkers(e,function(e){a(function(){u.addingAllYelpMarkers=h+e,console.log(u.addingAllYelpMarkers)},500)})},1e3)})},5e3)})}))}])})(),angular.module("template").controller("NavbarCtrl",["$scope",function(e){e.date=new Date}]),angular.module("template").controller("MainController",["$scope",function(e){e.awesomeThings=[{title:"AngularJS",url:"https://angularjs.org/",description:"HTML enhanced for web apps!",logo:"angular.png"},{title:"BrowserSync",url:"http://browsersync.io/",description:"Time-saving synchronised browser testing.",logo:"browsersync.png"},{title:"GulpJS",url:"http://gulpjs.com/",description:"The streaming build system.",logo:"gulp.png"},{title:"Jasmine",url:"http://jasmine.github.io/",description:"Behavior-Driven JavaScript.",logo:"jasmine.png"},{title:"Karma",url:"http://karma-runner.github.io/",description:"Spectacular Test Runner for JavaScript.",logo:"karma.png"},{title:"Protractor",url:"https://github.com/angular/protractor",description:"End to end test framework for AngularJS applications built on top of WebDriverJS.",logo:"protractor.png"},{title:"jQuery",url:"http://jquery.com/",description:"jQuery is a fast, small, and feature-rich JavaScript library.",logo:"jquery.jpg"},{title:"Bootstrap",url:"http://getbootstrap.com/",description:"Bootstrap is the most popular HTML, CSS, and JS framework for developing responsive, mobile first projects on the web.",logo:"bootstrap.png"},{title:"Angular UI Bootstrap",url:"http://angular-ui.github.io/bootstrap/",description:"Bootstrap components written in pure AngularJS by the AngularUI Team.",logo:"ui-bootstrap.png"}],angular.forEach(e.awesomeThings,function(e){e.rank=Math.random()})}]),angular.module("template").service("CompileYelpSearch",function(){var e=this;e.yelpSearch="",e.setYelpSearch=function(t){e.yelpSearch=t},e.getYelpSearch=function(){return e.yelpSearch}}).service("CompileAddress",function(){var e=this;e.fromAddresses,e.toAddresses,e.setAddresses=function(t,a){e.fromAddresses=t,e.toAddresses=a},e.getFromAddress=function(){return e.fromAddresses},e.getToAddress=function(){return e.toAddresses}}).service("CompileCoordinates",function(){var e=this;e.coordinates=[],e.clearCoordinates=function(){e.coordinates=[]},e.setCoordinates=function(t,a){e.coordinate=t+","+a,e.coordinates.push(e.coordinate)},e.getCoordinates=function(){return e.coordinates}}),function(){"use strict";function e(e){e.debug("runBlock end")}angular.module("template").run(e),e.$inject=["$log"]}(),function(){"use strict";function e(e,t,a){e.state("home",{url:"/",templateUrl:"app/main/main.html",controller:"MainController",controllerAs:"mainCtrl"}).state(a.kCollectDataState.stateName,{url:"/opencage",templateUrl:"app/opencage/partials/index.html",controller:"SecondController as secondCtrl"}).state(a.kGenerateMapState.stateName,{url:"/heremap",templateUrl:"app/heremap/partials/index.html",controller:"ThirdController as thirdCtrl"}).state(a.kGenerateMapStateChild.stateName,{views:{generateMap:{templateUrl:"app/heremap/partials/generateMap.html"},yelpResults:{templateUrl:"app/heremap/partials/yelpResults.html"}}}),t.otherwise("/opencage")}angular.module("template").config(e),e.$inject=["$stateProvider","$urlRouterProvider","UI_ROUTES"]}(),function(){"use strict";angular.module("template").constant("UI_ROUTES",{kCollectDataState:{stateName:"collectData"},kGenerateMapState:{stateName:"generateMap"},kGenerateMapStateChild:{stateName:"generateMap.child"}})}(),function(){"use strict";function e(e){e.debugEnabled(!0)}angular.module("template").config(e),e.$inject=["$logProvider"]}(),angular.module("template").factory("AddressResource",["$resource",function(e){return e("http://api.opencagedata.com/geocode/v1/json?q=:address&key=2cf31d8ae4b745598f3e5ad2b28b2eac",{address:"@address"},{getCoordinates:{method:"GET",isArray:!1}})}]).value("hereMapCredential",{app_id:"YjJfIGTAZK18idodKLPM",app_code:"HXyYKRKy3xKANpvW1gTFeQ"}).factory("HereMapResource",["$resource","hereMapCredential",function(e){return e("https://route.cit.api.here.com/routing/7.2/calculateroute.json?waypoint0=:waypoint0lat%2C:waypoint0lng&waypoint1=:waypoint1lat%2C:waypoint1lng&mode=fastest%3Bcar%3Btraffic%3Adisabled&app_id=:app_id&app_code=:app_code",{app_id:"@app_id",app_code:"@app_code",waypoint0lat:"@waypoint0lat",waypoint0lng:"@waypoint0lng",waypoint1lat:"@waypoint1lat",waypoint1lng:"@waypoint1lng"},{getRoute:{method:"GET",isArray:!1}})}]),angular.module("template").run(["$templateCache",function(e){e.put("app/main/main.html",'<div class="container"><div ng-include="\'components/navbar/navbar.html\'"></div><div class="jumbotron text-center"><h1>\'Allo, \'Allo!</h1><p class="lead"><img src="assets/images/yeoman.png" alt="I\'m Yeoman"><br>Always a pleasure scaffolding your apps.</p><p><a class="btn btn-lg btn-success" ng-href="#">Splendid!</a></p></div><div class="row"><div class="col-sm-6 col-md-4" ng-repeat="awesomeThing in awesomeThings | orderBy:\'rank\'"><div class="thumbnail"><img class="pull-right" ng-src="assets/images/{{awesomeThing.logo}}" alt="{{awesomeThing.title}}"><div class="caption"><h3>{{awesomeThing.title}}</h3><p>{{awesomeThing.description}}</p><p><a ng-href="{{awesomeThing.url}}">{{awesomeThing.url}}</a></p></div></div></div></div><hr><div class="footer"><p>With ♥ from <a href="https://twitter.com/Swiip">@Swiip</a></p></div></div>'),e.put("components/navbar/navbar.html",'<nav class="navbar navbar-static-top navbar-inverse" ng-controller="NavbarCtrl"><div class="container-fluid"><div class="navbar-header"><a class="navbar-brand" href="https://github.com/Swiip/generator-gulp-angular"><span class="glyphicon glyphicon-home"></span> Gulp Angular</a></div><div class="collapse navbar-collapse" id="bs-example-navbar-collapse-6"><ul class="nav navbar-nav"><li class="active"><a ng-href="#">Home</a></li><li><a ng-href="#">About</a></li><li><a ng-href="#">Contact</a></li></ul><ul class="nav navbar-nav navbar-right"><li>Current date: {{ date | date:\'yyyy-MM-dd\' }}</li></ul></div></div></nav>'),e.put("app/heremap/partials/generateMap.html",'<img ng-show="thirdCtrl.addingAllYelpMarkers" ng-model="thirdCtrl.initalMap" class="mapResult" style="border: none" alt="Loading Map" ng-src="{{thirdCtrl.addingAllYelpMarkers}}">'),e.put("app/heremap/partials/index.html",'<div class="headerTop"><div style="padding: 10px 20px; font-size:18px; float:left; color:#fff;" ng-show="thirdCtrl.yelpSearch"><span style="font-size:28px; color:#fff;">Nearby</span> <span style="font-size:28px; color:#fff;" ng-bind="thirdCtrl.yelpSearch"></span><br>From: <span style="color:#fff;font-size:18px" ng-bind="thirdCtrl.fromAddress"></span><br>To: <span style="font-size:18px; color:#fff;" ng-bind="thirdCtrl.toAddress"></span></div><div style="float:right; padding: 20px;"><a ui-sref="{{thirdCtrl.collectDataState}}"><i ng-click="thirdCtrl.refresh()" class="material-icons md-48">edit_location</i></a></div></div><div style="width: 100%; text-align: center; valign: middle; height: 500px;" ng-hide="thirdCtrl.YelpResults"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div><div style="clear:both;"><div class="yelpSide" ui-view="yelpResults"></div><div class="mapSide" ui-view="generateMap"></div></div>'),e.put("app/heremap/partials/yelpResults.html",'<div class="yelpResult" ng-repeat="result in thirdCtrl.YelpResults"><div ym-results="" ng-click="yelpResultsCtrl.result(result.coordinates)"><div class="yelpTxt"><div class="resultName">{{$index + 1}}. <span ng-bind="result.name"></span> <i class="material-icons md-18">directions</i></div><div ng-show="result.phone">Phone: <span class="yelpText" ng-bind="result.phone"></span></div><div class="resultAddress" ng-bind="result.address"></div><div><a class="resultUrl" target="_blank" ng-href="{{result.url}}">Yelp Review</a></div></div><img class="yelpImg" ng-src="{{result.image}}"><div style="color:black; padding:5px;" ng-show="yelpResultsCtrl.clicked"><div ym-directions="" ng-animate="animate"></div></div></div></div>'),e.put("app/heremap/partials/ymDirections.html",'<div ng-show="yelpResultsCtrl.direction"><br><br><br><br><br><br><div class="animate">Direction from A to <span ng-bind="result.name"></span>:<br><br><div class="directions" ng-bind-html="yelpResultsCtrl.direction"></div></div></div>'),e.put("app/opencage/partials/index.html",'<div id="top" class="mainPageHeader"><div class="text-vertical-center"><form class="form" name="secondCtrl.myForm" ng-submit="secondCtrl.onSubmit(secondCtrl.fromAddress, secondCtrl.toAddress, secondCtrl.yelpSearch, secondCtrl.generateYelpMapState)" novalidate=""><br><h1><input type="text" ng-model="secondCtrl.yelpSearch" name="yelpSearch" class="yelpSearch" placeholder="Find:"></h1><br><h2><input class="destination" type="text" ng-model="secondCtrl.fromAddress" name="fromAddress" placeholder="Location A" required=""> <i class="material-icons">keyboard_arrow_right</i> <input class="destination" type="text" ng-model="secondCtrl.toAddress" name="toAddress" placeholder="Location B" required=""></h2><br><div><input ng-hide="secondCtrl.submitButton" class="submitButton" type="submit" value="Locate"></div><span class="comment" ng-show="secondCtrl.formComment"><br><br>You must have all fields completed to locate.</span><div ng-show="secondCtrl.loading" class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div><br><br></form><br></div></div>')}]);