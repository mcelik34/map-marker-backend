import { Router } from 'express'
import markerRoute from './marker.route.js'

export const router = Router()

router.use('/marker', markerRoute)

export default router
