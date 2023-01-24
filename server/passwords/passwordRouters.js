import { Router } from "express";
import { addPassword ,getPasswords } from "./passwordControllers.js";

 

 const passwordRouter = Router();
 passwordRouter.post("/addPassword",addPassword)
 passwordRouter.get("/getPasswords/:id",getPasswords)

 export default passwordRouter;