'use strict';

angular.module('settings', [
	])
	.config(['$stateProvider', function($stateProvider) {
		$stateProvider
			.state('settings', {
				url: '/settings',
				parent: 'main',
				templateUrl: 'admin/settings.tmpl.html',
				data: {
					authRequired: true
				}

			});
	}])
	.controller('SettingsCtrl', ['$scope', function ($scope) {
		
	}])