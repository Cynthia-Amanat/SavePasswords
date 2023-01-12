import { Router } from "express";
import { addPassword } from "./passwordControllers.js";

 

 const passwordRouter = Router();
 passwordRouter.post("/addPassword",addPassword)


 export default passwordRouter;