import express from "express";
import type { Request, Response } from "express";
import Content from "../models/content.js";
import type { Icontent } from "../interfaces/IContent.js";
import authenticateToken from "../middleware/authenticateToken.js";

const router = express.Router();

router.post("/", authenticateToken, async (req: Request, res: Response) => {
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

router.get("/", authenticateToken, (req: Request, res: Response) => {
  // Implement list content logic here
  res.send("List content endpoint");
});

router.delete(
  "/deleteDocument",
  authenticateToken,
  (req: Request, res: Response) => {
    // Implement delete document logic here
    res.send("Delete document endpoint");
  }
);

router.get(
  "/shareContent",
  authenticateToken,
  (req: Request, res: Response) => {
    // Implement share content logic here
    res.send("Share content endpoint");
  }
);

router.get("/userContent/:userId", (req: Request, res: Response) => {
  // Implement user content retrieval logic here
  res.send(`User content for userId: ${req.params.userId}`);
});

export default router;
