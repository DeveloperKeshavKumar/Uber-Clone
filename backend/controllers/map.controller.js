import { validationResult } from "express-validator"
import { getAddressCoordinates, getAddressDistanceAndTime } from "../services/map.service.js"

export const getCoordinates = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const coodinates = await getAddressCoordinates(req.query.address)
        res.status(200).json(coodinates)
    } catch (error) {
        console.error("Error retrieving coordinates:", error.message)
        return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" })
    }
}

export const getDistanceAndTime = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const { origin, destination } = req.query

        const distanceAndtime = await getAddressDistanceAndTime(origin, destination)
        res.status(200).json(distanceAndtime)
    } catch (error) {
        console.error("Error retrieving Distance and Time:", error.message)
        return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" })
    }
}

export const getSuggestions = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const suggestions = await getAutoCompleteSuggestions(req.query.input)
        res.status(200).json(suggestions)
    } catch (error) {
        console.error("Error retrieving Distance and Time:", error.message)
        return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" })
    }
}