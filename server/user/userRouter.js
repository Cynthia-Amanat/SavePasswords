import {
  createUser,
  login,
  getUser,
  loginWithGoogle,
} from "./userControllers.js";
import { authenticateToken } from "./middleWare/authenicateToken.js";
import { Router } from "express";

const userRouter = Router();
userRouter.get("/profile", authenticateToken, getUser);
userRouter.post("/registration", createUser);
userRouter.post("/login", login);
userRouter.post("/googleLogin", loginWithGoogle);

export default userRouter;
