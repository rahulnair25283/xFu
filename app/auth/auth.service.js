'use strict';

angular.module('service.authentication', [])
	.service('AuthService', ['$q', function($q) {

	var service = this;

	var currentUser;

	service.login = function(credentials) {
		console.log("In AuthService, attempting to login...");

		var response = {
			userLoggedIn: false,
			error: null
		};

		try {
			currentUser = Backendless.UserService.login(credentials.email, credentials.password, true);
			response.userLoggedIn = true;
		} catch (err) {
			response.userLoggedIn = false;
			response.error = err;
		}

		return response;
	}

	service.logout = function() {

		var response = {
			userLoggedOut: false,
			error: null
		};

		try {
			Backendless.UserService.logout()
			currentUser = null;
			response.userLoggedOut = true;
		} catch (err) {
			response.userLoggedOut = false;
			response.error = err;
		}

		return response;
	}

	service.isAuthenticated = function() {
		return getCurrentUser() != null;
	}

	function getCurrentUser() {
		if (currentUser) {
			return currentUser;
		} 

		return Backendless.UserService.getCurrentUser();
	}

	service.getCurrentUser = getCurrentUser;
}]);