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
    'Main'
  ])
  .directive('fileInput', ['$parse', function($parse) {
    return {
      restrict: 'A',
      link: function(scope, elm, attrs) {
        elm.bind('change', function() {
          $parse(attrs.fileInput)
            .assign(scope, elm[0].files)
          scope.$apply()
        })
      }
    }
  }])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/index.html',
        controller: 'MainController',
        controllerAs: 'mainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

  })
  .run(function() {
    
    var APPLICATION_ID = '2F6AA189-93EC-ED97-FF04-59233599E500';
    var SECRET_KEY = '597E84D6-89CB-B2AC-FF53-F2D59E201900';
    var APP_VERSION = 'v1';

    Backendless.initApp(APPLICATION_ID, SECRET_KEY, APP_VERSION);
    Backendless.enablePromises();
  });