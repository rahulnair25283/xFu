'use strict';

angular.module('fileUpload', [
	'service.authentication'
	])
    .config(function ($stateProvider) {
        $stateProvider
        .state('upload', {
            url: '/upload',
            parent: 'layout',
            templateUrl: 'fileUpload/fileUpload.tmpl.html',
            controller: 'FileUploadController',
            controllerAs: 'fileUploadCtrl',
            data: {
                authRequired: true
            }
        
        });
    })
	.controller('FileUploadController', ['$scope', '$mdToast', 'AuthService', function($scope, $mdToast, AuthService) {
		var ctrl = this;

		ctrl.currentUser = AuthService.getCurrentUser();

		function uploadFiles() {

            var filesToUpload = [];
            for (var i = 0; i < $scope.files.length; i++) {
                filesToUpload[i] = $scope.files[i].lfFile;
            }
            
            Backendless.enablePromises();
            Backendless.Files.upload(filesToUpload, "rahul", true)
            .then(function(result) {
                console.log("File successfully uploaded. Path to download: " + result.fileURL);
                showToast("Awesome... Your files have been uploaded successfully!");
            })
            .catch(function(result) {
                console.log("error - " + result.message);
                showToast("Oh no... Something went wrong and we were unable to uploaded your files!");
            });

        }

        function showToast(message) {
            $mdToast.show($mdToast.simple().textContent(message).hideDelay(3000));
        }

        ctrl.uploadFiles = uploadFiles;
	}]);