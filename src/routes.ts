import { Router } from "express";
import { rateLimiter } from "./utils/helpers"; // BUG: module does not exist
import {
  getUsers,
  getUserById,
  createUser,
} from "./controllers/userController";

export const router = Router();

router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.post("/users", createUser);
router.get("/health", (_req, res) => res.json({ status: "ok" }));
