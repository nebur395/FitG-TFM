var express = require('express');
var errorMessageHandler = require('../common/errorMessageHandler').errorMessageHandler;

module.exports = function (app) {

    var router = express.Router();
    var AnaerobicExercise = app.models.AnaerobicExercise;
    var AnaerobicMark = app.models.AnaerobicMark;

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

        AnaerobicExercise.findOne({_id: id}, function (err, exercise) {
            if (err) {
                return errorMessageHandler(err, res);
            }
            if (!exercise) {
                return res.status(400).send({
                    "message": "Anaerobic exercise does not exist."
                });
            }
            if (exercise.idUser && (req.jwtPayload._id !== exercise.idUser.toString())) {
                return res.status(401).send({
                    "message": "Invalid or non-existent token. Please, send a correct token."
                });
            }

            req.anaerobicExercise = exercise;
            return next();
        });
    });

    router.get("/:anaerobicExercise", function (req, res) {
        var exercise = req.anaerobicExercise.toJSON();
        delete exercise.__v;
        return res.status(200).send({
            "exercise": exercise
        });
    });

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
