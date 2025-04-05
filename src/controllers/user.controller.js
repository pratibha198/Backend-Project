import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser = asyncHandler( async(req,res) => {
    // get user deatils from frontend
    // validation - not empty honi chahiye fields
    // check if user already exists: username,email
    // chack for images, check for avatar
    // upload images to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from reponse
    // check for user creation
    // return res
    // step 1:
    const {fullname, email,username, password } = req.body
    console.log("email: ",email);
    // step 1.5:
    // files (avatar, images) store using middleware multer

    // step 2: validation
    // if(fullname === ""){
    //     throw new ApiError(400,"full name is required");
    // }
    // esa sabke liye bana lo yaaaa
    if(
        [fullname,email,username,password].some((field)=> 
        field?.trim()==="")
    ){
        throw new ApiError(400,"All fields are required!!")
    }
//  step 3
    const existedUser = User.findOne({
        $or : [{ username },{ email }]
    })

    if(existedUser){
        throw new ApiError(409,"user with email or username already existing!")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;
    if(!avatarLocalPath) throw new ApiError(400,"Avatar file is required");

    // step 4: 
    const avatar =  await uploadOnCloudinary(avatarLocalPath)
    const coverImage =  await uploadOnCloudinary(coverImageLocalPath)
    if(!avatar){
        throw new ApiError(400,"Avatar file is required");
    }
    // step 5
    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase()
    })
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user");
    }
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )

})  

export {registerUser}