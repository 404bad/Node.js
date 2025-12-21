import { logError } from "../utils/logger.js";
export const globalErrorHandler = (err, req, res, next) => {
  console.error(err.stack);
  logError(err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    status: err.status || "error",
    message,
  });
};
