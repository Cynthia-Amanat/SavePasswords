import pool from '../database.js'
import {promisify} from "util"
import passwordRouter from './passwordRouters.js';

const exceQuery = promisify(pool.query).bind(pool);

export const addPassword = async(req ,res)=>{
    const data ={
    title:req.body.title,
    password:req.body.password,
    idRegistration:req.body.idRegistration
    }

    const query = `INSERT INTO passwords SET ?`
    try{
        const addPassword = await exceQuery(query, data)
        if(addPassword){
         return res.status(200).json({success:true, data:data})
        }

    }catch(error){
    return res.status(400).json({success:false , message:error.message})
    }
}
