var chai = require('chai'),
    chaiHttp = require('chai-http'),
    should = chai.should(),
    server = require('../../../server'),
    userCommon = require('../../common/userCommon'),
    createUserToken = require('../../common/jwtCreator').createUserToken,
    bodyAnalysisCommon = require('../../common/bodyAnalysisCommon'),
    feedbackMessageCommon = require('../../common/feedbackMessageCommon');

chai.use(chaiHttp);

/**
 * Test suite for body analysis functionalities.
 */
describe('BodyAnalysis', function () {

    var username = "Testing",
        email = "Testing@email.com",
        password = "Testing";

    var weight = 1,
        bmi = 1,
        metabolicAge = 1,
        basalMetabolism = 1,
        bodyFat = 1,
        muscleMass = 1,
        boneMass = 1,
        bodyFluids = 1,
        visceralAdiposity = 1,
        dailyCaloricIntake = 1;

    var analysisId = [],
        idUser;

    var successMessage = "Body analysis updated successfully.";

    /*
     * It creates a new entities before the test suite starts executing.
     */
    before(function (done) {

        userCommon.createUser(username, email, password, function(id) {
            idUser = id;
            bodyAnalysisCommon.createBodyAnalysis(idUser, function (id) {
                analysisId.push(id);
                done();
            });
        });

    });

    /**
     * Tests for bodyAnalysis functionality.
     */
    describe('#editBodyAnalysis()', function () {

        it('should edit an existing body analysis', function (done) {

            chai.request(server)
                .put('/bodyAnalysis/' + analysisId[0])
                .send({weight: weight, bmi: bmi, metabolicAge: metabolicAge,
                    basalMetabolism: basalMetabolism, bodyFat: bodyFat, muscleMass: muscleMass,
                    boneMass: boneMass, bodyFluids: bodyFluids, visceralAdiposity: visceralAdiposity,
                    dailyCaloricIntake: dailyCaloricIntake})
                .set('Authorization','Bearer ' + createUserToken(idUser, email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 200, successMessage);
                    done();
                });
        });

        /*
         * Removes the entities created during the signIn tests.
         */
        after(function (done) {

            userCommon.deleteUserById(idUser, function () {
                bodyAnalysisCommon.deleteBodyAnalysisById(analysisId, done);
            });
        });

    });
});
