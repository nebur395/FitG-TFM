var models = require('../../models');
var AnaerobicExercise = models.AnaerobicExercise;
var errorMessageHandler = require('./errorMessageHandler').errorMessageHandler;

/**
 * @name errorMessageHandler
 * @desc Manage a http message from  a Mongoose error
 * @param {Object} err - Mongoose error object
 * @param {Object } res - Http response
 */
function anaerobicExerciseParam(req, res, next, id){

    AnaerobicExercise.findOne({_id: id}, function (err, exercise) {
        if (err) {
            return errorMessageHandler(err, res);
        }
        if (!exercise) {
            return res.status(404).send({
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
}

exports.anaerobicExerciseParam = anaerobicExerciseParam;
