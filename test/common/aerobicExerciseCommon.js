var server = require('../../server');
var AerobicExercise = server.models.AerobicExercise;

/*
 * Create a predefined aerobic exercise
 */
function createPredefinedAerobicExercise(idUser, callback) {

    var newExercise = new AerobicExercise();
    newExercise.name = "Predefined aerobic exercise test";
    newExercise.category = "running";
    newExercise.type = "sprint";
    newExercise.custom = false;
    newExercise.idUser = idUser;
    newExercise.description = "test";

    newExercise.save(function (err, result) {
        callback(result._id);
    });
}

/*
 * Create a custom aerobic exercise
 */
function createCustomAerobicExercise(idUser, callback) {

    var newExercise = new AerobicExercise();
    newExercise.name = "Custom aerobic exercise test";
    newExercise.category = "running";
    newExercise.type = "sprint";
    newExercise.custom = true;
    newExercise.idUser = idUser;
    newExercise.description = "test";

    newExercise.save(function (err, result) {
        callback(result._id);
    });
}

/*
 * Delete an aerobic exercise by id
 */
function deleteAerobicExerciseById(exercisesId, callback) {

    AerobicExercise.collection.remove({"_id": {$in: exercisesId}}, function () {
        callback();
    });
}

exports.createPredefinedAerobicExercise = createPredefinedAerobicExercise;
exports.createCustomAerobicExercise = createCustomAerobicExercise;
exports.deleteAerobicExerciseById = deleteAerobicExerciseById;
