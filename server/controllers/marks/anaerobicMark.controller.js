var express = require('express');
var errorMessageHandler = require('../common/errorMessageHandler').errorMessageHandler;
var anaerobicExerciseParam = require('../common/anaerobicExercise.param').anaerobicExerciseParam;
var anaerobicMarkParam = require('../common/anaerobicMark.param').anaerobicMarkParam;

module.exports = function (app) {

    var router = express.Router();
    var AnaerobicMark = app.models.AnaerobicMark;

    // Preload post objects on routes with ':anaerobicExercise'
    router.param('anaerobicExercise', function(req, res, next, id) {
        anaerobicExerciseParam(req, res, next, id)
    });

    router.get("/:anaerobicExercise/anaerobicMarks", function (req, res) {
        AnaerobicMark.find({$and: [
                {idUser: req.jwtPayload._id},
                {idExercise: req.anaerobicExercise._id}
            ]},
            '-__v', function (err, marks) {
                if (err) {
                    return errorMessageHandler(err, res);

                } else {
                    return res.status(200).send({
                        "marks": marks
                    });
                }
            });
    });

    return router;
};
