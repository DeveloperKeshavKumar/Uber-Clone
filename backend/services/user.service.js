import User from "../models/User.model.js";
import { AppError } from "../utils/error.js";

export const createUser = async ({ fullName, email, password }) => {
    const { firstName, lastName } = fullName;
    if (!firstName || !email || !password) {
        throw new AppError("All required fields must be provided", 400);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new AppError("Email already exists", 400);
    }

    const hashedPassword = await User.hashPassword(password);
    const user = await User.create({
        fullName: { firstName, lastName },
        email,
        password: hashedPassword,
    });

    const token = user.generateAuthToken();

    const userObj = user.toObject();
    userObj.id = user._id;
    delete userObj._id;
    delete userObj.password;
    delete userObj.__v;
    delete userObj.socketId;
    return { token, user: userObj };
}