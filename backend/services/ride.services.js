import crypto from 'crypto'
import Ride from '../models/ride.model.js'
import { getAddressDistanceAndTime } from './map.service.js';

export const getFareService = async (origin, destination) => {
    const distanceTime = await getAddressDistanceAndTime(origin, destination);

    const baseFare = {
        auto: 30,
        car: 50,
        moto: 20
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        moto: 8
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        moto: 1.5
    };

    const fare = {
        auto: Math.round(baseFare.auto + ((distanceTime.distance.value / 1000) * perKmRate.auto) + ((distanceTime.duration.value / 60) * perMinuteRate.auto)),
        car: Math.round(baseFare.car + ((distanceTime.distance.value / 1000) * perKmRate.car) + ((distanceTime.duration.value / 60) * perMinuteRate.car)),
        moto: Math.round(baseFare.moto + ((distanceTime.distance.value / 1000) * perKmRate.moto) + ((distanceTime.duration.value / 60) * perMinuteRate.moto))
    };

    return fare;
}

export const getOtpService = (num) => {
    const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString()
    return otp;
}

export const createRideService = async ({ user, pickup, destination, vehicleType }) => {
    const fare = await getFare(pickup, destination);

    const ride = Ride.create({
        user,
        pickup,
        destination,
        otp: getOtp(6),
        fare: fare[vehicleType]
    })

    return ride;
}

export const confirmRideService = async ({rideId, captain}) => {
    await Ride.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'accepted',
        captain: captain._id
    })

    const ride = await Ride.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    return ride;
}

export const startRideService = async ({ rideId, otp, captain }) => {
    const ride = await Ride.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'accepted') {
        throw new Error('Ride not accepted');
    }

    if (ride.otp !== otp) {
        throw new Error('Invalid OTP');
    }

    await Ride.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'ongoing'
    })

    return ride;
}

export const endRideService = async ({ rideId, captain }) => {
    const ride = await Ride.findOne({
        _id: rideId,
        captain: captain._id
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'ongoing') {
        throw new Error('Ride not ongoing');
    }

    await Ride.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'completed'
    })

    return ride;
}