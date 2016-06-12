'use strict';

angular.module('main', [
	])
	.config(function($stateProvider, $urlRouterProvider) {

		$stateProvider
			.state('main', {
				url: '',
				templateUrl: 'main/main.tmpl.html',
				controller: 'MainController',
				controllerAs: 'mainCtrl',
				data: {
					authRequired: true
				}
			})
			.state('welcome', {
				url: '/welcome',
				parent: 'main',
				templateUrl: 'main/welcome.tmpl.html',
				data: {
					authRequired: true
				}	
			});
	})
	.controller('MainController', ['$scope', '$mdSidenav', 'AuthService', function($scope, $mdSidenav,
		AuthService) {
		var ctrl = this;

		ctrl.currentModule;

		ctrl.modules = [
			{
				title: 'Upload',
				icon: 'file_upload',
				url: 'upload'
			},
			{
				title: 'Download',
				icon: 'file_download',
				url: 'download'
			}
		];

		ctrl.adminModules = [
			{
				title: 'Settings',
				icon: 'settings',
				url: 'settings'
			}
		];

		ctrl.currentUser = AuthService.getCurrentUser();

		ctrl.toggleMenu = function() {
			$mdSidenav('left').toggle();
		}

		ctrl.setCurrentModule = function(module) {
			ctrl.currentModule = module;
		}

		ctrl.isCurrentModule = function(module) {
			if (module && ctrl.currentModule) {
				return ctrl.currentModule === module;
			}
			return false;
		}
	}]);