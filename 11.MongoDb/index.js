import express, { json } from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
import userApiRoutes from "./routes/userApi.routes.js";
import connectDb from "./config/connection.db.js";
import logReqRes from "./middlewares/log.middleware.js";

const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logReqRes(process.env.LOG_FILE));

//routes
app.use("/api/users", userApiRoutes);
app.use("/users", userRoutes);

//connection
connectDb().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running at port ${process.env.PORT}`);
  });
});
