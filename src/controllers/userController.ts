import { Request, Response } from "express";
import { UserService } from "../services/userService";

const userService = new UserService();

export const getUsers = async (_req: Request, res: Response) => {
  const users = await userService.findAll();
  res.json(users);
};

export const getUserById = async (req: Request, res: Response) => {
const id = req.params.id as string;
  const user = await userService.findById(id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "name and email are required" });
  }
  const user = await userService.create({ name, email });
  res.status(201).json(user);
};
