import express from 'express';
import dotenv from 'dotenv'
import userRouter from './user/userRouter.js';
import cors from 'cors'
import  passwordRouter from './passwords/passwordRouters.js'

dotenv.config()
const app = express();
app.use(express.json());
app.use(cors());

app.use("/users",cors(), userRouter);
app.use("/passwords",cors(), passwordRouter);
app.listen(process.env.PORT,()=>console.log(`server is running ${process.env.PORT}`))