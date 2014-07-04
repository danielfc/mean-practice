(function (ng) {
	'use strict';

	var module = ng.module('app', ['ngRoute', 'ngResource']);

	module.config(function ($routeProvider, $locationProvider) {
		$locationProvider.html5Mode(true);
		$routeProvider
			.when('/', {
				templateUrl: '/partials/main',
				controller: 'MainCtrl'
			});
	});

	module.controller('MainCtrl', function ($scope) {
		$scope.myVar = "Hello Angular";
	});

})(angular);