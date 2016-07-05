'use strict';

angular.module('service.delete', [
	'service.notification'
	])
	.service('DeleteService', ['NotificationService', '$q', function(NotificationService, $q) {

		var service = this;

		service.delete = function(file) {

			var defer = $q.defer();

			function success(result) {
                console.log("File successfully deleted.");
                NotificationService.broadcast("File has been deleted successfully!");
                defer.resolve();
            }

            function failure(result) {
                console.log("error - " + result.message);
                NotificationService.broadcast("Oh no... Something went wrong and we were unable to delete the file!");
                defer.reject();
            }

			Backendless.Files.remove(file.url, new Backendless.Async(success, failure));
			return defer.promise;
		}
	}]);