'use strict';

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
  	'main',
  	'authentication',
  	'upload',
  	'download',
  	'settings'
	])
	.config(['$urlRouterProvider', '$mdThemingProvider', function($urlRouterProvider, $mdThemingProvider) {
		$urlRouterProvider.otherwise('/');

		$mdThemingProvider.theme('default')
			.primaryPalette('light-blue', {
				'default': '900'
			})
			.accentPalette('amber', {
				'default': '200'
			})
			.warnPalette('red');

	}])
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