import { Router } from "express";
import { addPassword ,getPasswords,decrypt } from "./passwordControllers.js";

 

 const passwordRouter = Router();
 passwordRouter.post("/addPassword",addPassword)
 passwordRouter.get("/getPasswords/:id",getPasswords)
 passwordRouter.post("/decryptpassword",decrypt );

 export default passwordRouter;