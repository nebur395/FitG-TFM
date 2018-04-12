angular.module('fitGApp')

    .controller('exercisesCtrl', ['$scope', 'aerobicExerciseService', 'notificationService',
        function ($scope, aerobicExerciseService, notificationService) {

            $scope.exerciseType = "Aerobic";

            $scope.changeExerciseType = function (type) {
                $scope.exerciseType = type;
            };

            // inputs visual variables
            $scope.aerobicExerciseList = [];

            // send the login form to the auth service
            $scope.getAerobicExerises = function () {
                aerobicExerciseService.getExercises()
                    .then(exercises => {
                        $scope.aerobicExerciseList = exercises;
                    })
                    .catch(error => {
                        notificationService.showError('&#10008', error.message);
                    });
            };
            $scope.getAerobicExerises();


        }]);
