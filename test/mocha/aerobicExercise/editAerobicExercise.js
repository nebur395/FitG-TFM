var chai = require('chai'),
    chaiHttp = require('chai-http'),
    should = chai.should(),
    server = require('../../../server'),
    userCommon = require('../../common/userCommon'),
    createUserToken = require('../../common/jwtCreator').createUserToken,
    aerobicExerciseCommon = require('../../common/aerobicExerciseCommon'),
    feedbackMessageCommon = require('../../common/feedbackMessageCommon');

chai.use(chaiHttp);

/**
 * Test suite for aerobic exercise functionalities.
 */
describe('AerobicExercise', function () {

    var username = "Testing",
        email = "Testing@email.com",
        password = "Testing";

    var exerciseName = "exercise test",
        exerciseName2 = "exercise test2",
        category = "running",
        type = "sprint";

    var exercisesId = [],
        idUser;

    var entityExist = "Unique key duplicated.",
        isNotCustom = "Predefined exercises can not be modified.",
        successMessage = "Aerobic exercise updated successfully.";

    /*
     * It creates a new exercise before the test suite starts executing.
     */
    before(function (done) {

        userCommon.createUser(username, email, password, function(id) {
            idUser = id;
            aerobicExerciseCommon.createAerobicExercise(exerciseName, category, type, true, idUser, "", function (id) {
                exercisesId.push(id);
                aerobicExerciseCommon.createAerobicExercise(exerciseName2, category, type, false, idUser, "", function(id){
                    exercisesId.push(id);
                    done();
                });
            });
        });

    });

    /**
     * Tests for aerobicExercise functionality.
     */
    describe('#editAerobicExercise()', function () {

        it('should edit an existing aerobic exercise', function (done) {

            chai.request(server)
                .put('/aerobicExercises/' + exercisesId[0])
                .send({name: exerciseName, category: category, type: type})
                .set('Authorization','Bearer ' + createUserToken(idUser, email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 200, successMessage);
                    done();
                });
        });

        it('should return an error message since the exercise already exists', function (done) {

            chai.request(server)
                .put('/aerobicExercises/' + exercisesId[0])
                .send({name: exerciseName2, category: category, type: type})
                .set('Authorization','Bearer ' + createUserToken(idUser, email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 400, entityExist);
                    done();
                });
        });

        it('should return an error message since name is blank', function (done) {

            chai.request(server)
                .put('/aerobicExercises/' + exercisesId[0])
                .send({name: "", category: category, type: type})
                .set('Authorization','Bearer ' + createUserToken(idUser, email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 400, "name");

                    done();
                });
        });

        it('should return an error message since category is blank', function (done) {

            chai.request(server)
                .put('/aerobicExercises/' + exercisesId[0])
                .send({name: exerciseName, category: "", type: type})
                .set('Authorization','Bearer ' + createUserToken(idUser, email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 400, "category");

                    done();
                });
        });

        it('should return an error message since type is blank', function (done) {

            chai.request(server)
                .put('/aerobicExercises/' + exercisesId[0])
                .send({name: exerciseName, category: category, type: ""})
                .set('Authorization','Bearer ' + createUserToken(idUser, email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 400, "type");

                    done();
                });
        });

        it('should return an error message since category is not valid', function (done) {

            chai.request(server)
                .put('/aerobicExercises/' + exercisesId[0])
                .send({name: exerciseName, category: "category", type: type})
                .set('Authorization','Bearer ' + createUserToken(idUser, email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 400, "category");

                    done();
                });
        });

        it('should return an error message since type is not valid', function (done) {

            chai.request(server)
                .put('/aerobicExercises/' + exercisesId[0])
                .send({name: exerciseName, category: category, type: "type"})
                .set('Authorization','Bearer ' + createUserToken(idUser, email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 400, "type");

                    done();
                });
        });

        it('should return an error message since is not a custom exercise', function (done) {

            chai.request(server)
                .put('/aerobicExercises/' + exercisesId[1])
                .send({name: exerciseName, category: category, type: type})
                .set('Authorization','Bearer ' + createUserToken(idUser, email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 400, isNotCustom);

                    done();
                });
        });

        /*
         * Removes the exercises created during the signIn tests.
         */
        after(function (done) {

            userCommon.deleteUserById(idUser, function () {
                aerobicExerciseCommon.deleteAerobicExerciseById(exercisesId, done);
            });
        });

    });
});
