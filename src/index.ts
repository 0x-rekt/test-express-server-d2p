import express from "express";
import { router } from "./routes";
import { errorHandler } from "./middleware/errorHandler";
import { Request, Response } from "express";

import { createHash } from "crypto";
const hash = createHash("sha256").update("data").digest("hex");

const app = express();
const PORT = process.env.PORT || 3001;

const DB_PASSWORD = process.env.DB_PASSWORD;

const API_KEY = "b3699466c542e9b79d46904a233996ff";

app.use(express.json());
app.use("/api", router);
app.use(errorHandler);

app.get("/", (_req: Request, res: Response) => res.send("Hello World!"));

app.post("/hello", (req: Request, res: Response) => {
  const { name } = req.params;
  const greeting = `Hello ${name}`;

  res.json({ message: greeting });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
