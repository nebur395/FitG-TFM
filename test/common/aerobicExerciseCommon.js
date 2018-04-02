var server = require('../../server');
var AerobicExercise = server.models.AerobicExercise;

/*
 * Create an aerobic exercise
 */
function createAerobicExercise(name, category, type, custom, idUser, description, callback) {

    var newExercise = new AerobicExercise();
    newExercise.name = name;
    newExercise.category = category;
    newExercise.type = type;
    newExercise.custom = custom;
    newExercise.idUser = idUser;
    newExercise.description = description;

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

exports.createAerobicExercise = createAerobicExercise;
exports.deleteAerobicExerciseById = deleteAerobicExerciseById;
