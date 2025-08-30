// creating a user controller

import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.models.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async(req,res) =>{
     // 1. get user details from client (frontend/postman)
     let {fullname,username,email,password} = req.body;
     // 2. field validation
     if(
          [fullname,username,email,password].some((fields)=> fields?.trim() === "")
     ){
          throw new ApiError(400,"All fields are required")
     }
     // 3. check if user already exists
     const existedUser = await User.findOne({
          $or : [{email},{username}] 
     });
     if(existedUser){
          throw new ApiError(409,"User already exists, kindly login")
     }
     // 4. check for images and avatar
     const avatarLocalPath = req.files?.avatar[0]?.path;
     
     const coverImageLocalPath = req.files?.coverImage[0]?.path;

     if(!avatarLocalPath){
          throw new ApiError(400,"Avatar file is required")
     }
     // 5. if images available upload them to cloudinary, (special for avatar)
     const avatar = await uploadOnCloudinary(avatarLocalPath);
     const coverImage = await uploadOnCloudinary(coverImageLocalPath);
     if(!avatar){
          throw new ApiError(400,"Avatar file is required")
     }
     // 6. create user object -> create entry in db
     const user = await User.create({
          fullname,
          avatar:avatar.url,
          coverImage:coverImage?.url || "",
          email,
          password,
          username: username.toLowerCase()
     })
     // 7. remove password and refresh token field from response
     // 8. check for user creation
     // # both 7 and 8 completed
     const createdUser = await User.findById(user._id).select("-password -refreshToken");

     if(!createdUser){
          throw new ApiError(500,"Something went wrong while registering the user")
     }

     // 9. return res
     return res.status(201).json(
          new ApiResponse(200,createdUser,"User Registered Successfully..")
     )
     
})

export {registerUser}