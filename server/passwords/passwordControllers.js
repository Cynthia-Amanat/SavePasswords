import pool from '../database.js'
import {promisify} from "util"
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

        if(addPassword){
         return res.status(200).json({success:true})
        }

    }catch(error){
    return res.status(400).json({success:false , message:error.message})
    }
}

export const getPasswords = async (req, res)=>{
    const idRegistration = req.params.id

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
    try{
        res.status(200).json(decryption(req.body));
    }catch(error){
        res.status(400).json({success: false , message: error.message})
    }
 
}

export const UpdatePasswordsAndTitle = async(req, res)=>{
    const id = req.params.id
    const {
        title,
        password,
    }= req.body
   

    const queryTitle = `UPDATE passwords SET title = ? WHERE idpasswords = ${id}`
    
    const queryPassword = `UPDATE passwords SET password = ?, iv = ?  WHERE idpasswords = ${id}`
    try{
        if(title){
         await exceQuery(queryTitle ,[title ,id],(error, result) => {
            if (error) throw error;
            res.send('title updated successfully!');
            console.log(result)
        }

    )
}
        if(password){
            const encryptedPassword = encryption(password)
            await exceQuery(queryPassword,[encryptedPassword.password,encryptedPassword.iv,  id],(error, result) => {
                if (error) throw error;
                res.send('password updated successfully!');
                console.log(result)
            })
        }
    
    }catch(error){
        res.status(409).json({success:false ,message:error.message})
    }
}
export const deletePassword = async(req, res)=>{
    const id = req.params.id
    const query = `DELETE FROM passwords WHERE idpasswords = ${id}`
    
    try{
        const deletePassword = await exceQuery(query)
        if(deletePassword){
            res.status(200).json({success:true , message:"successfully deleted"})
        }

    }catch(error){
    res.status(400).json({success:false , message:error.message})
    }



}

