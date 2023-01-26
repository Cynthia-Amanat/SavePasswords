import { Router } from "express";
import { addPassword ,getPasswords,decrypt, UpdatePasswordsAndTitle ,deletePassword } from "./passwordControllers.js";

 

 const passwordRouter = Router();
 passwordRouter.post("/addPassword",addPassword)
 passwordRouter.get("/getPasswords/:id",getPasswords)
 passwordRouter.post("/decryptpassword",decrypt );
 passwordRouter.patch("/update/:id",UpdatePasswordsAndTitle );
 passwordRouter.delete("/delete/:id",deletePassword );
 export default passwordRouter;