'use strict';

angular.module('service.notification', [
	])
	.service('NotificationService', ['$mdToast', function ($mdToast) {
		
		var service = this;

		service.broadcast = function(message) {
			$mdToast.show($mdToast.simple().textContent(message).position('bottom right').hideDelay(4000));
		}
	}])