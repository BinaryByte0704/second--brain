import express from "express";
import type { Request, Response } from "express";

import database from "./config/database.js";

import userRoutes from "./routes/user.js";
import contentRoutes from "./routes/content.js";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Second Brain Woohoo!!!");
});

// Use route modules with prefixes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/content", contentRoutes);

app.listen(port, () => {
  console.log(`Server is running at port number: ${port}`);
});

// Connect to the database
database();
export default app;
