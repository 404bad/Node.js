import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/connect.mongo.js";
import urlShortRoutes from "./routes/urlShortner.routes.js";

dotenv.config();

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is Running" });
});

app.use("/", urlShortRoutes);

connectDb().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is runnig at ${process.env.PORT}`);
  });
});
