var server = require('../../server');
var AerobicMark = server.models.AerobicMark;

/*
 * Create an aerobic mark
 */
function createAerobicMark(idExercise, idUser, distance, time, intensity, heartRate, comment, callback) {

    var newMark = new AerobicMark();
    newMark.distance = distance;
    newMark.time = time;
    newMark.intensity = intensity;
    newMark.heartRate = heartRate;
    newMark.comment = comment;
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
