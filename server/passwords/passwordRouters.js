import { Router } from "express";
import { addPassword ,getPasswords,decrypt, UpdatePasswordsAndTitle ,deletePassword ,} from "./passwordControllers.js";
import { authenticateToken } from "../user/middleWare/authenicateToken.js";
 

 const passwordRouter = Router();
 passwordRouter.post("/addPassword",authenticateToken, addPassword)
 passwordRouter.get("/getPasswords/:id",getPasswords)
 passwordRouter.post("/decryptpassword",decrypt );
 passwordRouter.patch("/update/:id",UpdatePasswordsAndTitle );
 passwordRouter.delete("/delete/:id",deletePassword );
 export default passwordRouter;