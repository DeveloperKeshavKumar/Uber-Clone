import Captain from "../models/captain.model.js";
import { AppError } from "../utils/error.js";

export const createCaptain = async ({ fullName, email, password, vehicle }) => {
    const { firstName, lastName } = fullName;

    if (!firstName || !email || !password) {
        throw new AppError("All required fields must be provided", 400);
    }

    if (!vehicle || !vehicle.color || !vehicle.model || !vehicle.plate || !vehicle.capacity || !vehicle.type) {
        throw new AppError("Vehicle details must be provided", 400);
    }

    const existingCaptain = await Captain.findOne({ email });
    if (existingCaptain) {
        throw new AppError("Email already exists", 400);
    }

    const hashedPassword = await Captain.hashPassword(password);
    const captain = await Captain.create({
        fullName: { firstName, lastName },
        email,
        password: hashedPassword,
        vehicle: {
            color: vehicle.color,
            model: vehicle.model,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            type: vehicle.type
        }
    });

    const token = captain.generateAuthToken();

    const captainObj = captain.toObject();
    captainObj.id = captain._id;
    delete captainObj._id;
    delete captainObj.password;
    delete captainObj.__v;
    delete captainObj.socketId;
    return { token, Captain: captainObj };
}