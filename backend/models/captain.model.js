import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const captainSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            trim: true,
            minlength: [4, "First name must be at least 4 characters long"],
            maxlength: [20, "First name must be at most 20 characters long"]
        },
        lastName: {
            type: String,
            trim: true,
            minlength: [4, "Last name must be at least 4 characters long"],
            maxlength: [20, "Last name must be at most 20 characters long"]
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketId: {
        type: String,
        default: null
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            trim: true,
            minlength: [3, "Color must be at least 3 characters long"],
        },
        model: {
            type: String,
            required: true,
            trim: true,
            minlength: [3, "Model must be at least 3 characters long"],
        },
        plate: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            match: [/^[A-Z]{2}[0-9]{1,2}[A-Z]{1,2}[0-9]{4}$/, "Please enter a valid vehicle plate number"]
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, "Capacity must be at least 1"],
        },
        type: {
            type: String,
            required: true,
            enum: ['car', 'bike', 'auto'],
            default: 'car'
        }
    },
    location: {
        ltd: {
            type: Number,
            min: -90,
            max: 90
        },
        lng: {
            type: Number,
            min: -180,
            max: 180
        }
    },
});

captainSchema.methods.generateAuthToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: '24h'
    });
};

captainSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

captainSchema.statics.hashPassword = async function (password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

const Captain = mongoose.model("captain", captainSchema);
export default Captain;