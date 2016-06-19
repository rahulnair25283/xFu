'use strict';

angular.module('download', [
	'service.download'
	])
	.config(['$stateProvider', function($stateProvider) {
		$stateProvider
			.state('download', {
				url: '/download',
				parent: 'main',
				templateUrl: 'download/download.tmpl.html',
				controller: 'DownloadController',
                controllerAs: 'downloadCtrl',
				data: {
					authRequired: true
				}

			});
	}])
	.controller('DownloadController', ['$scope', 'DownloadService', function ($scope, DownloadService) {
		
		var ctrl = this;

		ctrl.files = DownloadService.listFiles();
	}]);