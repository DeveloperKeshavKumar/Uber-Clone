import jwt from 'jsonwebtoken';
import BlacklistToken from '../models/blacklistToken.model.js';

export const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const isBlacklisted = await BlacklistToken.findOne({ token });

    if (isBlacklisted) {
        return res.status(401).json({ message: "Token is blacklisted. Please log in again." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        return next();
    } catch (error) {
        console.error("Authentication error:", error.message);
        return res.status(400).json({ message: "Invalid token." });
    }
}