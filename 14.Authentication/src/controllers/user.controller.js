import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

import USER from "../models/user.model.js";
import { AppError } from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsync.js";
import { SetUser, GetUser } from "../utils/authStateful.js";

//handle signup or create new user
export const handleSignup = catchAsync(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new AppError("All fields are required", 400);
  }

  const existingUser = await USER.findOne({ email });
  if (existingUser) {
    throw new AppError("Email already exists", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await USER.create({ name, email, password: hashedPassword });

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

  const sessionId = uuidv4();
  SetUser(sessionId, user._id);
  res.cookie("uid", sessionId, { httpOnly: true, secure: false }); // set secure:true in production
  res.status(200).json({
    success: true,
    sessionId,
    message: "Login successful",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});
