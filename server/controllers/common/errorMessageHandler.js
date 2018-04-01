/**
 * @name errorMessageHandler
 * @desc Manage a http message from  a Mongoose error
 * @param {Object} err - Mongoose error object
 * @param {Object } res - Http response
 */
function errorMessageHandler(err, res){

    if (err && (err.name === "ValidationError")) {
        return res.status(400).send({
            "message": err.message
        });

    } else if (err && (err.code === 11000)) {
        return res.status(400).send({
            "message": "Unique key duplicated."
        });

    } else if (err) {
        return res.status(500).send({
            "message": err.message
        });
    }
}

exports.errorMessageHandler = errorMessageHandler;
