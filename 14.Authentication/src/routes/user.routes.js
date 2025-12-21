import express from "express";
import {
  handleSignup,
  handleGetAllUsers,
  handleLogin,
} from "../controllers/user.controller.js";

const router = express.Router();

router
  .route("/")
  .get(handleGetAllUsers) // GET /users → list all users
  .post(handleSignup);
router.post("/login", handleLogin);

export default router;
