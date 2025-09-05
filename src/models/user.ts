import mongoose, { Document, Model } from "mongoose";
import type { IUser } from "../interfaces/IUser.js";

const userSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    unique: true,
    required: true,
    minlength: 3,
    maxlength: 10,
    match: /^[A-Za-z]{3,10}$/,
  },
  email: { type: String, unique: true, required: true },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 20,
    match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,20}$/,
  },
  userId: { type: Number, required: true },
});

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
