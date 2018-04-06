var express = require('express');
var errorMessageHandler = require('../common/errorMessageHandler').errorMessageHandler;
var bodyAnalisisParam = require('../common/aerobicExercise.param').bodyAnalisisParam;

module.exports = function (app) {

    var router = express.Router();
    var BodyAnalisis = app.models.BodyAnalisis;

    /**
     * @swagger
     * /bodyAnalisis/:
     *   get:
     *     tags:
     *       - Body Analisis
     *     summary: Listar análisis físicos.
     *     description: Lista todos los análisis físicos.
     *     consumes:
     *       - application/json
     *       - charset=utf-8
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: Authorization
     *         description: |
     *           JWT estándar: `Authorization: Bearer + JWT`.
     *         in: header
     *         required: true
     *         type: string
     *         format: byte
     *     responses:
     *       200:
     *         description: Lista con todos los análisis físicos.
     *         schema:
     *           type: object
     *           properties:
     *              analisis:
     *               type: array
     *               items:
     *                $ref: '#/definitions/BodyAnalisis'
     *       401:
     *         description: Mensaje de feedback para el usuario. Normalmente causado por no
     *           tener un token correcto o tenerlo caducado.
     *         schema:
     *           $ref: '#/definitions/FeedbackMessage'
     *       500:
     *         description: Mensaje de feedback para el usuario.
     *         schema:
     *           $ref: '#/definitions/FeedbackMessage'
     */
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


    router.post("/", function (req, res) {
        var startToday = new Date();
        startToday.setHours(0,0,0,0);

        var endToday = new Date();
        endToday.setHours(23,59,59,999);

        // Find if there is any body analisis created in the same day
        BodyAnalisis.find({creationDate: {$gte: startToday, $lt: endToday}}, function (err, analisis) {
            if (err) {
                return errorMessageHandler(err, res);
            } else if (analisis) {
                return res.status(400).send({
                    "message": "Body analisis already created today."
                });
            } else {
                var newAnalisis = new BodyAnalisis();

                // Add the new attributes to the body analisis object
                newAnalisis.weight = req.body.weight;
                newAnalisis.bmi = req.body.bmi;
                newAnalisis.metabolicAge = req.body.metabolicAge;
                newAnalisis.basalMetabolism = req.body.basalMetabolism;
                newAnalisis.bodyFat = req.body.bodyFat;
                newAnalisis.muscleMass = req.body.muscleMass;
                newAnalisis.boneMass = req.body.boneMass;
                newAnalisis.bodyFluids = req.body.bodyFluids;
                newAnalisis.visceralAdiposity = req.body.visceralAdiposity;
                newAnalisis.dailyCaloricIntake = req.body.dailyCaloricIntake;
                newAnalisis.idUser = req.jwtPayload._id;

                newAnalisis.save(function (err, exercise) {
                    if (err) {
                        return errorMessageHandler(err, res);
                    } else {
                        exercise = exercise.toJSON();
                        delete exercise.__v;
                        return res.status(200).send({
                            "analisis": analisis
                        });
                    }
                });
            }
        });
    });

    return router;
};
