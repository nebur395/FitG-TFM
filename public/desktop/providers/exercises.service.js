angular.module('fitGApp')

    // 'exerciseService' service manage the authentication function of the page with the server
    .factory('exerciseService', function ($state, $http, API) {

        return {
            getAerobics: getAerobics,
            getAnaerobics: getAnaerobics
        };

        //send the login info to the server
        function getAerobics() {
            return $http({
                method: 'GET',
                url: API.GET_AEROBIC_EXERCISE_ENDPOINT,
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            }).then(successData => {
                return successData.data.exercises;
            }).catch(errorData => {
                throw new Error(errorData.data.message);
            });
        }

        //send the login info to the server
        function getAnaerobics() {
            return $http({
                method: 'GET',
                url: API.GET_ANAEROBIC_EXERCISE_ENDPOINT,
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            }).then(successData => {
                return successData.data.exercises;
            }).catch(errorData => {
                throw new Error(errorData.data.message);
            });
        }
    });
