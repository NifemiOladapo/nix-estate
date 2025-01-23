import { User } from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedpassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashedpassword,
  });
  try {
    await newUser.save();
    res.status(201).json("User created successfully!");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler("User Not Found", 401));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler("Wrong Credentials", 401));
    const { password: pass, ...rest } = validUser._doc;
    const token = jwt.sign({ id: validUser._id }, process.env.JWT__SECRET);
    res
      .cookie("access__token", token, { httpOnly: true })
      .status(200)
      .json(rest);
    console.log("hi");
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  const { email, username, profilePicture } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT__SECRET);
      res
        .cookie("access__token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          username.split(" ").join("").toLowercase() +
          Math.random().toString(36).slice(-4),
        email,
        password: hashedPassword,
        profilePicture,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT__SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie("access__token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
