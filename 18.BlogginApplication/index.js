import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import path from "path";
import userRoute from "./routes/user.routes.js";
import blogRoute from "./routes/blogs.routes.js";
import { checkForAuthenticationCookie } from "./middlewares/authentication.middleware.js";
import Blog from "./models/blog.model.js";

const app = express();

const PORT = 8000;

app.set("view engine", "ejs");
app.set("views"), path.resolve("./views");

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("Token"));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});
  res.render("home", { user: req.user, blogs: allBlogs });
});

app.use("/user", userRoute);
app.use("/blogs", blogRoute);

mongoose.connect("mongodb://127.0.0.1:27017/blogger").then(() => {
  console.log("Mongodb connected");
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});
