const CustomError = require('./customerror')
const { StatusCodes } = require('http-status-codes')

class BadRequestError extends CustomError {
    constructor(message = 'Bad Request') {
        super(message)
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}

module.exports = BadRequestError