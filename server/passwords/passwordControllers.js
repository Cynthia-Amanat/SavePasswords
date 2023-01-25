import pool from '../database.js'
import {promisify} from "util"
import passwordRouter from './passwordRouters.js';
import { encryption, decryption } from './encryptionHandlers.js';

const exceQuery = promisify(pool.query).bind(pool);

export const addPassword = async(req ,res)=>{
    const {
    title,
    password,
    idRegistration,
    } = req.body
    const encryptedPassword = encryption(password)

    const query = `INSERT INTO passwords (title, password , idRegistration, iv) Values(?,?,?,?)`
    try{
        const addPassword = await exceQuery(query,[title, encryptedPassword.password, idRegistration, encryptedPassword.iv])
        // console.log(addPassword)

        if(addPassword){
         return res.status(200).json({success:true})
        }

    }catch(error){
    return res.status(400).json({success:false , message:error.message})
    }
}

export const getPasswords = async (req, res)=>{
    const idRegistration = req.params.id
    console.log(idRegistration)

    const query = `SELECT * FROM passwords Where idRegistration = "${idRegistration}"`
    try{
        const getPasswords = await exceQuery(query)
        if(getPasswords){
            return res.status(200).json({success:true, result:getPasswords})
           }
    }catch(error){
        return res.status(400).json({success:false , message:error.message})
    }
}

export const decrypt = (req, res)=>{
    res.status(200).json(decryption(req.body));
}