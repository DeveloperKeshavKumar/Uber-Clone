import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { getCoordinates, getDistanceAndTime, getSuggestions } from '../controllers/map.controller.js'
import { query } from 'express-validator'

const mapRouter = Router()

mapRouter.get('/coordinates',
    authMiddleware,
    query('address').isString().isLength({ min: 3 }),
    getCoordinates)

mapRouter.get('/distance-time',
    authMiddleware, [
    query('origin').isString().isLength({ min: 3 }),
    query('destination').isString().isLength({ min: 3 })
], getDistanceAndTime)

mapRouter.get('/suggestions',
    authMiddleware,
    query('input').isString().isLength({ min: 3 }),
    getSuggestions)

export default mapRouter