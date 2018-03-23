module.exports = function (app) {

    var swaggerJSDoc = require("swagger-jsdoc");

    // swagger definition
    var swaggerDefinition = {
        info: {
            title: 'FitG API ',
            version: '1.0.0',
            description: 'Descripción de la API de FitG.'
        },
        host: 'localhost:8080',
        basePath: '/'
    };

    // options for the swagger docs
    var options = {
        // import swaggerDefinitions
        swaggerDefinition: swaggerDefinition,
        // path to the API docs
        apis: ['./server/controllers/*/*.js',
            './server/models/*.js']
    };

    // initialize swagger-jsdoc
    var swaggerSpec = swaggerJSDoc(options);

    // serve swagger
    app.get('/swagger.json', function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });

};
