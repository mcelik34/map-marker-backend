import joi from 'joi'
import { customValidator } from './index.js'

const createMarker = {
  body: joi.object().keys({
    lat: joi.number().required(), // TODO: custom val.
    lng: joi.number().required() // TODO: custom val.
  })
}

const getMarkers = {
  query: joi.object().keys({
    sortBy: joi.string().valid(...['id', 'lat', 'lng']),
    limit: joi.number().integer(),
    page: joi.number().integer()
  })
}

const deleteMarker = {
  params: joi.object().keys({
    markerId: joi.number().custom(customValidator.objectId)
  })
}

export default { createMarker, deleteMarker, getMarkers }
