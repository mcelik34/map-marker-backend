import httpStatus from 'http-status'
import _ from 'lodash'
import ApiError from '../utils/ApiError.js'

let markersDB = []
let idCounter = -1

const createMarker = async (markerBody) => {
  const marker = {
    id: ++idCounter,
    ...markerBody,
    datetime: new Date().toISOString()
  }
  markersDB.push(marker)

  return marker
}

const queryMarkers = async (options) => {
  let markers = [...markersDB]

  if (options) {
    if (options.sortBy) {
      markers = _.sortBy(markers, [options.sortBy])
    }
    if (options.limit > 0 && options.page > 0) {
      const start = (options.page - 1) * options.limit
      markers = _.slice(markers, start, start + options.limit)
    }
  }
  return {
    page: options.page,
    limit: options.limit,
    total: markersDB.length,
    total_pages: Math.ceil(markersDB.length / options.limit) || 1,
    data: markers
  }
}

const deleteMarkerById = async (markerId) => {
  const marker = markersDB.find((m) => m.id === markerId)
  if (!marker) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Marker not found')
  }
  markersDB = markersDB.filter((m) => m.id !== marker.id)
  return { id: marker.id }
}

export default {
  createMarker,
  queryMarkers,
  deleteMarkerById
}
