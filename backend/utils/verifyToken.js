import { errorHandler } from "./error.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(errorHandler("Unauthorized", 401));
  }

  try {
    const decodedUser = jwt.verify(token, process.env.JWT__SECRET);
    req.user = decodedUser;
    console.log(decodedUser);

    next();
  } catch (error) {
    return next(error);
  }
};
