import { AppError } from "../utils/appError.js";
import { GetUser } from "../utils/authStateless.js";

export const checkAuth = async (req, res, next) => {
  const token = req.cookies?.uid;

  const user = GetUser(token);
  if (!user) {
    new AppError("Unauthorized", 401);
  }

  req.user = user;
  next();
};
