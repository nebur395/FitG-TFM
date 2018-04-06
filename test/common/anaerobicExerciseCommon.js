var server = require('../../server');
var AnaerobicExercise = server.models.AnaerobicExercise;

/*
 * Create a predefined anaerobic exercise
 */
function createPredefinedAnaerobicExercise(idUser, callback) {

    var newExercise = new AnaerobicExercise();
    newExercise.name = "Predefined anaerobic exercise test";
    newExercise.category = "muscle training";
    newExercise.type = "chest";
    newExercise.custom = false;
    newExercise.idUser = idUser;
    newExercise.description = "test";

    newExercise.save(function (err, result) {
        callback(result._id);
    });
}

/*
 * Create a custom anaerobic exercise
 */
function createCustomAnaerobicExercise(idUser, callback) {

    var newExercise = new AnaerobicExercise();
    newExercise.name = "Custom anaerobic exercise test";
    newExercise.category = "muscle training";
    newExercise.type = "chest";
    newExercise.custom = true;
    newExercise.idUser = idUser;
    newExercise.description = "test";

    newExercise.save(function (err, result) {
        callback(result._id);
    });
}

/*
 * Delete an anaerobic exercise by id
 */
function deleteAnaerobicExerciseById(exercisesId, callback) {

    AnaerobicExercise.collection.remove({"_id": {$in: exercisesId}}, function () {
        callback();
    });
}

exports.createPredefinedAnaerobicExercise = createPredefinedAnaerobicExercise;
exports.createCustomAnaerobicExercise = createCustomAnaerobicExercise;
exports.deleteAnaerobicExerciseById = deleteAnaerobicExerciseById;
