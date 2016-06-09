'use strict';

angular.module('layout', [
	])
	.controller('LayoutController', ['$scope', '$mdSidenav', 'AuthService', function($scope, $mdSidenav, AuthService) {
		var ctrl = this;

		ctrl.menu = [
			{
				title: 	'Upload',
				icon: 	'file-export',
				link: 	''
			},
			{
				title: 	'Download Files',
				icon: 	'file-import',
				link: 	''
			}
		];

		ctrl.adminMenu = [
			{
				title: 	'Settings',
				icon: 	'',
				link: 	''
			}
		];

		ctrl.currentUser = AuthService.getCurrentUser();

		ctrl.toggleMenu = function() {
			$mdSidenav('left').toggle();
		}
	}]);