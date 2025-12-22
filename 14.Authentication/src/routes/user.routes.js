import express from "express";
import {
  handleSignup,
  handleGetAllUsers,
  handleLogin,
  handleGetUserById,
} from "../controllers/user.controller.js";
import { checkAuth } from "../middleware/authStateful.middleware.js";

const router = express.Router();

router
  .route("/")
  .get(handleGetAllUsers) // GET /users → list all users
  .post(handleSignup);
router.post("/login", handleLogin);
router.get("/:id", checkAuth, handleGetUserById);

export default router;
