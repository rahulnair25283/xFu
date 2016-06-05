'use strict';

angular.module('service.authentication', [])
	.service('AuthService', ['$timeout', function($timeout) {

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
				
				console.log("Hurray!! You have logged-in successfully!");
			} catch(err) {
				response.userLoggedIn = false;
				response.error = err;
				
				console.log("oops.. something went wrong!");
				console.log("got " + err.statusCode + ": " + err.message);
			}

			return response;
		}

		service.isAuthenticated = function() {
			getCurrentUser() != null;
		}

		function getCurrentUser() {
			if (currentUser) {
				return currentUser;
			}

			try {
				currentUser = Backendless.UserService.getCurrenctUser();	
			} catch (err) {
				currentUser = null;
				console.log("A current user could not be found!")
				console.log("got " + err.statusCode + ": " + err.message);
			}

			return currentUser;
		}


	}]);