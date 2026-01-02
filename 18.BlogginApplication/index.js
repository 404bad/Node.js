import express from "express";
import mongoose from "mongoose";
import path from "path";
import userRoute from "./routes/user.routes.js";

const app = express();

const PORT = 8000;

app.set("view engine", "ejs");
app.set("views"), path.resolve("./views");

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("home");
});

app.use("/user", userRoute);

mongoose.connect("mongodb://127.0.0.1:27017/blogger").then(() => {
  console.log("Mongodb connected");
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});
