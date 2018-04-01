var chai = require('chai'),
    chaiHttp = require('chai-http'),
    should = chai.should(),
    server = require('../../../server'),
    jwt = require('jsonwebtoken'),
    userCommon = require('../../common/userCommon'),
    feedbackMessageCommon = require('../../common/feedbackMessageCommon'),
    createUserToken = require('../../common/jwtCreator').createUserToken;

chai.use(chaiHttp);

/**
 * Test suite for User functionalities.
 */
describe('User', function () {

    var username = "Testing",
        email = "Testing@email.com",
        email2 = "Testing2@email.com",
        password = "Testing",
        idUsers = [];

    var invalidPassword = "Invalid new password.",
        passwordsNotMatch = "New passwords do not match.",
        emailExist = "Unique key duplicated.",
        incorrectCredentials = "Incorrect password or email.",
        invalidIDUsers = "Cast to ObjectId failed",
        successMessage = "User updated successfully.",
        invalidToken = "Invalid or non-existent token. Please, send a correct token.";

    /*
     * It creates a new user before the test suite starts executing.
     */
    before(function (done) {

        userCommon.createUser(username, email, password, function(id) {
            idUsers.push(id);

            userCommon.createUser(username, email2, password, function(id) {
                idUsers.push(id);
                done();
            });
        });

    });

    /**
     * Tests for editProfile functionality.
     */
    describe("#editProfile()", function () {

        it('should successfully edit a user profile changing all his information', function (done) {

            chai.request(server)
                .put('/users/' + idUsers[0])
                .send({email: email, username: username, oldPassword: password,
                    password: password, rePassword: password})
                .set('Authorization','Bearer ' + createUserToken(idUsers[0], email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 200, successMessage);

                    done();

                });
        });

        it('should successfully edit a user profile without new password', function (done) {

            chai.request(server)
                .put('/users/' + idUsers[0])
                .send({email: email, username: username, oldPassword: password,
                    password: "", rePassword: ""})
                .set('Authorization','Bearer ' + createUserToken(idUsers[0], email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 200, successMessage);

                    done();

                });
        });

        it('should return an error since new email already exist', function (done) {

            chai.request(server)
                .put('/users/' + idUsers[0])
                .send({email: email2, username: username, oldPassword: password,
                    password: password, rePassword: password})
                .set('Authorization','Bearer ' + createUserToken(idUsers[0], email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 400, emailExist);

                    done();

                });
        });

        it('should return an error since user id token doesn\'t match with user id param', function (done) {

            chai.request(server)
                .put('/users/' + idUsers[0])
                .send({email: email, username: username, oldPassword: password,
                    password: password, rePassword: password})
                .set('Authorization','Bearer ' + createUserToken(idUsers[1], email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 401, invalidToken);

                    done();

                });
        });

        it('should return an error since user doesn\'t exist', function (done) {

            userCommon.deleteUserById(idUsers[1], function() {
                    chai.request(server)
                        .put('/users/' + idUsers[1])
                        .send({email: email2, username: username, oldPassword: password,
                            password: password, rePassword: password})
                        .set('Authorization','Bearer ' + createUserToken(idUsers[0], email, username))
                        .end(function (err, result) {

                            feedbackMessageCommon.checkMessageCode(result, 404, incorrectCredentials);

                            done();

                        });
                }
                );
        });

        it('should return an error since user id is not valid', function (done) {

            chai.request(server)
                .put('/users/' + "1")
                .send({email: email, username: username, oldPassword: password,
                    password: password, rePassword: password})
                .set('Authorization','Bearer ' + createUserToken(idUsers[0], email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 500, invalidIDUsers);

                    done();

                });
        });

        it('should return an error since password is too short', function (done) {

            chai.request(server)
                .put('/users/' + idUsers[0])
                .send({email: email, username: username, oldPassword: password,
                    password: "pass", rePassword: "pass"})
                .set('Authorization','Bearer ' + createUserToken(idUsers[0], email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 400, invalidPassword);

                    done();

                });
        });

        it('should return an error since password is too long', function (done) {

            chai.request(server)
                .put('/users/' + idUsers[0])
                .send({email: email, username: username, oldPassword: password,
                    password: "PassPassPassPassPass1", rePassword: "PassPassPassPassPass1"})
                .set('Authorization','Bearer ' + createUserToken(idUsers[0], email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 400, invalidPassword);

                    done();

                });
        });

        it('should return an error since new passwords doesn\'t match', function (done) {

            chai.request(server)
                .put('/users/' + idUsers[0])
                .send({email: email, username: username, oldPassword: password,
                    password: password, rePassword: "pass"})
                .set('Authorization','Bearer ' + createUserToken(idUsers[0], email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 400, passwordsNotMatch);

                    done();

                });
        });

        it('should return an error since the user\'s password is wrong', function (done) {

            chai.request(server)
                .put('/users/' + idUsers[0])
                .send({email: email, username: username, oldPassword: "wrongPassword",
                    password: password, rePassword: password})
                .set('Authorization','Bearer ' + createUserToken(idUsers[0], email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 404, incorrectCredentials);

                    done();

                });
        });

        it('should return an error message since name is blank', function (done) {

            chai.request(server)
                .put('/users/' + idUsers[0])
                .send({email: email, username: "", oldPassword: password,
                    password: password, rePassword: password})
                .set('Authorization','Bearer ' + createUserToken(idUsers[0], email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 400, "username");

                    done();

                });
        });

        it('should return an error message since old password is blank', function (done) {

            chai.request(server)
                .put('/users/' + idUsers[0])
                .send({email: email, username: username, oldPassword: "",
                    password: password, rePassword: password})
                .set('Authorization','Bearer ' + createUserToken(idUsers[0], email, username))
                .end(function (err, result) {

                    feedbackMessageCommon.checkMessageCode(result, 404, incorrectCredentials);

                    done();

                });
        });
    });


    /*
     * Removes the user created at the begining of the tests
     * after every test is finished.
     */
    after(function (done) {

        userCommon.deleteUserById(idUsers[0], done);

    });
});
