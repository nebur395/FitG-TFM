var express = require('express');
var errorMessageHandler = require('../common/errorMessageHandler').errorMessageHandler;
var anaerobicExerciseParam = require('../common/anaerobicExercise.param').anaerobicExerciseParam;

module.exports = function (app) {

    var router = express.Router();
    var AnaerobicExercise = app.models.AnaerobicExercise;
    var AnaerobicMark = app.models.AnaerobicMark;

    /**
     * @swagger
     * /anaerobicExercises/:
     *   get:
     *     tags:
     *       - Anaerobic exercises
     *     summary: Listar ejercicios anaeróbicos.
     *     description: Lista todos los ejercicios anaeróbicos predefinidos del sistema mas los
     *       personalizados del usuario.
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
     *         description: Lista con todos los ejercicios.
     *         schema:
     *           type: object
     *           properties:
     *              exercises:
     *               type: array
     *               items:
     *                $ref: '#/definitions/AnaerobicExercise'
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
        AnaerobicExercise.find({$or: [
                {idUser: req.jwtPayload._id},
                {custom: false}
            ]},
            '-__v', function (err, exercises) {
            if (err) {
                return errorMessageHandler(err, res);

            } else {
                return res.status(200).send({
                    "exercises": exercises
                });
            }
        });
    });

    /**
     * @swagger
     * /anaerobicExercises/:
     *   post:
     *     tags:
     *       - Anaerobic exercises
     *     summary: Crear un ejercicio anaeróbico
     *     description: Crea un nuevo ejercicio anaeróbico.
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
     *       - name: name
     *         description: Nombre del ejercicio.
     *         in: body
     *         required: true
     *         type: string
     *       - name: category
     *         description: Categoría del ejercicio anaeróbico (p.ej., muscle training).
     *         in: body
     *         required: true
     *         type: string
     *       - name: type
     *         description: Tipo del ejercicio anaeróbico (p.ej., chest, back).
     *         in: body
     *         required: true
     *         type: string
     *       - name: description
     *         description: Descripción del ejercicio.
     *         in: body
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Un ejercicio anaeróbico con toda su información.
     *         schema:
     *           type: object
     *           properties:
     *              exercise:
     *                $ref: '#/definitions/AnaerobicExercise'
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

        var newExercise = new AnaerobicExercise();

        // Add the new attributes to the exercise object
        newExercise.name = req.body.name;
        newExercise.category = req.body.category;
        newExercise.type = req.body.type;
        newExercise.idUser = req.jwtPayload._id;
        newExercise.description = req.body.description;

        newExercise.save(function (err, exercise) {
            if (err) {
                return errorMessageHandler(err, res);
            } else {
                exercise = exercise.toJSON();
                delete exercise.__v;
                return res.status(200).send({
                    "exercise": exercise
                });
            }
        });
    });

    // Preload post objects on routes with ':anaerobicExercise'
    router.param('anaerobicExercise', function(req, res, next, id) {
        anaerobicExerciseParam(req, res, next, id)
    });

    /**
     * @swagger
     * /anaerobicExercises/{anaerobicExercise}:
     *   post:
     *     tags:
     *       - Anaerobic exercises
     *     summary: Listar ejercicio anaeróbico.
     *     description: Lista toda la información de un ejercicio anaeróbico.
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
     *       - name: anaerobicExercise
     *         description: Identificador del ejercicio que se quiere listar.
     *         in: path
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Un ejercicio anaeróbico con toda su información.
     *         schema:
     *           type: object
     *           properties:
     *              exercise:
     *                $ref: '#/definitions/AnaerobicExercise'
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
    router.get("/:anaerobicExercise", function (req, res) {
        var exercise = req.anaerobicExercise.toJSON();
        delete exercise.__v;
        return res.status(200).send({
            "exercise": exercise
        });
    });

    /**
     * @swagger
     * /anaerobicExercises/{anaerobicExercise}:
     *   put:
     *     tags:
     *       - Anaerobic exercises
     *     summary: Edita un ejercicio anaeróbico
     *     description: Edita un ejercicio anaeróbico existente únicamente si es personalizado.
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
     *       - name: anaerobicExercise
     *         description: Identificador del ejercicio que se quiere editar.
     *         in: path
     *         required: true
     *         type: string
     *       - name: name
     *         description: Nombre del ejercicio.
     *         in: body
     *         required: true
     *         type: string
     *       - name: category
     *         description: Categoría del ejercicio anaeróbico (p.ej., muscle training).
     *         in: body
     *         required: true
     *         type: string
     *       - name: type
     *         description: Tipo del ejercicio anaeróbico (p.ej., chest, back).
     *         in: body
     *         required: true
     *         type: string
     *       - name: description
     *         description: Descripción del ejercicio.
     *         in: body
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
    router.put("/:anaerobicExercise", function (req, res) {

        // Check if the exercise is custom
        if (req.anaerobicExercise.custom) {
            // Add the new attributes to the exercise object
            req.anaerobicExercise.name = req.body.name;
            req.anaerobicExercise.category = req.body.category;
            req.anaerobicExercise.type = req.body.type;
            req.anaerobicExercise.description = req.body.description;

            req.anaerobicExercise.save(function (err) {
                if (err) {
                    return errorMessageHandler(err, res);
                } else {
                    return res.status(200).send({
                        "message": "Anaerobic exercise updated successfully."
                    });
                }
            });
        } else {
            return res.status(400).send({
                "message": "Predefined exercises can not be modified."
            });
        }
    });

    /**
     * @swagger
     * /anaerobicExercises/{anaerobicExercise}:
     *   delete:
     *     tags:
     *       - Anaerobic exercises
     *     summary: Elimina un ejercicio anaeróbico
     *     description: Elimina un ejercicio anaeróbico existente únicamente si es personalizado.
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
     *       - name: anaerobicExercise
     *         description: Identificador del ejercicio que se quiere editar.
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
    router.delete("/:anaerobicExercise", function (req, res) {

        // Check if the exercise is custom
        if (req.anaerobicExercise.custom) {
            // Remove the anaerobic exercise
            AnaerobicExercise.remove({_id: req.anaerobicExercise._id}, function (err) {
                if (err) {
                    return errorMessageHandler(err, res);
                } else {
                    // Remove the anaerobic marks of the exercise
                    AnaerobicMark.find({idExercise: req.anaerobicExercise._id}).remove(function (err) {
                        if (err) {
                            return errorMessageHandler(err, res);
                        } else {
                            return res.status(200).send({
                                "message": "Anaerobic exercise deleted successfully."
                            });
                        }
                    });
                }
            });
        } else {
            return res.status(400).send({
                "message": "Predefined exercises can not be deleted."
            });
        }
    });

    return router;
};
