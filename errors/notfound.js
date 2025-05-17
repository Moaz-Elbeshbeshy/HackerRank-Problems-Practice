const CustomError = require('./customerror')
const { StatusCodes } = require('http-status-codes')

class NotFoundError extends CustomError {
    constructor(message = 'Resource not found') {
        super(message)
        this.statusCode = StatusCodes.NOT_FOUND
    }
}

module.exports = NotFoundError