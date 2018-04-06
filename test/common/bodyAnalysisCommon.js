var server = require('../../server');
var BodyAnalysis = server.models.BodyAnalysis;

/*
 * Create a body analysis
 */
function createBodyAnalysis(idUser, callback) {

    var newAnalysis = new BodyAnalysis();
    newAnalysis.weight = 1;
    newAnalysis.bmi = 1;
    newAnalysis.metabolicAge = 1;
    newAnalysis.basalMetabolism = 1;
    newAnalysis.bodyFat = 1;
    newAnalysis.muscleMass = 1;
    newAnalysis.boneMass = 1;
    newAnalysis.bodyFluids = 1;
    newAnalysis.visceralAdiposity = 1;
    newAnalysis.dailyCaloricIntake = 1;
    newAnalysis.idUser = idUser;

    newAnalysis.save(function (err, result) {
        callback(result._id);
    });
}

/*
 * Delete a body analysis by id
 */
function deleteBodyAnalysisById(analysisId, callback) {

    BodyAnalysis.collection.remove({"_id": {$in: analysisId}}, function () {
        callback();
    });
}

exports.createBodyAnalysis = createBodyAnalysis;
exports.deleteBodyAnalysisById = deleteBodyAnalysisById;
