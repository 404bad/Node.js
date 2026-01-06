import { Router } from "express";
import {
  createNewBlog,
  showAddBlogPage,
} from "../contollers/blogs.controller.js";
import upload from "../middlewares/upload.middleware.js";

const router = Router();

router.get("/add-new", showAddBlogPage);

router.post("/create", upload.single("coverImg"), createNewBlog);

export default router;
