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

    /**
     * @swagger
     * /bodyAnalisis/:
     *   post:
     *     tags:
     *       - Body Analisis
     *     summary: Crear un análisis físico
     *     description: Crea un análisis físico si no se ha creado ya uno en el mismo día.
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
     *       - name: bmi
     *         description: Indice de masa corporal (I.M.C.). Se calcula como masa/(estatura²).
     *         in: body
     *         type: number
     *       - name: weight
     *         description: Peso en expresado en kg.
     *         in: body
     *         type: number
     *       - name: metabolicAge
     *         description: Edad metabólica.
     *         in: body
     *         type: number
     *       - name: basalMetabolism
     *         description: Metabolismo basal.
     *         in: body
     *         type: number
     *       - name: bodyFat
     *         description: Grasa corporal expresado en %.
     *         in: body
     *         type: number
     *       - name: muscleMass
     *         description: Masa muscular expresada en kg.
     *         in: body
     *         type: number
     *       - name: boneMass
     *         description: Masa ósea expresada en kg.
     *         in: body
     *         type: number
     *       - name: bodyFluids
     *         description: Líquidos corporales expresados en %.
     *         in: body
     *         type: number
     *       - name: visceralAdiposity
     *         description: Adiposidad visceral recogida en la escala de 1-59.
     *         in: body
     *         type: number
     *       - name: dailyCaloricIntake
     *         description: Aporte calórico diario.
     *         in: body
     *         type: number
     *     responses:
     *       200:
     *         description: Un análisis físico con toda su información.
     *         schema:
     *           type: object
     *           properties:
     *              analisisgit story:
     *                $ref: '#/definitions/BodyAnalisis'
     *       400:
     *         description: Mensaje de feedback para el usuario.
     *         schema:
     *           $ref: '#/definitions/FeedbackMessage'
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

    // Preload post objects on routes with ':analisis'
    router.param('analisis', function(req, res, next, id) {
        bodyAnalisisParam(req, res, next, id)
    });

    /**
     * @swagger
     * /bodyAnalisis/{analisis}:
     *   post:
     *     tags:
     *       - Body Analisis
     *     summary: Listar análisis físico.
     *     description: Lista toda la información de un análisis físico.
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
     *       - name: analisis
     *         description: Identificador del análisis que se quiere listar.
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Un análisis físico con toda su información.
     *         schema:
     *           type: object
     *           properties:
     *              analisis:
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
    router.get("/:analisis", function (req, res) {
        var analisis = req.bodyAnalisis.toJSON();
        delete analisis.__v;
        return res.status(200).send({
            "analisis": analisis
        });
    });

    /**
     * @swagger
     * /bodyAnalisis/{analisis}:
     *   put:
     *     tags:
     *       - Body Analisis
     *     summary: Edita un análisis físico
     *     description: Edita un análisis físico existente.
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
     *       - name: analisis
     *         description: Identificador del análisis que se quiere listar.
     *         in: path
     *         required: true
     *         type: string
     *       - name: bmi
     *         description: Indice de masa corporal (I.M.C.). Se calcula como masa/(estatura²).
     *         in: body
     *         type: number
     *       - name: weight
     *         description: Peso en expresado en kg.
     *         in: body
     *         type: number
     *       - name: metabolicAge
     *         description: Edad metabólica.
     *         in: body
     *         type: number
     *       - name: basalMetabolism
     *         description: Metabolismo basal.
     *         in: body
     *         type: number
     *       - name: bodyFat
     *         description: Grasa corporal expresado en %.
     *         in: body
     *         type: number
     *       - name: muscleMass
     *         description: Masa muscular expresada en kg.
     *         in: body
     *         type: number
     *       - name: boneMass
     *         description: Masa ósea expresada en kg.
     *         in: body
     *         type: number
     *       - name: bodyFluids
     *         description: Líquidos corporales expresados en %.
     *         in: body
     *         type: number
     *       - name: visceralAdiposity
     *         description: Adiposidad visceral recogida en la escala de 1-59.
     *         in: body
     *         type: number
     *       - name: dailyCaloricIntake
     *         description: Aporte calórico diario.
     *         in: body
     *         type: number
     *     responses:
     *       200:
     *         description: Mensaje de feedback para el usuario.
     *         schema:
     *           $ref: '#/definitions/FeedbackMessage'
     *       400:
     *         description: Mensaje de feedback para el usuario.
     *         schema:
     *           $ref: '#/definitions/FeedbackMessage'
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
    router.put("/:analisis", function (req, res) {
        // Edit the new attributes to the analisis object
        req.bodyAnalisis.weight = req.body.weight;
        req.bodyAnalisis.bmi = req.body.bmi;
        req.bodyAnalisis.metabolicAge = req.body.metabolicAge;
        req.bodyAnalisis.basalMetabolism = req.body.basalMetabolism;
        req.bodyAnalisis.bodyFat = req.body.bodyFat;
        req.bodyAnalisis.muscleMass = req.body.muscleMass;
        req.bodyAnalisis.boneMass = req.body.boneMass;
        req.bodyAnalisis.bodyFluids = req.body.bodyFluids;
        req.bodyAnalisis.visceralAdiposity = req.body.visceralAdiposity;
        req.bodyAnalisis.dailyCaloricIntake = req.body.dailyCaloricIntake;

        req.bodyAnalisis.save(function (err) {
            if (err) {
                return errorMessageHandler(err, res);
            } else {
                return res.status(200).send({
                    "message": "Body analisis updated successfully."
                });
            }
        });
    });


    router.delete("/:analisis", function (req, res) {
        // Remove the body analisis
        BodyAnalisis.remove({_id: req.bodyAnalisis._id}, function (err) {
            if (err) {
                return errorMessageHandler(err, res);
            } else {
                return res.status(200).send({
                    "message": "Body analisis deleted successfully."
                });
            }
        });
    });

    return router;
};
