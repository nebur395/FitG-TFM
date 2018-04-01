var jwt = require('express-jwt'),
    variables = require("../config/variables.config");

module.exports = function jwtHandler(app) {

// Middleware that add a route access check
    app.use(jwt({secret: variables.fitG_secret, userProperty: 'jwtPayload'})
        .unless({
                path: [  // Non-authorization routes
                    {url: "/users/", methods: ['POST']},  // sign up
                    {url: "/login/", methods: ['POST']},  // Login
                    {url: "/swagger.json", methods: ['GET']},  // Swagger's JSON
                    {url: "/api-docs/", methods: ['GET']}  // Swagger's API Web
                ]
            }
        ));


// Middleware that manage JWT errors
    app.use(function (err, req, res, next) {
        if (err.name === 'UnauthorizedError') {
            res.status(401).send({
                "message": "Invalid or non-existent token. Please, send a correct token."
            });
        }
        else {
            next();
        }
    });
};
