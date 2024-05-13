import compression from 'compression'
import cors from 'cors'
import express, { json, urlencoded } from 'express'
import helmet from 'helmet'
import httpStatus from 'http-status'
import {
  errorHandler as morgansErrorHandler,
  successHandler as morgansSuccessHandler
} from './config/morgan.js'
import { errorConverter, errorHandler } from './middlewares/error.js'
import routes from './routes/index.js'
import ApiError from './utils/ApiError.js'

const app = express()

// TODO
app.use(morgansSuccessHandler)
app.use(morgansErrorHandler)

// set security HTTP headers
app.use(helmet())

// parse json request body
app.use(json())

// parse urlencoded request body
app.use(urlencoded({ extended: true }))

// gzip compression
app.use(compression())

// enable cors
app.use(cors())
app.options('*', cors())

// restful routes
app.use('/', routes)

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'))
})

// convert error to ApiError, if needed
app.use(errorConverter)

// handle error
app.use(errorHandler)

export default app
