 import { createUser,login,authenticateToken,getUser } from "./userControllers.js";
 import { Router } from "express";
 

 const userRouter = Router();
userRouter.get("/profile",authenticateToken ,getUser )
 userRouter.post("/registration",createUser)
 userRouter.post("/login",login)

 export default userRouter;