import express from "express";
import {
  handleGetAllUsers,
  handleGetUserById,
  updateUserById,
  handleDeleteById,
  handleCreateUser,
} from "../controller/user.controller.js";

const router = express.Router();

router.route("/").get(handleGetAllUsers).post(handleCreateUser);

router
  .route("/:id")
  .get(handleGetUserById)
  .patch(updateUserById)
  .delete(handleDeleteById);

export default router;
