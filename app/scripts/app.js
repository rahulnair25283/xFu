'use strict';

/**
 * @ngdoc overview
 * @name xFuApp
 * @description
 * # xFuApp
 *
 * Main module of the application.
 */
angular.module('xFuApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngMaterial',
    'lfNgMdFileInput',
    'authentication',
    'fileUpload'
  ])
  .config(function($routeProvider, $mdThemingProvider) {
    $routeProvider
    .when('/login', {
      templateUrl: 'auth/login.tmpl.html',
      controller: 'AuthController',
      controllerAs: 'authCtrl'
    })
    .when('/upload', {
      templateUrl: 'fileUpload/fileUpload.tmpl.html',
      controller: 'FileUploadController',
      controllerAs: 'fileUploadCtrl'
    })
    .otherwise({ 
      redirectTo: '/login' 
    });

    $mdThemingProvider.theme('default')
      .primaryPalette('light-blue')
      .accentPalette('amber')
      .warnPalette('red');

  })
  .run(function() {

    var APPLICATION_ID = '2F6AA189-93EC-ED97-FF04-59233599E500';
    var SECRET_KEY = '597E84D6-89CB-B2AC-FF53-F2D59E201900';
    var APP_VERSION = 'v1';

    Backendless.initApp(APPLICATION_ID, SECRET_KEY, APP_VERSION);
  });