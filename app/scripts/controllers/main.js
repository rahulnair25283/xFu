'use strict';

/**
 * @ngdoc function
 * @name xFuApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the xFuApp
 */
angular.module('Main', [])
    .controller('MainController', function($scope) {

        function uploadFile() {

            var filesToUpload = $scope.files;
            Backendless.Files.upload(filesToUpload, "rahul", true)
            .then(function(result) {
                console.log("File successfully uploaded. Path to download: " + result.fileURL);
            })
            .catch(function(result) {
                console.log("error - " + result.message);
            });

            angular.forEach($scope.files, function(file) {
                console.log(file.name);
            })
        }

        $scope.uploadFile = uploadFile;
    });