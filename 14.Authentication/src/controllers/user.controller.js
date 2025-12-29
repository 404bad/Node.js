import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

import USER from "../models/user.model.js";
import urlModel from "../models/url.model.js";
import { AppError } from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsync.js";
// import { SetUser, GetUser } from "../utils/authStateful.js";
import { SetUser } from "../utils/authStateless.js";

//handle signup or create new user
export const handleSignup = catchAsync(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    throw new AppError("All fields are required", 400);
  }

  const existingUser = await USER.findOne({ email });
  if (existingUser) {
    throw new AppError("Email already exists", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await USER.create({ name, email, password: hashedPassword, role: role });

  res.status(201).json({ success: true, message: "User created" });
});

//handle get all users: for admin only
export const handleGetAllUsers = catchAsync(async (req, res) => {
  const allUsers = await USER.find({});
  if (allUsers.length === 0) {
    return res.status(200).json({ allUsers });
  }
  return res.status(200).json({ allUsers });
});

//handle user login
export const handleLogin = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await USER.findOne({ email });
  if (!email || !password) {
    throw new AppError("Email and password are required", 400);
  }

  //compare password
  const validpassword = await bcrypt.compare(password, user.password); // this is true
  if (!validpassword) {
    throw new AppError("Invalid email or password", 401);
  }

  //   const sessionId = uuidv4();
  //   SetUser(sessionId, user._id);
  const token = SetUser(user);
  res.cookie("uid", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24,
  });
  //   res.send({ token });
  res.status(200).json({
    success: true,
    // token,
    message: "Login successful",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

//Handle get users urls
export const handleGetUserById = catchAsync(async (req, res) => {
  const userId = req.params.id;
  const user = await USER.findById(userId);
  const allurls = await urlModel.find({ createdBy: userId });

  return res.status(200).json({ user, allurls });
});

//Handle Logout
export const handleLogout = catchAsync((req, res) => {
  res.clearCookie("uid", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});
