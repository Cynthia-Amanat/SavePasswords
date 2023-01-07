 import { createUser,login ,getUser } from "./userControllers.js";
 import { authenticateToken } from "./middleWare/authenicateToken.js";
 import { Router } from "express";
 

 const userRouter = Router();
userRouter.get("/profile/:id",authenticateToken ,getUser )
 userRouter.post("/registration",createUser)
 userRouter.post("/login",login)

 export default userRouter;