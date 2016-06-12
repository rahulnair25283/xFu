'use strict';

angular.module('upload', [
    'service.authentication',
    'service.upload',
    'service.notification'
    ])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('upload', {
                url: '/upload',
                parent: 'main',
                templateUrl: 'upload/upload.tmpl.html',
                controller: 'UploadController',
                controllerAs: 'uploadCtrl',
                data: {
                    authRequired: true
                }
            });
    }])
    .controller('UploadController', ['$scope', 'AuthService', 'UploadService', 'NotificationService', function($scope,
        AuthService, UploadService, NotificationService) {
        
        var ctrl = this;

        var currentUser = AuthService.getCurrentUser();

        ctrl.uploadFiles = function() {

            var filesToUpload = prepareFilesToUpload($scope.files);

            UploadService.upload(filesToUpload, currentUser.email);
            NotificationService.broadcast("We are trying to upload your files, just give us a moment...");
        }

        function prepareFilesToUpload(files) {
            var filesToUpload = [];

            for (var i = 0; i < files.length; i++) {
                filesToUpload[i] = $scope.files[i].lfFile;
            }

            return filesToUpload;
        }
    }]);