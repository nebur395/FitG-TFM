var server = require('../../server');
var AnaerobicMark = server.models.AnaerobicMark;

/*
 * Create an anaerobic mark
 */
function createAnaerobicMark(idExercise, idUser, repetitions, weight, time, comment, callback) {

    var newMark = new AnaerobicMark();
    newMark.repetitions = repetitions;
    newMark.weight = weight;
    newMark.time = time;
    newMark.comment = comment;
    newMark.idUser = idUser;
    newMark.idExercise = idExercise;

    newMark.save(function (err, result) {
        callback(result._id);
    });
}

/*
 * Delete an anaerobic mark by id
 */
function deleteAnaerobicMarkById(marksId, callback) {

    AnaerobicMark.collection.remove({"_id": {$in: marksId}}, function () {
        callback();
    });
}

exports.createAnaerobicMark = createAnaerobicMark;
exports.deleteAnaerobicMarkById = deleteAnaerobicMarkById;
