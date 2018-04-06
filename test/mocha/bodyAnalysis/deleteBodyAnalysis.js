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
 * Test suite for anaerobic exercise functionalities.
 */
describe('AnaerobicExercise', function () {

    var username = "Testing",
        email = "Testing@email.com",
        email2 = "Testing2@email.com",
        password = "Testing";

    var analysisId = [],
        idUsers = [];

    var notExists = "Body analysis does not exist.",
        invalidToken = "Invalid or non-existent token. Please, send a correct token.",
        invalidID = "Cast to ObjectId failed",
        successMessage = "Body analysis deleted successfully.";

    /*
     * It creates a new entities before the test suite starts executing.
     */
    before(function (done) {

        userCommon.createUser(username, email, password, function (id) {
            idUsers.push(id);
            userCommon.createUser(username, email2, password, function(id) {
                idUsers.push(id);
                bodyAnalysisCommon.createBodyAnalysis(idUsers[0], function (id) {
                    analysisId.push(id);
                    done();
                });
            });
        });
    });

    /**
     * Tests for delete body analysis functionality.
     */
    describe('#deleteBodyAnalysis()', function () {

        it('should return an error message since the user isn\'t the owner of the analysis', function (done) {

            chai.request(server)
                .delete('/bodyAnalysis/' + analysisId[0])
                .set('Authorization','Bearer ' + createUserToken(idUsers[1], email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 401, invalidToken);

                    done();
                });
        });

        it('should delete an existing body analysis', function (done) {

            chai.request(server)
                .delete('/bodyAnalysis/' + analysisId[0])
                .set('Authorization','Bearer ' + createUserToken(idUsers[0], email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 200, successMessage);
                    done();
                });
        });

        it('should return an error message since the analysis doesn\'t exists', function (done) {

            chai.request(server)
                .delete('/bodyAnalysis/' + analysisId[0])
                .set('Authorization','Bearer ' + createUserToken(idUsers[0], email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 404, notExists);

                    done();
                });
        });

        it('should return an error message since the analysis doesn\'t exists', function (done) {

            chai.request(server)
                .delete('/bodyAnalysis/' + '123')
                .set('Authorization','Bearer ' + createUserToken(idUsers[0], email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 500, invalidID);

                    done();
                });
        });

        /*
         * Removes the exercises created during the signIn tests.
         */
        after(function (done) {

            userCommon.deleteUserById(idUsers[0], function () {
                userCommon.deleteUserById(idUsers[1], function () {
                    bodyAnalysisCommon.deleteBodyAnalysisById(analysisId, done);
                });
            });
        });

    });
});
