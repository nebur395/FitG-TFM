var server = require('../../server');
var User = server.models.User;

/*
 * Create a user
 */
function createUser(username, email, password, callback) {

    var user = new User();
    user.email = email;
    user.username = username;
    user.setPassword(password);

    user.save(function (err, result) {
        callback(result._id);
    });
}

/*
 * Delete a user by id
 */
function deleteUserById(idUser, callback) {

    User.collection.remove({"_id": idUser}, function () {
        callback();
    });
}

/*
 * Delete a user by email
 */
function deleteUserByEmail(email, callback) {

    User.collection.remove({"email": email}, function () {
        callback();
    });
}

exports.createUser = createUser;
exports.deleteUserById = deleteUserById;
exports.deleteUserByEmail = deleteUserByEmail;
