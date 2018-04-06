var express = require('express');
var errorMessageHandler = require('../common/errorMessageHandler').errorMessageHandler;
var bodyAnalysisParam = require('./bodyAnalysis.param').bodyAnalysisParam;

module.exports = function (app) {

    var router = express.Router();
    var BodyAnalysis = app.models.BodyAnalysis;

    /**
     * @swagger
     * /bodyAnalysis/:
     *   get:
     *     tags:
     *       - Body Analysis
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
     *              analysis:
     *               type: array
     *               items:
     *                $ref: '#/definitions/BodyAnalysis'
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
        BodyAnalysis.find({idUser: req.jwtPayload._id}, '-__v', function (err, analysis) {
                if (err) {
                    return errorMessageHandler(err, res);

                } else {
                    return res.status(200).send({
                        "analysis": analysis
                    });
                }
            });
    });

    /**
     * @swagger
     * /bodyAnalysis/:
     *   post:
     *     tags:
     *       - Body Analysis
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
     *              analysisgit story:
     *                $ref: '#/definitions/BodyAnalysis'
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

        // Find if there is any body analysis created in the same day
        BodyAnalysis.find({$and: [
            {creationDate: {$gte: startToday, $lt: endToday}},
            {idUser: req.jwtPayload._id}
        ]}, function (err, analysis) {
            if (err) {
                return errorMessageHandler(err, res);
            } else if (analysis.length !== 0) {
                return res.status(400).send({
                    "message": "Body analysis already created today."
                });
            } else {
                var newAnalysis = new BodyAnalysis();

                // Add the new attributes to the body analysis object
                newAnalysis.weight = req.body.weight;
                newAnalysis.bmi = req.body.bmi;
                newAnalysis.metabolicAge = req.body.metabolicAge;
                newAnalysis.basalMetabolism = req.body.basalMetabolism;
                newAnalysis.bodyFat = req.body.bodyFat;
                newAnalysis.muscleMass = req.body.muscleMass;
                newAnalysis.boneMass = req.body.boneMass;
                newAnalysis.bodyFluids = req.body.bodyFluids;
                newAnalysis.visceralAdiposity = req.body.visceralAdiposity;
                newAnalysis.dailyCaloricIntake = req.body.dailyCaloricIntake;
                newAnalysis.idUser = req.jwtPayload._id;

                newAnalysis.save(function (err, analysis) {
                    if (err) {
                        return errorMessageHandler(err, res);
                    } else {
                        analysis = analysis.toJSON();
                        delete analysis.__v;
                        return res.status(200).send({
                            "analysis": analysis
                        });
                    }
                });
            }
        });
    });

    // Preload post objects on routes with ':analysis'
    router.param('analysis', function(req, res, next, id) {
        bodyAnalysisParam(req, res, next, id)
    });

    /**
     * @swagger
     * /bodyAnalysis/{analysis}:
     *   post:
     *     tags:
     *       - Body Analysis
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
     *       - name: analysis
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
     *              analysis:
     *                $ref: '#/definitions/BodyAnalysis'
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
    router.get("/:analysis", function (req, res) {
        var analysis = req.bodyAnalysis.toJSON();
        delete analysis.__v;
        return res.status(200).send({
            "analysis": analysis
        });
    });

    /**
     * @swagger
     * /bodyAnalysis/{analysis}:
     *   put:
     *     tags:
     *       - Body Analysis
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
     *       - name: analysis
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
    router.put("/:analysis", function (req, res) {
        // Edit the new attributes to the analysis object
        req.bodyAnalysis.weight = req.body.weight;
        req.bodyAnalysis.bmi = req.body.bmi;
        req.bodyAnalysis.metabolicAge = req.body.metabolicAge;
        req.bodyAnalysis.basalMetabolism = req.body.basalMetabolism;
        req.bodyAnalysis.bodyFat = req.body.bodyFat;
        req.bodyAnalysis.muscleMass = req.body.muscleMass;
        req.bodyAnalysis.boneMass = req.body.boneMass;
        req.bodyAnalysis.bodyFluids = req.body.bodyFluids;
        req.bodyAnalysis.visceralAdiposity = req.body.visceralAdiposity;
        req.bodyAnalysis.dailyCaloricIntake = req.body.dailyCaloricIntake;

        req.bodyAnalysis.save(function (err) {
            if (err) {
                return errorMessageHandler(err, res);
            } else {
                return res.status(200).send({
                    "message": "Body analysis updated successfully."
                });
            }
        });
    });

    /**
     * @swagger
     * /aerobicExercises/{aerobicExercise}:
     *   delete:
     *     tags:
     *       - Aerobic exercises
     *     summary: Elimina un ejercicio aeróbico
     *     description: Elimina un ejercicio aeróbico existente únicamente si es personalizado.
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
     *       - name: aerobicExercise
     *         description: Identificador del ejercicio que se quiere eliminar.
     *         in: path
     *         required: true
     *         type: string
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
    router.delete("/:analysis", function (req, res) {
        // Remove the body analysis
        BodyAnalysis.remove({_id: req.bodyAnalysis._id}, function (err) {
            if (err) {
                return errorMessageHandler(err, res);
            } else {
                return res.status(200).send({
                    "message": "Body analysis deleted successfully."
                });
            }
        });
    });

    return router;
};
