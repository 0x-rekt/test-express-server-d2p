import express from "express";
import { router } from "./routes";
import { errorHandler } from "./middleware/errorHandler";
import { Request, Response } from "express";

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
