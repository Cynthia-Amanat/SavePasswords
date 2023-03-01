
import bcrypt from 'bcrypt'
import pool from '../database.js'
import jwt from 'jsonwebtoken'
import {promisify} from "util"

const exceQuery = promisify(pool.query).bind(pool);

export const createUser =async(req,res)=>{
    let hashPassword = req.body.password
    const salt = await bcrypt.genSalt(10)
    hashPassword = await bcrypt.hash(hashPassword ,salt)

 const data = {
    name:req.body.name,
    email:req.body.email,
    password:hashPassword,
    dob:req.body.dob
 }
 const queryFind = `SELECT * FROM registration where "${data.email}"`
 const queryInsert = `INSERT INTO registration SET ?`
 try{
    const existingUser = await exceQuery(queryFind)
    if(existingUser.length){
     return res.status(400).json({success:false , message: `user already ${data.email} exist`})
    }
    const registerNewUser = await exceQuery(queryInsert ,data)
    if(registerNewUser){
        return res.status(200).json({
       success:true , data:data     
        })
    }
 }catch(error){
    return res.status(500).json({message:error.message})
 }
}


export const getUser = async(req,res)=>{
    let email = req.user;
    const query = ` select * from registration where email = "${email}" `
    try{
        const result =  await exceQuery(query)
        if(result){
            return res.status(200).json({success:true , user:result[0]})
        }
        
    }catch(error){
        return res.status(500).json({message:error})
    }

}


export const login = async(req,res)=>{
    
    let email = req.body.email;
    const query = ` select * from registration where email = "${email}" `
    
    try{
    const results = await exceQuery(query)
    console.log(results)
    if(results.length > 0){
        bcrypt.compare(req.body.password, results[0].password, function(error, result) {
                        if(error) throw error
                         if(result) {
                            const accessToken = jwt.sign(email, process.env.ACCESS_TOKEN_SECRET)
                           return  res.status(200).json({success: true ,accessToken:accessToken, message:"logged in" , user:results[0]})
                         }
                         else {
                           return res.status(400).json({ message: "Invalid Password or Email" });
                         }
                        })
                        
    }
    }catch(error){
        res.status(500).json({message :error.message})
    }


}