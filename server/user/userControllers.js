// import  {createService} from './userService.js'
import bcrypt from 'bcrypt'
import pool from '../database.js'
import jwt from 'jsonwebtoken'

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
 const query = `INSERT INTO registration(name,email,password,dob) VALUES(?,?,?,?)`
pool.query(query, Object.values(data), (error)=>{
    if(error){
        console.log(error.message)
        res.status(500).json({success:false,message:'server not found'})
    }else{
        res.status(200).json({success:true,data:data})
    }
})
}
export const authenticateToken =(req, res, next)=>{
    const token = req.cookies["access-token"]
    if(token == null) return res.status(401)
    try{
      const user =  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
      if(user){
        req.authenticated = true;
      }
     
        return next()

    }catch(err){
        console.log(err.message)
        return res.status(400)

    }
    
    }

export const getUser = (req,res)=>{
    let email = req.body.email;
    const query = ` select * from registration where email = ? `
    pool.query(query,[email],(error,result)=>{
        if(error){
            console.log(error.message)
            res.status(500)
        }else{
            res.json({success:true, result:result})
        }

    })
}


export const login = async(req,res)=>{
    let email = req.body.email;
    const query = ` select * from registration where email = ? `
    pool.query(query,[email],(error,results)=>{
        if(error){
            console.log(error.message)
            res.status(500).json({success:false ,message :"server not found"})
        }else{
            if(results.length > 0) { 
                bcrypt.compare(req.body.password, results[0].password, function(err, result) {
                    
                 if(result) {
                    const accessToken = jwt.sign(email, process.env.ACCESS_TOKEN_SECRET)
                   return  res.cookie("access-token", accessToken, {
                    maxAge: 60 * 60 * 24 * 30 * 1000,
                    httpOnly: true,
                  }).json({message:"logged in"})
                 }
                 else {
                   return res.status(400).json({ message: "Invalid Password" });
                 }
                })
                
            }
            else {
                return res.status(400).json({ message: "Invalid Email" });
            } 
        }

})}