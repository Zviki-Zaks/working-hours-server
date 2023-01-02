import { Router } from "express";
import { addUser, getUser } from "./user.controller";

const userRouter = Router();

// Define routes for the /api/user route
userRouter.get("/", getUser);
userRouter.post("/", addUser);

export default userRouter;
