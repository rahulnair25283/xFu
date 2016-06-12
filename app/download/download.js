'use strict';

angular.module('download', [
	])
	.config(['$stateProvider', function($stateProvider) {
		$stateProvider
			.state('download', {
				url: '/download',
				parent: 'main',
				templateUrl: 'download/download.tmpl.html',
				data: {
					authRequired: true
				}

			});
	}])
	.controller('DownloadController', ['$scope', function ($scope) {
		
	}]);