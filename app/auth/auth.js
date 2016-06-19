'use strict';

angular.module('authentication', [
	'service.authentication'
	])
	.config(function($stateProvider) {
		$stateProvider.state('login', {
			url: '/',
			templateUrl: 'auth/login.tmpl.html',
			controller: 'AuthController',
			controllerAs: 'authCtrl',
			data: {
				authRequired: false
			}

		});
	})
	.controller('AuthController', ['$scope', '$state', '$timeout', 'blockUI', 'AuthService', function($scope, $state,
		$timeout, blockUI, AuthService) {

		var ctrl = this;

		ctrl.credentials = {
			email: '',
			password: ''
		};

		ctrl.serverError = {
			hasError: false,
			errorMessage: ''
		}

		ctrl.login = function() {

			var credentials = ctrl.credentials;

			console.log('attempting to login as: ' + credentials.email);

			blockUI.start('Please wait while we log you in...');

			$timeout(function() {
				var response = AuthService.login(credentials);
				if (response.userLoggedIn) {
					console.log('logged in successfully as: ' + credentials.email);
					$state.go('welcome');
				} else {
					console.log('login failed for: ' + credentials.email);
					
					ctrl.serverError.hasError = true;
					ctrl.serverError.errorMessage = response.error.message;

					$state.go('login');
				}

				blockUI.stop();
			}, 1000);
		}

		ctrl.logout = function() {
			
			console.log('attempting to logout');
			
			blockUI.start('Please wait while we log you out...');

			$timeout(function() {
				var response = AuthService.logout();
				if (response.userLoggedOut) {
					console.log('logout successful');
					$state.go('login');
				} else {
					console.log('logout failed');

					ctrl.serverError.hasError = true;
					ctrl.serverError.errorMessage = response.error.message;
				}
				
				blockUI.stop();
			}, 1000);
		}
	}]);