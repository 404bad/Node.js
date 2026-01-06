import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import path from "path";
import userRoute from "./routes/user.routes.js";
import { checkForAuthenticationCookie } from "./middlewares/authentication.middleware.js";

const app = express();

const PORT = 8000;

app.set("view engine", "ejs");
app.set("views"), path.resolve("./views");

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("Token"));

app.get("/", (req, res) => {
  res.render("home", { user: req.user });
});

app.use("/user", userRoute);

mongoose.connect("mongodb://127.0.0.1:27017/blogger").then(() => {
  console.log("Mongodb connected");
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});
