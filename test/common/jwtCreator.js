var variables = require('../../server/config/variables.config');
var jwt = require('jsonwebtoken');

/*
 * Create a jwt with [id], [username] and [email] params.
 */
function createUserToken(id, email, username){
    return jwt.sign(
        {
            _id: id,
            email: email,
            username: username
        },
        variables.fitG_secret,
        {
            expiresIn: "1h"     // expires in 1 hour
        });
}

exports.createUserToken = createUserToken;
