import { Router } from "express";
import {
  createNewBlog,
  showAddBlogPage,
  getBlogById,
} from "../contollers/blogs.controller.js";
import upload from "../middlewares/upload.middleware.js";

const router = Router();

router.get("/add-new", showAddBlogPage);

router.get("/:id", getBlogById)

router.post("/create", upload.single("coverImg"), createNewBlog);

export default router;
