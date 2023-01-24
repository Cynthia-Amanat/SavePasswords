import { query } from "express"
import pool from "../database"


const registerUser = (error, result)=>{
        if(error){
            console.log(error.message)
            return res.status(400).json({message:error.message})
        }
        if(result.length){
            return res.status(400).json({success:false, message:`User ${data.email} is already exist`})
        }
        
            const query = `INSERT INTO registration(name,email,password,dob) VALUES(?,?,?,?)`
            pool.query(query, Object.values(data), (error)=>{
            if(error){
                console.log(error.message)
                res.status(500).json({message:'server not found'})
            }else{
                res.status(200).json({success:true, data:data})
            }
        })
        
     }


export default registerUser