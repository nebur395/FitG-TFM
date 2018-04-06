var models = require('../../models/index');
var AerobicMark = models.AerobicMark;
var errorMessageHandler = require('../common/errorMessageHandler').errorMessageHandler;

/**
 * @name errorMessageHandler
 * @desc Manage a http message from  a Mongoose error
 * @param {Object} err - Mongoose error object
 * @param {Object } res - Http response
 */
function aerobicMarkParam(req, res, next, id) {

    AerobicMark.findOne({$and: [
            {_id: id},
            {idExercise: req.aerobicExercise._id}
        ]}, function (err, mark) {
        if (err) {
            return errorMessageHandler(err, res);
        }
        if (!mark) {
            return res.status(404).send({
                "message": "Aerobic mark does not exist."
            });
        }
        if (mark.idUser && (req.jwtPayload._id !== mark.idUser.toString())) {
            return res.status(401).send({
                "message": "Invalid or non-existent token. Please, send a correct token."
            });
        }

        req.aerobicMark = mark;
        return next();
    });
}

exports.aerobicMarkParam = aerobicMarkParam;
