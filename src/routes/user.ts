import express from "express";
import type { Request, Response } from "express";
import User from "../models/user.js";
import type { IUser } from "../interfaces/IUser.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

interface userSignin {
  username: string;
  password: string;
}

// Signup route
router.post("/signup", async (req: Request, res: Response) => {
  const userData: IUser = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    userId: 0, // You might want to generate userId properly
  } as IUser;

  const user = new User(userData);

  await user
    .save()
    .then(() => res.status(201).send("User Created"))
    .catch((err) => res.status(400).send(err.message));
});

// Signin route
router.post("/signin", async (req: Request, res: Response) => {
  const givenData: userSignin = {
    username: req.body.username,
    password: req.body.password,
  } as userSignin;

  try {
    const userExists = await User.findOne({ username: givenData.username });
    if (!userExists) {
      return res.status(401).send("Invalid username or password");
    }

    const isMatch = await bcrypt.compare(
      givenData.password,
      userExists.password
    );
    if (!isMatch) {
      return res.status(401).send("Invalid username or password");
    }

    const token = jwt.sign(
      { userId: userExists.userId, username: userExists.username },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ message: "Signin successful", token });
  } catch (err) {
    return res.status(500).send("Server error");
  }
});

export default router;
