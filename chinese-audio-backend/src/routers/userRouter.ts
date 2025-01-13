import { Router } from "express";
import { getUserList } from "../controllers/userController";

const userRouter = Router();

userRouter.get("/", getUserList);

export default userRouter;