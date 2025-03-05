import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import dotenv from "dotenv";

dotenv.config();

export const verifyJWT = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.headers['authorization']?.replace("Bearer ", "");

       //console.log("token: " + token);
      // console.log(req.headers);

        if (!token) {
           throw new ApiError(401, "unauthoriez");
        }

      //  console.log("token after removing Bearer: ");


        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

       // console.log("decoded: " + JSON.stringify(decoded));

        if(!decoded) {
            throw new ApiError(401, "Unauthorized access token");
        }

        const user = await User.findById(decoded?.id).select("-password -refreshToken");

      //  console.log("user", user);

        if (!user) {
            throw new ApiError(404, "User not found");
        }

       // console.log("user", user);

        req.user = user;
        next();
        
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }
}