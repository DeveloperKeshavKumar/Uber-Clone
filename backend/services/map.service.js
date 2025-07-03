import axios from 'axios'
import Captain from '../models/captain.model.js'

const API_KEY = process.env.GOOGLE_MAPS_API_KEY

export const getAddressCoordinates = async (address) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`

    try {
        const response = await axios.get(url)
        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location
            return {
                ltd: location.lat,
                lng: location.lng
            }
        } else {
            throw new Error('Unable to fetch Coordinates')
        }
    } catch (error) {
        throw error
    }
}

export const getAddressDistanceAndTime = async (origin, destination) => {
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${API_KEY}`;
    try {
        const response = await axios.get(url)
        if (response.data.status === 'OK') {
            if (response.data.rows[0].elements[0].status === 'ZERO_RESULTS') {
                throw new Error('No routes found')
            }
            return response.data.rows[0].elements[0]
        } else {
            throw new Error('Unable to fetch Distance and Time')
        }
    } catch (error) {
        throw error
    }
}

export const getAutoCompleteSuggestions = async (query) => {
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(query)}&key=${API_KEY}`
    try {
        const response = await axios.get(url)
        if (response.data.status === 'OK') {
            return response.data.predictions
        } else {
            throw new Error(response.data.error_message || 'Unable to fecth Suggestions')
        }

    } catch (error) {
        console.log(error)
        throw error
    }
}

export const getCaptainsInTheRadius = async (ltd, lng, radius) => {
    // radius in km
    const captains = await Captain.find({
        location: {
            $geoWithin: {
                $centerSphere: [[ltd, lng], radius / 6371]
            }
        }
    });

    return captains;
}