var server = require('../../server');
var AnaerobicExercise = server.models.AnaerobicExercise;

/*
 * Create an anaerobic exercise
 */
function createAnaerobicExercise(name, category, type, custom, idUser, description, callback) {

    var AnaerobicExercise = new AnaerobicExercise();
    AnaerobicExercise.name = name;
    AnaerobicExercise.category = category;
    AnaerobicExercise.type = type;
    AnaerobicExercise.custom = custom;
    AnaerobicExercise.idUser = idUser;
    AnaerobicExercise.description = description;

    AnaerobicExercise.save(function (err, result) {
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
