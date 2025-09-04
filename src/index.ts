import express from "express";
import type { Request, Response } from "express";
import database from "./database.js";
import User from "./models/user.js";
import type { IUser } from "./models/user.js";
import bcrypt from "bcrypt";
import Content from "./models/content.js";
import type { Icontent } from "./models/content.js";
import { body, validationResult } from "express-validator";

const app = express();
const port = 3000;
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Second Brain Woohoo!!!");
});

let userID: number = 0;

app.post("/api/v1/signup", async (req: Request, res: Response) => {
  const userData: IUser = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    userId: userID + 1,
  } as IUser;

  const user = new User(userData);

  await user
    .save()
    .then(() => res.status(201).send("User Created"))
    .catch((err) => res.status(400).send(err.message));
});

interface userSignin {
  username: string;
  password: string;
}

app.post("/api/v1/signin", async (req: Request, res: Response) => {
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

    return res.status(200).send("Signin successful");
  } catch (err) {
    return res.status(500).send("Server error");
  }
});

app.post("/api/v1/newContent", async (req: Request, res: Response) => {
  const contentData: Icontent = {
    id: req.body.id,
    type: req.body.type,
    link: req.body.link,
    title: req.body.title,
    tags: req.body.tags,
  } as Icontent;

  const content = new Content(contentData);

  await content
    .save()
    .then(() => res.status(201).send("Content posted"))
    .catch((err) => res.status(400).send(err.message));
});

app.get("/api/v1/fetchDocument", (req: Request, res: Response) => {});

app.delete("/api/v1/deleteDocument", (req: Request, res: Response) => {});

app.get("/api/v1/shareContent", (req: Request, res: Response) => {});

app.get("/api/v1/userContent/:userId", (req: Request, res: Response) => {});

app.listen(port, () => {
  console.log(`Server is running at port number: ${port}`);
});
