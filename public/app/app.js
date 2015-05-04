var app = angular.module('myApp', ['ngRoute', 'ngResource']);

app.config(function($routeProvider, $locationProvider){
	$locationProvider.html5Mode(true);

	$routeProvider.when('/', {
		templateUrl: '/app/mainCtrl/main.html',
		controller: 'mainCtrl'
	});
});

app.controller('mainCtrl', function($scope){
	$scope.myVar = "hello Angular";
});
