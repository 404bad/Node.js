import express from "express";
import {
  handleSignup,
  handleGetAllUsers,
  handleLogin,
  handleGetUserById,
  handleLogout,
} from "../controllers/user.controller.js";
import {
  checkForAuthentication,
  restrictTo,
} from "../middleware/authStateless.middleware.js";

const router = express.Router();

// Public
router.post("/", handleSignup);
router.post("/login", handleLogin);

// Protected
router.get("/", checkForAuthentication, restrictTo("admin"), handleGetAllUsers);
router.get("/:id", checkForAuthentication, handleGetUserById);
router.post("/logout", checkForAuthentication, handleLogout);
export default router;

// “Seeing the cookie in headers is good.
// Being able to read it in JavaScript is bad.”
