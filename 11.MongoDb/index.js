import express from "express";
import mongoose from "mongoose";

const app = express();
const PORT = 5000;

//connection
mongoose
  .connect("mongodb://127.0.0.1:27017/nodelearn")
  .then(() => {
    console.log("DB connection sucessfully");
  })
  .catch((err) => {
    console.log("DB error", err);
  });

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  jobtitle: {
    type: String,
    required: false,
  },
  gender: {
    type: String,
    required: false,
  },
});

const User = mongoose.model("User", userSchema);

app.listen(PORT, () => {
  console.log(`Server is runnig at port ${PORT}`);
});
