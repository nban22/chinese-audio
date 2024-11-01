import { Router } from "express";

import * as userController from "../controllers/userController.js";

const userRouter = Router();

userRouter
    .route("/")
    .post(userController.createNewUser)
    .get(userController.getAllUsers);

userRouter
    .route("/:id")
    .get(userController.getUser)
    .delete(userController.deleteUser);

export default userRouter;
