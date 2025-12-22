import { AppError } from "../utils/appError.js";
import { GetUser } from "../utils/authStateful.js";

export const restrictToLoggedinUserOnly = (req, res, next) => {
  // Check if cookie exists
  const sessionId = req.cookies.uid;
  if (!sessionId) {
    return next(
      new AppError("You must be logged in to access this route", 401)
    );
  }

  // Check if session is valid
  const userId = GetUser(sessionId);
  if (!userId) {
    return next(
      new AppError("Invalid or expired session. Please log in again.", 401)
    );
  }

  // Attach userId to request for controllers
  req.userId = userId;

  //Proceed to next middleware/controller
  next();
};

export const checkAuth = async (req, res, next) => {
  const sessionId = req.cookies.uid;

  const userId = GetUser(sessionId);

  req.userId = userId;

  next();
};
