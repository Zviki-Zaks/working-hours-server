import { Request, Response } from "express";
import * as userService from "./user.service";

// Controller functions for handling users
export const getUser = async (req: Request, res: Response) => {
  const { userId } = req.body;
  try {
    const user = await userService.getUser(userId);
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ error: "Failed to get user" });
  }
};

export const addUser = async (req: Request, res: Response) => {
  const { userId } = req.body;
  const { email, name } = req.body;
  try {
    const user = await userService.addUser(userId, { email, name });
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ error: "Failed to add user" });
  }
};
