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
  'ui.router',
  'ngSanitize',
  'ngMaterial',
  'ngMdIcons',
  'lfNgMdFileInput',
  'layout',
  'authentication',
  'fileUpload'
])
  .config(function($urlRouterProvider, $stateProvider,
    $mdThemingProvider) {
    
    $stateProvider
      .state('root', {
        url: '',
        abstract: true
      })
      .state('layout', {
        url: '',
        templateUrl: 'layout/layout.tmpl.html',
        controller: 'LayoutController',
        controllerAs: 'layoutCtrl'
      });

    $urlRouterProvider.otherwise('login');

    $mdThemingProvider.theme('default')
      .primaryPalette('brown')
      .accentPalette('indigo')
      .warnPalette('red');
  })
  .run(['$rootScope', '$state', 'AuthService', function($rootScope, $state, AuthService) {
    
    initBackendLess();
    
    $rootScope.$on('$stateChangeStart', function(event, toState) {
      if (toState.data.authRequired === true && !AuthService.isAuthenticated()) {
        $state.go('login');
      }
    });

    function initBackendLess() {
      var APPLICATION_ID = '2F6AA189-93EC-ED97-FF04-59233599E500';
      var SECRET_KEY = '597E84D6-89CB-B2AC-FF53-F2D59E201900';
      var APP_VERSION = 'v1';
      
      Backendless.initApp(APPLICATION_ID, SECRET_KEY, APP_VERSION);
    }
}]);