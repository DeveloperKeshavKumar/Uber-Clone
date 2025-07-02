import { Router } from 'express'
import { body, query } from 'express-validator'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { createRide, getFare, confirmRide, startRide, endRide } from '../controllers/ride.controller.js'

const rideRouter = Router()

rideRouter.post('/create',
    authMiddleware, [
    body('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    body('vehicleType').isString().isIn(['auto', 'car', 'moto']).withMessage('Invalid vehicle type')
], createRide)

rideRouter.get('/fare',
    authMiddleware, [
    query('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    query('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address')
], getFare)

rideRouter.post('/confirm',
    authMiddleware,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    confirmRide
)

rideRouter.get('/start-ride',
    authMiddleware, [
    query('rideId').isMongoId().withMessage('Invalid ride id'),
    query('otp').isString().isLength({ min: 6, max: 6 }).withMessage('Invalid OTP')
], startRide)

rideRouter.post('/end-ride',
    authMiddleware,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    endRide
)

export default rideRouter