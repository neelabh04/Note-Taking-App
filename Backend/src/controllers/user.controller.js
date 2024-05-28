import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config({
  path: '../../../.env'
})

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    const accessToken = await jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );
    const refreshToken = await jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
      }
    );

    user.refreshToken = refreshToken.toString();
    await user.save();

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while creating the refresh and access token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if ([email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  if (!email || !email.includes("@")) {
    throw new ApiError(400, "Email Field should have @ symbol");
  }

  const existedUser = await User.findOne({ where: { email: email } });
  if (existedUser) {
    throw new ApiError(400, "User already exists");
  }

  const user = await User.create({ email: email, hashed_password: password });

  const createdUser = await User.findByPk(user.id, {
    attributes: { exclude: ["id", "hashed_password", "refreshToken"] },
  });

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered Successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if ([email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  if (!email || !email.includes("@")) {
    throw new ApiError(400, "Email should have @ symbol");
  }

  if (!email) {
    throw new ApiError(400, "Email is required");
  }

  const checkUser = await User.findOne({ where: { email: email } });
  if (!checkUser) {
    throw new ApiError(404, "User does not exists.");
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    checkUser.hashed_password
  );
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials.");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    checkUser.id
  );

  const loggedInUser = await User.findByPk(checkUser.id, {
    attributes: { exclude: ["id", "hashed_password", "refreshToken"] },
  });

  const options = {
    httpOnly: true, //accessible only by web server 
    secure: false, //https
    sameSite: 'None', //cross-site cookie 
    maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged In Successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.user.id);
  if (!user) {
    throw new ApiError(400, "User does not exist");
  }

  user.refreshToken = "";
  await user.save();

  const options = {
    httpOnly: true, //accessible only by web server 
    secure: false, //https
    sameSite: 'None', //cross-site cookie 
    maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findByPk(decodedToken?.id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const options = {
      httpOnly: true, //accessible only by web server 
      secure: false, //https
      sameSite: 'None', //cross-site cookie 
      maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry
    };

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefreshToken(user.id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

export { registerUser, loginUser, logoutUser, refreshAccessToken };
