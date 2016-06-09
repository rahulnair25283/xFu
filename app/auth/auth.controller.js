'use strict';

angular.module('authentication', [
	'service.authentication'
	])
	.config(function ($stateProvider) {
		$stateProvider.state('login', {
			url: '/login',
			templateUrl: 'auth/login.tmpl.html',
			controller: 'AuthController',
			controllerAs: 'authCtrl',
			data: {
				authRequired: false
			}
			
		});
	})
	.controller('AuthController', ['$scope', '$state', 'AuthService', function($scope, $state,
		AuthService) {
		
		var ctrl = this;

		ctrl.credentials = {
			email: '',
			password: ''
		};

		ctrl.loginWith = function(credentials) {
			var response = AuthService.login(credentials);
			if (response.userLoggedIn) {
				$state.go('upload');
			} else {
				ctrl.authErrorMsg = response.error.message;
				$state.go('login');
			}
		}

		ctrl.logout = function() {
			console.log('Logging out...');
			var response = AuthService.logout();
			if (response.userLoggedOut) {
				$state.go('login');
			} else {
				ctrl.authErrorMsg = response.error.message;
			}
		}
	}]);