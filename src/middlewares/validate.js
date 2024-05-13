import httpStatus from 'http-status'
import joi from 'joi'
import ApiError from '../utils/ApiError.js'
import pick from '../utils/pick.js'

export default (schema) => (req, res, next) => {
  const validSchema = pick(schema, ['params', 'query', 'body'])
  const object = pick(req, Object.keys(validSchema))
  const { value, error } = joi
    .compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object)

  if (error) {
    const errorMessage = error.details
      .map((details) => details.message)
      .join(', ')
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage))
  }
  Object.assign(req, value)
  return next()
}
