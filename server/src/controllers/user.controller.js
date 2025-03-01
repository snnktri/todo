import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const signUp = asyncHandler( async(req, res) => {
    const { firstName, lasntName, email, password } = req.body;

    if([firstName, lasntName, email, password].some(field => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const profile = req.file;

    const existingUser = await User.findOne({ email });
    if(existingUser) {
        throw new ApiError(400, "Email already exists");
    }
})