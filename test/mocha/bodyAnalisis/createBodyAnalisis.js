var chai = require('chai'),
    chaiHttp = require('chai-http'),
    should = chai.should(),
    ObjectId = require('mongoose').Types.ObjectId,
    server = require('../../../server'),
    userCommon = require('../../common/userCommon'),
    createUserToken = require('../../common/jwtCreator').createUserToken,
    bodyAnalisisCommon = require('../../common/bodyAnalisisCommon'),
    feedbackMessageCommon = require('../../common/feedbackMessageCommon');

chai.use(chaiHttp);

/**
 * Test suite for body analisis functionalities.
 */
describe('BodyAnalisis', function () {

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

    var analisisId = [],
        idUser;

    var entityExist = "Body analisis already created today.";

    /*
     * It creates a new entities before the test suite starts executing.
     */
    before(function (done) {

        userCommon.createUser(username, email, password, function (id) {
            idUser = id;
            done();
        });

    });

    /**
     * Tests for create body analisis functionality.
     */
    describe('#createBodyAnalisis()', function () {

        it('should return an error message since weight is too long', function (done) {

            chai.request(server)
                .post('/bodyAnalisis/')
                .send({weight: 401, bmi: bmi, metabolicAge: metabolicAge,
                    basalMetabolism: basalMetabolism, bodyFat: bodyFat, muscleMass: muscleMass,
                    boneMass: boneMass, bodyFluids: bodyFluids, visceralAdiposity: visceralAdiposity,
                    dailyCaloricIntake: dailyCaloricIntake})
                .set('Authorization', 'Bearer ' + createUserToken(idUser, email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 400, "weight");

                    done();
                });
        });

        it('should return an error message since weight is too short', function (done) {

            chai.request(server)
                .post('/bodyAnalisis/')
                .send({weight: -1, bmi: bmi, metabolicAge: metabolicAge,
                    basalMetabolism: basalMetabolism, bodyFat: bodyFat, muscleMass: muscleMass,
                    boneMass: boneMass, bodyFluids: bodyFluids, visceralAdiposity: visceralAdiposity,
                    dailyCaloricIntake: dailyCaloricIntake})
                .set('Authorization', 'Bearer ' + createUserToken(idUser, email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 400, "weight");

                    done();
                });
        });

        it('should return an error message since bmi is too long', function (done) {

            chai.request(server)
                .post('/bodyAnalisis/')
                .send({weight: weight, bmi: 201, metabolicAge: metabolicAge,
                    basalMetabolism: basalMetabolism, bodyFat: bodyFat, muscleMass: muscleMass,
                    boneMass: boneMass, bodyFluids: bodyFluids, visceralAdiposity: visceralAdiposity,
                    dailyCaloricIntake: dailyCaloricIntake})
                .set('Authorization', 'Bearer ' + createUserToken(idUser, email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 400, "bmi");

                    done();
                });
        });

        it('should return an error message since bmi is too short', function (done) {

            chai.request(server)
                .post('/bodyAnalisis/')
                .send({weight: weight, bmi: -1, metabolicAge: metabolicAge,
                    basalMetabolism: basalMetabolism, bodyFat: bodyFat, muscleMass: muscleMass,
                    boneMass: boneMass, bodyFluids: bodyFluids, visceralAdiposity: visceralAdiposity,
                    dailyCaloricIntake: dailyCaloricIntake})
                .set('Authorization', 'Bearer ' + createUserToken(idUser, email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 400, "bmi");

                    done();
                });
        });

        it('should return an error message since metabolicAge is too long', function (done) {

            chai.request(server)
                .post('/bodyAnalisis/')
                .send({weight: weight, bmi: bmi, metabolicAge: 151,
                    basalMetabolism: basalMetabolism, bodyFat: bodyFat, muscleMass: muscleMass,
                    boneMass: boneMass, bodyFluids: bodyFluids, visceralAdiposity: visceralAdiposity,
                    dailyCaloricIntake: dailyCaloricIntake})
                .set('Authorization', 'Bearer ' + createUserToken(idUser, email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 400, "metabolicAge");

                    done();
                });
        });

        it('should return an error message since metabolicAge is too short', function (done) {

            chai.request(server)
                .post('/bodyAnalisis/')
                .send({weight: weight, bmi: bmi, metabolicAge: -1,
                    basalMetabolism: basalMetabolism, bodyFat: bodyFat, muscleMass: muscleMass,
                    boneMass: boneMass, bodyFluids: bodyFluids, visceralAdiposity: visceralAdiposity,
                    dailyCaloricIntake: dailyCaloricIntake})
                .set('Authorization', 'Bearer ' + createUserToken(idUser, email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 400, "metabolicAge");

                    done();
                });
        });

        it('should return an error message since basalMetabolism is too long', function (done) {

            chai.request(server)
                .post('/bodyAnalisis/')
                .send({weight: weight, bmi: bmi, metabolicAge: metabolicAge,
                    basalMetabolism: 10001, bodyFat: bodyFat, muscleMass: muscleMass,
                    boneMass: boneMass, bodyFluids: bodyFluids, visceralAdiposity: visceralAdiposity,
                    dailyCaloricIntake: dailyCaloricIntake})
                .set('Authorization', 'Bearer ' + createUserToken(idUser, email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 400, "basalMetabolism");

                    done();
                });
        });

        it('should return an error message since basalMetabolism is too short', function (done) {

            chai.request(server)
                .post('/bodyAnalisis/')
                .send({weight: weight, bmi: bmi, metabolicAge: metabolicAge,
                    basalMetabolism: -1, bodyFat: bodyFat, muscleMass: muscleMass,
                    boneMass: boneMass, bodyFluids: bodyFluids, visceralAdiposity: visceralAdiposity,
                    dailyCaloricIntake: dailyCaloricIntake})
                .set('Authorization', 'Bearer ' + createUserToken(idUser, email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 400, "basalMetabolism");

                    done();
                });
        });

        it('should return an error message since bodyFat is too long', function (done) {

            chai.request(server)
                .post('/bodyAnalisis/')
                .send({weight: weight, bmi: bmi, metabolicAge: metabolicAge,
                    basalMetabolism: basalMetabolism, bodyFat: 101, muscleMass: muscleMass,
                    boneMass: boneMass, bodyFluids: bodyFluids, visceralAdiposity: visceralAdiposity,
                    dailyCaloricIntake: dailyCaloricIntake})
                .set('Authorization', 'Bearer ' + createUserToken(idUser, email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 400, "bodyFat");

                    done();
                });
        });

        it('should return an error message since bodyFat is too short', function (done) {

            chai.request(server)
                .post('/bodyAnalisis/')
                .send({weight: weight, bmi: bmi, metabolicAge: metabolicAge,
                    basalMetabolism: basalMetabolism, bodyFat: -1, muscleMass: muscleMass,
                    boneMass: boneMass, bodyFluids: bodyFluids, visceralAdiposity: visceralAdiposity,
                    dailyCaloricIntake: dailyCaloricIntake})
                .set('Authorization', 'Bearer ' + createUserToken(idUser, email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 400, "bodyFat");

                    done();
                });
        });

        it('should return an error message since muscleMass is too long', function (done) {

            chai.request(server)
                .post('/bodyAnalisis/')
                .send({weight: weight, bmi: bmi, metabolicAge: metabolicAge,
                    basalMetabolism: basalMetabolism, bodyFat: bodyFat, muscleMass: 151,
                    boneMass: boneMass, bodyFluids: bodyFluids, visceralAdiposity: visceralAdiposity,
                    dailyCaloricIntake: dailyCaloricIntake})
                .set('Authorization', 'Bearer ' + createUserToken(idUser, email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 400, "muscleMass");

                    done();
                });
        });

        it('should return an error message since muscleMass is too short', function (done) {

            chai.request(server)
                .post('/bodyAnalisis/')
                .send({weight: weight, bmi: bmi, metabolicAge: metabolicAge,
                    basalMetabolism: basalMetabolism, bodyFat: bodyFat, muscleMass: -1,
                    boneMass: boneMass, bodyFluids: bodyFluids, visceralAdiposity: visceralAdiposity,
                    dailyCaloricIntake: dailyCaloricIntake})
                .set('Authorization', 'Bearer ' + createUserToken(idUser, email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 400, "muscleMass");

                    done();
                });
        });

        it('should return an error message since boneMass is too long', function (done) {

            chai.request(server)
                .post('/bodyAnalisis/')
                .send({weight: weight, bmi: bmi, metabolicAge: metabolicAge,
                    basalMetabolism: basalMetabolism, bodyFat: bodyFat, muscleMass: muscleMass,
                    boneMass: 51, bodyFluids: bodyFluids, visceralAdiposity: visceralAdiposity,
                    dailyCaloricIntake: dailyCaloricIntake})
                .set('Authorization', 'Bearer ' + createUserToken(idUser, email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 400, "boneMass");

                    done();
                });
        });

        it('should return an error message since boneMass is too short', function (done) {

            chai.request(server)
                .post('/bodyAnalisis/')
                .send({weight: weight, bmi: bmi, metabolicAge: metabolicAge,
                    basalMetabolism: basalMetabolism, bodyFat: bodyFat, muscleMass: muscleMass,
                    boneMass: -1, bodyFluids: bodyFluids, visceralAdiposity: visceralAdiposity,
                    dailyCaloricIntake: dailyCaloricIntake})
                .set('Authorization', 'Bearer ' + createUserToken(idUser, email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 400, "boneMass");

                    done();
                });
        });

        it('should return an error message since bodyFluids is too long', function (done) {

            chai.request(server)
                .post('/bodyAnalisis/')
                .send({weight: weight, bmi: bmi, metabolicAge: metabolicAge,
                    basalMetabolism: basalMetabolism, bodyFat: bodyFat, muscleMass: muscleMass,
                    boneMass: boneMass, bodyFluids: 101, visceralAdiposity: visceralAdiposity,
                    dailyCaloricIntake: dailyCaloricIntake})
                .set('Authorization', 'Bearer ' + createUserToken(idUser, email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 400, "bodyFluids");

                    done();
                });
        });

        it('should return an error message since bodyFluids is too short', function (done) {

            chai.request(server)
                .post('/bodyAnalisis/')
                .send({weight: weight, bmi: bmi, metabolicAge: metabolicAge,
                    basalMetabolism: basalMetabolism, bodyFat: bodyFat, muscleMass: muscleMass,
                    boneMass: boneMass, bodyFluids: -1, visceralAdiposity: visceralAdiposity,
                    dailyCaloricIntake: dailyCaloricIntake})
                .set('Authorization', 'Bearer ' + createUserToken(idUser, email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 400, "bodyFluids");

                    done();
                });
        });

        it('should return an error message since visceralAdiposity is too long', function (done) {

            chai.request(server)
                .post('/bodyAnalisis/')
                .send({weight: weight, bmi: bmi, metabolicAge: metabolicAge,
                    basalMetabolism: basalMetabolism, bodyFat: bodyFat, muscleMass: muscleMass,
                    boneMass: boneMass, bodyFluids: bodyFluids, visceralAdiposity: 60,
                    dailyCaloricIntake: dailyCaloricIntake})
                .set('Authorization', 'Bearer ' + createUserToken(idUser, email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 400, "visceralAdiposity");

                    done();
                });
        });

        it('should return an error message since visceralAdiposity is too short', function (done) {

            chai.request(server)
                .post('/bodyAnalisis/')
                .send({weight: weight, bmi: bmi, metabolicAge: metabolicAge,
                    basalMetabolism: basalMetabolism, bodyFat: bodyFat, muscleMass: muscleMass,
                    boneMass: boneMass, bodyFluids: bodyFluids, visceralAdiposity: -1,
                    dailyCaloricIntake: dailyCaloricIntake})
                .set('Authorization', 'Bearer ' + createUserToken(idUser, email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 400, "visceralAdiposity");

                    done();
                });
        });

        it('should return an error message since dailyCaloricIntake is too long', function (done) {

            chai.request(server)
                .post('/bodyAnalisis/')
                .send({weight: weight, bmi: bmi, metabolicAge: metabolicAge,
                    basalMetabolism: basalMetabolism, bodyFat: bodyFat, muscleMass: muscleMass,
                    boneMass: boneMass, bodyFluids: bodyFluids, visceralAdiposity: visceralAdiposity,
                    dailyCaloricIntake: 50001})
                .set('Authorization', 'Bearer ' + createUserToken(idUser, email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 400, "dailyCaloricIntake");

                    done();
                });
        });

        it('should return an error message since dailyCaloricIntake is too short', function (done) {

            chai.request(server)
                .post('/bodyAnalisis/')
                .send({weight: weight, bmi: bmi, metabolicAge: metabolicAge,
                    basalMetabolism: basalMetabolism, bodyFat: bodyFat, muscleMass: muscleMass,
                    boneMass: boneMass, bodyFluids: bodyFluids, visceralAdiposity: visceralAdiposity,
                    dailyCaloricIntake: -1})
                .set('Authorization', 'Bearer ' + createUserToken(idUser, email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 400, "dailyCaloricIntake");

                    done();
                });
        });

        it('should create a new body analisis', function (done) {

            chai.request(server)
                .post('/bodyAnalisis/')
                .send({weight: weight, bmi: bmi, metabolicAge: metabolicAge,
                    basalMetabolism: basalMetabolism, bodyFat: bodyFat, muscleMass: muscleMass,
                    boneMass: boneMass, bodyFluids: bodyFluids, visceralAdiposity: visceralAdiposity,
                    dailyCaloricIntake: dailyCaloricIntake})
                .set('Authorization', 'Bearer ' + createUserToken(idUser, email, username))
                .end(function (err, result) {

                    result.should.have.status(200);
                    result.body.should.be.a('object');
                    result.body.should.have.property('analisis');
                    result.body.analisis.should.be.a('object');
                    result.body.analisis.should.have.property('_id');
                    result.body.analisis.should.have.property('weight');
                    result.body.analisis.should.have.property('bmi');
                    result.body.analisis.should.have.property('metabolicAge');
                    result.body.analisis.should.have.property('basalMetabolism');
                    result.body.analisis.should.have.property('bodyFat');
                    result.body.analisis.should.have.property('muscleMass');
                    result.body.analisis.should.have.property('boneMass');
                    result.body.analisis.should.have.property('bodyFluids');
                    result.body.analisis.should.have.property('visceralAdiposity');
                    result.body.analisis.should.have.property('dailyCaloricIntake');
                    result.body.analisis.should.have.property('idUser');

                    analisisId.push(new ObjectId(result.body.analisis._id));

                    done();
                });
        });

        it('should return an error message since the exercise already exists today', function (done) {

            chai.request(server)
                .post('/bodyAnalisis/')
                .send({weight: weight, bmi: bmi, metabolicAge: metabolicAge,
                    basalMetabolism: basalMetabolism, bodyFat: bodyFat, muscleMass: muscleMass,
                    boneMass: boneMass, bodyFluids: bodyFluids, visceralAdiposity: visceralAdiposity,
                    dailyCaloricIntake: dailyCaloricIntake})
                .set('Authorization','Bearer ' + createUserToken(idUser, email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 400, entityExist);
                    done();
                });
        });

        /*
         * Removes the exercises created during the signIn tests.
         */
        after(function (done) {

            userCommon.deleteUserById(idUser, function () {
                bodyAnalisisCommon.deleteBodyAnalisisById(analisisId, done);
            });
        });

    });
});
