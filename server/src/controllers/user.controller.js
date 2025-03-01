import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const generateAccessRefreshToken = async (userId) => {
   try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;

    await user.save(
        {
            validateBeforeSave: false
        }
    );

    return { accessToken, refreshToken };
   } catch (error) {
    throw new ApiError(500, "Failed to generate access and refresh tokens");
   }

}

const signUp = asyncHandler( async(req, res) => {
    const { firstName, lastName, email, password } = req.body;

    if([firstName, lasntName, email, password].some(field => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const profile = req.file;

    const profileUrl = await uploadOnCloudinary(profile.path);

    const existingUser = await User.findOne({ email });
    if(existingUser) {
        throw new ApiError(400, "Email already exists");
    }

    const userCreate = await User.create({
        firstName,
        lastName,
        email,
        password,
        profile:profileUrl?.url
    });

    const userCreated = await User.findById(userCreate._id);


    if(!userCreated) {
        throw new ApiError(500, "Failed to create user");
    }

    return res.status(201).
    json(
        new ApiResponse(200, userCreated, "User Created successfully")
    );
});


const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if([email, password].some(field => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const user = await User.findOne({ email });

    if(!user) {
        throw new ApiError(401, "user does not exist");
    }

    const isPasswordMatch = await user.isPasswordCorrect(password);

    if(!isPasswordMatch) {
        throw new ApiError(401, "Invalid password");
    }

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const { accessToken, refreshToken } = await generateAccessRefreshToken(user._id);

    const options = {
        httpOnly: true,
        //secure: true
    };

    return res.status(200).
    cookie("accessToken", accessToken, options).
    cookie("refreshToken", refreshToken, options).
    json(
        new ApiResponse(200, {user:loggedInUser, accessToken, refreshToken}, "User logged in successfully")
    )
});

const logout = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1,//remove refresh token from the field
            }
        },
        {
            new: true
        }
    );

    const options = {
        httpOnly: true,
        //secure: true
    };

    return res.status(200).
    clearCookie("accessToken", options).
    clearCookie("refreshToken", options).
    json(
        new ApiResponse(200, {}, "User logged out successfully")
    )
})

const protectedUser = asyncHandler(async (req, res) => {
   const user = req.user._id;

   const loggedInUser = await User.findById(user).select("-password -refreshToken");

   return res.status(200).
   json(
       new ApiResponse(200, loggedInUser, "User protected route accessed successfully")
   )
})

export {
    signUp,
    login,
    logout,
    protectedUser
}