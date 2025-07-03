import Captain from "../models/captain.model.js";
import { validationResult } from "express-validator";
import { createCaptain } from "../services/captain.service.js";
import BlacklistToken from "../models/blacklistToken.model.js";

export const registerCaptain = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullName, email, password, vehicle } = req.body;
        const { captain, token } = await createCaptain({
            fullName,
            email,
            password, vehicle
        });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(201).json({
            message: "Captain registered successfully",
            token,
            captain
        });

    } catch (error) {
        console.error("Error registering Captain:", error.message);
        return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
}

export const loginCaptain = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        const captain = await Captain.findOne({ email }).select("+password -__v -socketId");
        if (!captain) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatch = await captain.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = captain.generateAuthToken();
        const captainObj = captain.toObject();
        captainObj.id = captain._id;
        delete captainObj._id;
        delete captainObj.password;

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            message: "Captain logged in successfully",
            token,
            captain: captainObj
        });

    } catch (error) {
        console.error("Error logging in Captain:", error.message);
        return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
}

export const getCaptainProfile = async (req, res) => {
    try {
        const captain = await Captain.findById(req.userId).select("-__v -socketId");
        if (!Captain) {
            return res.status(404).json({ message: "Captain not found" });
        }

        const captainObj = captain.toObject();
        captainObj.id = captain._id;
        delete captainObj._id;

        res.status(200).json({
            message: "Captain profile fetched successfully",
            captain: captainObj
        });

    } catch (error) {
        console.error("Error retrieving Captain profile:", error.message);
        return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
}

export const logoutCaptain = async (req, res) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(400).json({ message: "No Captain is logged in" });
    }
    res.clearCookie("token");
    const alreadyBlacklisted = await BlacklistToken.findOne({ token })
    if(alreadyBlacklisted){
        return res.status(400).json({message:"Already logged out. Log in again"})
    }
    await BlacklistToken.create({ token });
    res.status(200).json({ message: "Captain logged out successfully" });
}
