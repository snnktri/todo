import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please provide a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    refreshToken: {
        type: String,
    },
    profile: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next(); // Corrected method name

    this.password = await bcrypt.hash(this.password, 10);
    next();
});


userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            id: this._id,
            email: this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1D' }
    )
};

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {
            id: this._id,
            email: this.email,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7D' }
    )
};

export const User = mongoose.model("User", userSchema);