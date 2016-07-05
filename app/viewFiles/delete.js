'use strict';

angular.module('delete', [
	'service.delete',
	'service.viewFiles'
	])
	.controller('DeleteController', ['$mdDialog', 'DeleteService', 'ViewService', function($mdDialog, DeleteService, ViewService) {

		var ctrl = this;

		ctrl.showConfirm = function(event, file) {
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

	}])