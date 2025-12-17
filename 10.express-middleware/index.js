import express from "express";
import fs from "fs";

const app = express();
const PORT = 5000;

//built in express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Application  level middleware
app.use((req, res, next) => {
  //   console.log(`${req.method} ${req.url}`);
  const dataToWrite = `${Date.now()} ${req.ip} ${req.method} ${req.url}\n`;
  fs.appendFile("log.txt", dataToWrite, (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  next();
});

//Route level Middleware

const checkAuth = (req, res, next) => {
  const isLoggedIn = true;
  if (!isLoggedIn) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

app.get("/", (req, res) => {
  return res.status(200).json({ message: "hey there" });
});

app.get("/api/users", checkAuth, (req, res) => {
  req.json({ message: "Welcome User" });
});

app.post("/api/users", (req, res) => {
  return res.json({
    message: "User Created",
    data: req.body,
  });
});

//error demo route
app.get("/api/error", (req, res) => {
  throw new Error("Something went wrong");
});

//error level middleware
app.use((err, req, res, next) => {
  res.status(500).json({
    sucess: true,
    message: err.message || "Internal Server Error",
  });
});

//listen to server
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
