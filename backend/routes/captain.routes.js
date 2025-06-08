import { Router } from "express";
import { getCaptainProfile, loginCaptain, logoutCaptain, registerCaptain } from "../controllers/captain.controller.js";
import { body } from "express-validator";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const captainRouter = Router();

captainRouter.post('/register', [
    body('email')
        .isEmail().
        withMessage('Please enter a valid email address'),
    body('fullName.firstName')
        .isLength({ min: 4, max: 20 })
        .withMessage('First name must be between 4 and 20 characters long'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
        .matches(/\d/)
        .withMessage('Password must contain at least one number'),
    body('vehicle.color')
        .isLength({ min: 3 })
        .withMessage('Vehicle color must be at least 3 characters long'),
    body('vehicle.model')
        .isLength({ min: 3 })
        .withMessage('Vehicle model must be at least 3 characters long'),
    body('vehicle.plate')
        .matches(/^[A-Z]{2}[0-9]{1,2}[A-Z]{1,2}[0-9]{4}$/)
        .withMessage('Please enter a valid vehicle plate number'),
    body('vehicle.capacity')
        .isInt({ min: 1 })
        .withMessage('Vehicle capacity must be a positive integer'),
    body('vehicle.type')
        .isIn(['car', 'bike', 'auto'])
        .withMessage('Vehicle type must be either car, bike, or van'),
], registerCaptain);

captainRouter.post('/login', [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email address'),
    body('password')
        .notEmpty()
        .withMessage('Password is required'),
], loginCaptain);

captainRouter.get('/profile', authMiddleware, getCaptainProfile)

captainRouter.get('/logout', logoutCaptain)


export default captainRouter;