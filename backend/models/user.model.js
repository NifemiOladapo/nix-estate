import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    profilePicture: { type: String, default: "" },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
