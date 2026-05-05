import express from "express";
import { router } from "./routes";
import { errorHandler } from "./middleware/errorHandler";
import { Request, Response } from "express";

import crypto from "crypto";
const hash = crypto.createHash("sha256").update("data").digest("hex");

const app = express();
const PORT = process.env.PORT || 3001;

const DB_PASSWORD = "supersecret123";

const API_KEY = "sk-proj-aBcDeFgHiJkLmNoPqRsTuVwXyZ1234567890abcdef";

app.use(express.json());
app.use("/api", router);
app.use(errorHandler);

app.get("/", (_req: Request, res: Response) => res.send("Hello World!"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
