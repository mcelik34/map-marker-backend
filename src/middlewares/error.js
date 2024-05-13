import httpStatus from 'http-status'
import logger from '../config/logger.js'
import ApiError from '../utils/ApiError.js'

const errorConverter = (err, req, res, next) => {
  let error = err
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode
      ? httpStatus.BAD_REQUEST
      : httpStatus.INTERNAL_SERVER_ERROR
    const message = error.message || httpStatus[statusCode]
    error = new ApiError(statusCode, message, false, err.stack)
  }
  next(error)
}

const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err

  res.locals.errorMessage = err.message

  const response = {
    code: statusCode,
    message,
    stack: err.stack
  }

  logger.error(err)

  res.status(statusCode).send(response)
}

export { errorConverter, errorHandler }
