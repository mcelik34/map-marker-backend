import { Router } from 'express'
import { markerController } from '../controllers/index.js'
import validate from '../middlewares/validate.js'
import { markerValidator } from '../validators/index.js'

const router = Router()

router
  .route('/')
  .post(validate(markerValidator.createMarker), markerController.createMarker)
  .get(validate(markerValidator.getMarkers), markerController.getMarkers)

router
  .route('/:markerId')
  .delete(validate(markerValidator.deleteMarker), markerController.deleteMarker)

export default router
