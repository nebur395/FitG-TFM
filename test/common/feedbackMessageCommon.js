/*
 * Checks the code and message property of a feedback message
 */
function checkMessageCode(result, code, text){

    result.should.have.status(code);
    result.body.should.be.a('object');
    result.body.should.have.property('message');
    result.body.message.should.include(text);

}

exports.checkMessageCode = checkMessageCode;
