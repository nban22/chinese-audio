import { Router } from "express";
import * as authController from "../controllers/authController";
import { authorizeJWT } from "../middlewares/auth";


const authRouter = Router();

authRouter.post("/login", authController.login);
authRouter.post("/logout", authController.logout);
authRouter.post("/signup", authController.signup);

authRouter.get("/me", authorizeJWT(), authController.getMe);

export default authRouter;