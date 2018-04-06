var server = require('../../server');
var AerobicMark = server.models.AerobicMark;

/*
 * Create an aerobic mark
 */
function createAerobicMark(idExercise, idUser, callback) {

    var newMark = new AerobicMark();
    newMark.distance = 1;
    newMark.time = 1;
    newMark.intensity = 1;
    newMark.heartRate = 1;
    newMark.comment = "test";
    newMark.idUser = idUser;
    newMark.idExercise = idExercise;

    newMark.save(function (err, result) {
        callback(result._id);
    });
}

/*
 * Delete an aerobic mark by id
 */
function deleteAerobicMarkById(marksId, callback) {

    AerobicMark.collection.remove({"_id": {$in: marksId}}, function () {
        callback();
    });
}

exports.createAerobicMark = createAerobicMark;
exports.deleteAerobicMarkById = deleteAerobicMarkById;
