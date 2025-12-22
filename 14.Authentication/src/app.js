import express from "express";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/user.routes.js";
import urlRoutes from "./routes/url.routes.js";
import { globalErrorHandler } from "./middleware/errorHandler.js";
import { logAccess } from "./utils/logger.js";
// import restrictToLoggedinUserOnly from "./middleware/authStateful.middleware.js";

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((req, res, next) => {
  logAccess(req);
  next();
});

app.use("/user", userRoutes);
app.use("/url", urlRoutes);

// global error handler
app.use(globalErrorHandler);

export default app;
