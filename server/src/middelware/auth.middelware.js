import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";

export const verifyJWT = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.headers['authorization']?.replace("Bearer ", "");

        if (!token) {
           throw new ApiError(401, "unauthoriez");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded) {
            throw new ApiError(401, "Unauthorized access token");
        }

        const user = await User.findById(decoded?._id).select("-password -refreshToken");

        if (!user) {
            throw new ApiError(404, "User not found");
        }

        return req.user
        
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }
}