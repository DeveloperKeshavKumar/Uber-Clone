import { Router } from "express";
import { getUserProfile, loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import { body } from "express-validator";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.post('/register', [
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
], registerUser);

userRouter.post('/login', [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email address'),
    body('password')
        .notEmpty()
        .withMessage('Password is required'),
], loginUser);

userRouter.get('/profile', authMiddleware, getUserProfile)

userRouter.get('/logout', logoutUser)


export default userRouter;