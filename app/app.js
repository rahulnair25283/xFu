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
  	'blockUI',
  	'main',
  	'authentication',
  	'upload',
  	'viewFiles',
  	'delete',
  	'settings'
	])
	.config(['$urlRouterProvider', '$mdThemingProvider', 'blockUIConfig', function($urlRouterProvider,
		$mdThemingProvider, blockUIConfig) {
		
		// theme config
		$mdThemingProvider.theme('default')
			.primaryPalette('light-blue', {
				'default': '900'
			})
			.accentPalette('amber', {
				'default': '200'
			})
			.warnPalette('red');

		// block ui config
		blockUIConfig.message = 'Just a moment...';

		// defualt route config
		$urlRouterProvider.otherwise('/');
	}])
	.constant('AppInfo', {
		APPLICATION_ID: '2F6AA189-93EC-ED97-FF04-59233599E500',
		SECRET_KEY: '597E84D6-89CB-B2AC-FF53-F2D59E201900',
		APP_VERSION: 'v1'
	})
	.run(['$rootScope', '$state', 'AuthService', 'AppInfo', function($rootScope, $state, AuthService, AppInfo) {
		initBackendLess();

		$rootScope.$on('$stateChangeStart', function(event, toState) {
			if (toState.data.authRequired === true && !AuthService.isAuthenticated()) {
				$state.go('login');
			}
		});

		function initBackendLess() {
			Backendless.initApp(AppInfo.APPLICATION_ID, AppInfo.SECRET_KEY, AppInfo.APP_VERSION);
		}
	}]);