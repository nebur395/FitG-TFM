var models = require('../../models');
var AnaerobicMark = models.AnaerobicMark;
var errorMessageHandler = require('./errorMessageHandler').errorMessageHandler;

/**
 * @name errorMessageHandler
 * @desc Manage a http message from  a Mongoose error
 * @param {Object} err - Mongoose error object
 * @param {Object } res - Http response
 */
function anaerobicMarkParam(req, res, next, id) {

    AnaerobicMark.findOne({$and: [
        {_id: id},
        {idExercise: req.anaerobicExercise._id}
    ]}, function (err, mark) {
        if (err) {
            return errorMessageHandler(err, res);
        }
        if (!mark) {
            return res.status(404).send({
                "message": "Anaerobic mark does not exist."
            });
        }
        if (mark.idUser && (req.jwtPayload._id !== mark.idUser.toString())) {
            return res.status(401).send({
                "message": "Invalid or non-existent token. Please, send a correct token."
            });
        }

        req.anaerobicMark = mark;
        return next();
    });
}

exports.anaerobicMarkParam = anaerobicMarkParam;
