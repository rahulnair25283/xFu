'use strict';

angular.module('service.download', [
	'service.authentication'
	])
	.service('DownloadService', ['AuthService', function (AuthService) {

		var service = this;

		service.listFiles = function() {
			var currentUser = AuthService.getCurrentUser();
			
			var root = "/";
			var allFiles = null;
			try {
				var userFolder = root + currentUser.email;
				allFiles = Backendless.Files.listing(userFolder, "*", true);
			} catch(err) {
				console.log(err.code + ": " + err.message);				
			}

			return allFiles;
		}
		
	}])