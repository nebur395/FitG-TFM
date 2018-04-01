var express = require('express');
var errorMessageHandler = require('../common/errorMessageHandler').errorMessageHandler;
var aerobicExerciseParam = require('../common/aerobicExercise.param').aerobicExerciseParam;

module.exports = function (app) {

    var router = express.Router();
    var AerobicExercise = app.models.AerobicExercise;
    var AerobicMark = app.models.AerobicMark;

    // Preload post objects on routes with ':aerobicExercise'
    router.param('aerobicExercise', function(req, res, next, id) {
        aerobicExerciseParam(req, res, next, id)
    });

    router.get("/:aerobicExercise/aerobicMarks", function (req, res) {
        AerobicMark.find({$and: [
                {idUser: req.jwtPayload._id},
                {idExercise: req.aerobicExercise._id}
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
