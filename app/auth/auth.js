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
	.controller('AuthController', ['$scope', '$state', 'AuthService', function($scope, $state,
		AuthService) {

		var ctrl = this;

		ctrl.credentials = {
			email: '',
			password: ''
		};

		ctrl.serverError = {
			hasError: false,
			errorMessage: ''
		}

		ctrl.loginWith = function(credentials) {
			var response = AuthService.login(credentials);
			if (response.userLoggedIn) {
				$state.go('welcome');
			} else {
				ctrl.serverError.hasError = true;
				ctrl.serverError.errorMessage = response.error.message;
				$state.go('login');
			}
		}

		ctrl.logout = function() {
			console.log('Logging out...');
			var response = AuthService.logout()
			if (response.userLoggedOut) {
				$state.go('login');
			} else {
				ctrl.serverError.hasError = true;
				ctrl.serverError.errorMessage = response.error.message;
			}
		}
	}]);