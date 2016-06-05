'use strict';

angular.module('authentication', [
	'service.authentication'
	])
	.controller('AuthController', ['$scope', '$location', 'AuthService', function($scope, $location,
		AuthService) {
		
		var ctrl = this;

		ctrl.credentials = {
			email: '',
			password: ''
		};

		ctrl.loginWith = function(credentials) {
			var response = AuthService.login(credentials);
			if (response.userLoggedIn) {
				$location.url('/upload');
			} else {
				ctrl.authErrorMsg = response.error.message;
				$location.url('/');
			}
		}
	}]);