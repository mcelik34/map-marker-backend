import httpStatus from 'http-status'
import { markerService } from '../services/index.js'
import catchAsync from '../utils/catchAsync.js'
import pick from '../utils/pick.js'

const createMarker = catchAsync(async (req, res) => {
  const marker = await markerService.createMarker(req.body)
  res.status(httpStatus.CREATED).send(marker)
})

const getMarkers = catchAsync(async (req, res) => {
  const options = pick(req.query, ['sortBy', 'limit', 'page'])
  const result = await markerService.queryMarkers(options)
  res.send(result)
})

const deleteMarker = catchAsync(async (req, res) => {
  await markerService.deleteMarkerById(req.params.markerId)
  res.status(httpStatus.NO_CONTENT).send()
})

export default {
  createMarker,
  getMarkers,
  deleteMarker
}
