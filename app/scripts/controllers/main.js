'use strict';

/**
 * @ngdoc function
 * @name xFuApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the xFuApp
 */
angular.module('Main', [])
    .controller('MainController', function($scope, $mdToast) {

        function uploadFiles() {

            var filesToUpload = [];
            for (var i = 0; i < $scope.files.length; i++) {
                filesToUpload[i] = $scope.files[i].lfFile;
            }
            
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

        $scope.uploadFiles = uploadFiles;
    });