    'use strict';
    var app = angular.module('app', [
        'ngAnimate',
        'ngResource',
        'ngRoute',
        'firebase',
        'toaster',
        'angularMoment'
      ]);
      app.constant('FURL', 'https://tudorfis.firebaseio.com/');
      app.config(function ($routeProvider) {
        $routeProvider
          .when('/', {
            templateUrl: 'views/browse.html',
            controller: 'BrowseController'
          })
          .when('/browse/:taskId', {
            templateUrl: 'views/browse.html',
            controller: 'BrowseController'
          })
          .when('/register', {
            templateUrl: 'views/register.html',
            controller: 'AuthController'
          })
          .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'AuthController'
          })
          .otherwise({
            redirectTo: '/'
          });
      });
