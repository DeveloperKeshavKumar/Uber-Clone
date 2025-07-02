import User from "../models/user.model.js";
import { validationResult } from "express-validator";
import { createUser } from "../services/user.service.js";
import BlacklistToken from "../models/blacklistToken.model.js";

export const registerUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullName, email, password } = req.body;
        const { user, token } = await createUser({
            fullName,
            email,
            password
        });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(201).json({
            message: "User registered successfully",
            token,
            user
        });

    } catch (error) {
        console.error("Error registering user:", error.message);
        return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
}

export const loginUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password -__v -socketId");
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = user.generateAuthToken();
        const userObj = user.toObject();
        userObj.id = user._id;
        delete userObj._id;
        delete userObj.password;

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            message: "User logged in successfully",
            token,
            user: userObj
        });

    } catch (error) {
        console.error("Error logging in user:", error.message);
        return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
}

export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-__v -socketId");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const userObj = user.toObject();
        userObj.id = user._id;
        delete userObj._id;

        res.status(200).json({
            message: "User profile fetched successfully",
            user: userObj
        });

    } catch (error) {
        console.error("Error retrieving user profile:", error.message);
        return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
}

export const logoutUser = async (req, res) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(400).json({ message: "No user is logged in" });
    }
    res.clearCookie("token");
    const alreadyBlacklisted = await BlacklistToken.findOne({ token })
    if (alreadyBlacklisted) {
        return res.status(400).json({ message: "Already logged out. Log in again" })
    }
    await BlacklistToken.create({ token });
    res.status(200).json({ message: "User logged out successfully" });
}
