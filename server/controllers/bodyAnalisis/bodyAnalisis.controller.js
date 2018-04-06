var express = require('express');
var errorMessageHandler = require('../common/errorMessageHandler').errorMessageHandler;
var bodyAnalisisParam = require('../common/aerobicExercise.param').bodyAnalisisParam;

module.exports = function (app) {

    var router = express.Router();
    var BodyAnalisis = app.models.BodyAnalisis;


    router.get("/", function (req, res) {
        BodyAnalisis.find({idUser: req.jwtPayload._id}, '-__v', function (err, analisis) {
                if (err) {
                    return errorMessageHandler(err, res);

                } else {
                    return res.status(200).send({
                        "analisis": analisis
                    });
                }
            });
    });

    return router;
};
