var server = require('../../server');
var AnaerobicMark = server.models.AnaerobicMark;

/*
 * Create an anaerobic mark
 */
function createAnaerobicMark(idExercise, idUser, callback) {

    var newMark = new AnaerobicMark();
    newMark.repetitions = [1,1];
    newMark.weight = [1,1];
    newMark.time = [1,1];
    newMark.comment = "test";
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
