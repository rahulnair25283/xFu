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
	.controller('AuthController', ['$scope', '$state', '$timeout', '$mdDialog', 'blockUI', 'AuthService', function($scope, $state,
		$timeout, $mdDialog, blockUI, AuthService) {

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

		ctrl.confirmLogout = function(event) {
			// Appending dialog to document.body to cover sidenav in docs app
			var confirm = $mdDialog.confirm()
				.title('Please confirm')
				.textContent('Do you really wish to logout of this amazing app?')
				.ariaLabel('Logout confirmation')
				.targetEvent(event)
				.ok('Logout')
				.cancel('Hell No');
			
			$mdDialog.show(confirm).then(function() {
				logout();
			}, function() {});
		};

		function logout() {
			
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