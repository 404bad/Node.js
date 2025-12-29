import { AppError } from "../utils/appError.js";
import { GetUser } from "../utils/authStateless.js";
import { catchAsync } from "../utils/catchAsync.js";

export const checkForAuthentication = catchAsync(async (req, res, next) => {
  let token = req.cookies?.uid;

  // Support non-browser clients (Postman, mobile apps)
  if (!token && req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  req.user = null;

  // Allow public access if no token
  if (!token) return next();

  const user = GetUser(token);

  if (!user) {
    return next(new AppError("Unauthorized", 401));
  }

  req.user = user;
  next();
});

export const restrictTo = (...roles) => {
  //Collect all arguments passed into this function and put them into an array called roles
  return (req, res, next) => {
    if (!req.user) {
      return next(new AppError("Unauthorized", 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(new AppError("Forbidden", 403));
    }

    next();
  };
};
