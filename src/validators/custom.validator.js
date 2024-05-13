import _ from 'lodash'

const latitude = (value, helpers) => {
  // TODO: fix regexp
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid latitude')
  }
  return value
}

const longtitude = (value, helpers) => {
  // TODO: fix regexp
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid longtitude')
  }
  return value
}

const objectId = (value, helpers) => {
  if (!_.isNumber(value)) {
    // TODO: regexp
    return helpers.message('"{{#label}}" must be a valid id')
  }
  return value
}

export default {
  latitude,
  longtitude,
  objectId
}
