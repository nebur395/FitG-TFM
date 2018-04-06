var server = require('../../server');
var BodyAnalisis = server.models.BodyAnalisis;

/*
 * Create a body analisis
 */
function createBodyAnalisis(idUser, callback) {

    var newAnalisis = new BodyAnalisis();
    newAnalisis.weight = 1;
    newAnalisis.bmi = 1;
    newAnalisis.metabolicAge = 1;
    newAnalisis.basalMetabolism = 1;
    newAnalisis.bodyFat = 1;
    newAnalisis.muscleMass = 1;
    newAnalisis.boneMass = 1;
    newAnalisis.bodyFluids = 1;
    newAnalisis.visceralAdiposity = 1;
    newAnalisis.dailyCaloricIntake = 1;
    newAnalisis.idUser = idUser;

    newAnalisis.save(function (err, result) {
        callback(result._id);
    });
}

/*
 * Delete a body analisis by id
 */
function deleteBodyAnalisisById(analisisId, callback) {

    BodyAnalisis.collection.remove({"_id": {$in: analisisId}}, function () {
        callback();
    });
}

exports.createBodyAnalisis = createBodyAnalisis;
exports.deleteBodyAnalisisById = deleteBodyAnalisisById;
