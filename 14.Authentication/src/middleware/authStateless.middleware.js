import { AppError } from "../utils/appError.js";
import { GetUser } from "../utils/authStateless.js";

export const checkAuth = async (req, res, next) => {
  const token = req.cookies?.uid;

  // the below two lines are for token in  respinse for client which are not a browser since the cookies are the feature of browser
  //   const userUid = req.headers["Authorization"];

  //   const token = userUid.split("Bearer ")[1];

  const user = GetUser(token);
  if (!user) {
    new AppError("Unauthorized", 401);
  }

  req.user = user;
  next();
};
