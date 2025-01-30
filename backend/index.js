import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import cookieParser from "cookie-parser";
dotenv.config();

mongoose
  .connect(process.env.MONGO__URI)
  .then(() => console.log("Connected To Db"))
  .catch((err) => console.log(err));

const app = express();
app.use(express.json());
app.use(cookieParser())

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter)

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(3000, () => console.log("Server Is Running Successfully!!!"));
