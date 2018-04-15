angular.module('fitGApp')

    .constant("API", {
        "AUTH_ENDPOINT": "/login/",
        "GET_AEROBIC_EXERCISE_ENDPOINT": "/aerobicExercises/",
        "GET_AEROBIC_MARK_ENDPOINT": "/aerobicMarks/",
        "GET_ANAEROBIC_EXERCISE_ENDPOINT": "/anaerobicExercises/",
        "GET_ANAEROBIC_MARK_ENDPOINT": "/anaerobicMarks/",
        "GET_BODY_ANALYSIS_ENDPOINT": "/bodyAnalysis/"
    });
