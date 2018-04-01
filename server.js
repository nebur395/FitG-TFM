// Required dependencies
var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require('mongoose'),
    morgan = require("morgan"),
    fs = require("fs"),
    jwt = require("express-jwt"),
    cors = require('cors'),
    http = require("http"),
    https = require("https"),
    passport = require("passport"),
    winston = require('winston');

// Creation of http connection
var app = express();
var server = http.createServer(app);
// Creation of https connection
var privateKey = fs.readFileSync('./server/config/httpsCredentials/localhost.key', 'utf8');
var certificate = fs.readFileSync('./server/config/httpsCredentials/localhost.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};
var httpsServer = https.createServer(credentials, app);

/*
 * Morgan used to log requests to the console in developer's mode
 * Comment this line in production mode
 */
app.use(morgan('dev'));

/*
 * Enable All CORS requests
 * Comment this line in production mode
 */
app.use(cors());

// Enable json body parser
app.use(bodyParser.json({limit: '20mb'}));
app.use(bodyParser.urlencoded({limit: '20mb', extended: true}));

// Inject client and swagger configuration
app.use(express.static('./public/desktop'));
require('./server/config/swagger-setup.config')(app);
// Midelware to access handler and JWT
require('./server/security/jwt-handler')(app);
// Inject models and routes
app.models = require('./server/models');
require('./server/controllers')(app);
// Initialize passport strategies
require('./server/security/local-passport');
app.use(passport.initialize());

// Database connection and server launching
var dbUri = 'mongodb://localhost:27017/fitgDb';
mongoose.connect(dbUri);
mongoose.connection.once('open', function () {

    winston.info("MongoDB connection created in " + dbUri);

    server.listen(8080, function () {
        winston.info("Server listening to PORT 8080");
    });

    //HTTPS server launch (compatible with http at the same time)
    httpsServer.listen(8443, function () {
        winston.info("Secure server listening to PORT 8443");
    });

});

module.exports = app;
