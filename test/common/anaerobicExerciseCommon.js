var server = require('../../server');
var AnaerobicExercise = server.models.AnaerobicExercise;

/*
 * Create an anaerobic exercise
 */
function createAnaerobicExercise(name, category, type, custom, idUser, description, callback) {

    var newExercise = new AnaerobicExercise();
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
 * Delete an anaerobic exercise by id
 */
function deleteAnaerobicExerciseById(exercisesId, callback) {

    AnaerobicExercise.collection.remove({"_id": {$in: exercisesId}}, function () {
        callback();
    });
}

exports.createAnaerobicExercise = createAnaerobicExercise;
exports.deleteAnaerobicExerciseById = deleteAnaerobicExerciseById;
