'use strict';

angular.module('viewFiles', [
	'service.viewFiles',
	'service.delete'
	])
	.config(['$stateProvider', function($stateProvider) {
		$stateProvider
			.state('view', {
				url: '/view',
				parent: 'main',
				templateUrl: 'viewFiles/view.tmpl.html',
				controller: 'ViewController',
                controllerAs: 'viewCtrl',
				data: {
					authRequired: true
				}

			});
	}])
	.controller('ViewController', ['$scope', '$mdDialog', 'ViewService', 'DeleteService', function ($scope, $mdDialog, ViewService, DeleteService) {
		
		var ctrl = this;

		ctrl.files = ViewService.listFiles();

		ctrl.hasFiles = function() {
			return ctrl.files.data.length != 0;
		}

		ctrl.confirmDelete = function(event, file) {
			// Appending dialog to document.body to cover sidenav in docs app
			var confirm = $mdDialog.confirm()
				.title('Please confirm')
				.textContent('Do you really wish to delete this file?')
				.ariaLabel('File deletion confirmation')
				.targetEvent(event)
				.ok('Delete')
				.cancel('Hell No');
			
			$mdDialog.show(confirm).then(function() {
				var promise = DeleteService.delete(file).then(function() {
					ctrl.files = ViewService.listFiles();
				}, function() {});
			}, function() {});
		};
	}]);