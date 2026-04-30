import express from "express";
import { router } from "./routes";
import { errorHandler } from "./middleware/errorHandler";
import { Request, Response } from "express";

// Required at runtime — must be provisioned on the server before deploying.
if (!process.env.APP_SECRET) {
  throw new Error(
    "[FATAL] APP_SECRET environment variable is not set. " +
      "Set it in /etc/environment or the pm2 ecosystem config before starting."
  );
}

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use("/api", router);
app.use(errorHandler);

app.get("/", (_req: Request, res: Response) => res.send("Hello World!"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
