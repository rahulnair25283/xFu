'use strict';

angular.module('service.upload', [
	'service.notification'
	])
	.service('UploadService', ['NotificationService', function (NotificationService) {

		var service = this;

		service.upload = function(files, path) {
            
            function success(result) {
                console.log("Files successfully uploaded.");
                NotificationService.broadcast("Awesome... Your files have been uploaded successfully!");
            }

            function failure(result) {
                console.log("error - " + result.message);
                NotificationService.broadcast("Oh no... Something went wrong and we were unable to upload your files!");
            }
            
            Backendless.Files.upload(files, path, true, new Backendless.Async(success, failure));
		}
		
	}])