import { validationResult } from "express-validator";
import Ride from "../models/ride.model.js";
import { confirmRideService, createRideService, endRideService, getFareService, startRideService } from "../services/ride.services.js";
import { getAddressCoordinates, getCaptainsInTheRadius } from "../services/map.service.js";
import { sendMessageToSocketId } from "../config/socket.js";

export const createRide = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { userId, pickup, destination, vehicleType } = req.body;
        const ride = await createRideService({ user: req.userId, pickup, destination, vehicleType });

        res.status(201).json(ride);

        const pickupCoordinates = await getAddressCoordinates(pickup);
        const captainsInRadius = await getCaptainsInTheRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 2);

        ride.otp = ""

        const rideWithUser = await Ride.findOne({ _id: ride._id }).populate('user');
        captainsInRadius.map(captain => {
            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: rideWithUser
            })

        })
    } catch (error) {
        console.error("Error retrieving Distance and Time:", error.message);
        return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
}

export const getFare = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { pickup, destination } = req.query;
        const fare = await getFareService(pickup, destination);

        return res.status(200).json(fare);
    } catch (error) {
        console.error("Error retrieving Distance and Time:", error.message);
        return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
}

export const confirmRide = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { rideId } = req.body;
        const ride = await confirmRideService({ rideId, captain: req.captain });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (error) {
        console.error("Error retrieving Distance and Time:", error.message);
        return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
}

export const startRide = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { rideId, otp } = req.query;
        const ride = await startRideService({ rideId, otp, captain: req.captain });

        console.log(ride);

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (error) {
        console.error("Error retrieving Distance and Time:", error.message);
        return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
}

export const endRide = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { rideId } = req.body;
        const ride = await endRideService({ rideId, captain: req.captain });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (error) {
        console.error("Error retrieving Distance and Time:", error.message);
        return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
}