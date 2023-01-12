import React from "react";
import "./singup.css";
import { Link , useNavigate} from "react-router-dom";
import {useState } from "react"
import {useAuth} from "../../Context/UserContext";
 
 const SignUp = () =>{
 const navigate = useNavigate()
 const {setUser} = useAuth()
 const[error ,setError] = useState("")
 const [name, setName]= useState("")
 const [email, setEmail]= useState("")
 const [password, setPassword]= useState("")
 const [confirmPassword,setConfrimPassword] = useState("")
 const [dob, setDob]= useState("")
 const [success, setSuccess]= useState(false)

 

    const userData = { name , email ,password , dob ,}

    const handleSubmitForSignUp = async(e)=>{
        e.preventDefault();
 if (!name || !email || !dob) return setError(`Please fill all mandatory fields`);
 if (password !== confirmPassword) return setError("The passwords do not match");
        const url = "http://localhost:8000/users/registration"
        const methods = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(userData)
    }
        try{
        const response = await fetch(url , methods)
        const data = await response.json()
        setUser(data)
        if(data.success){
            navigate("/Login",{replace: true})
        }else{
            setError(data.message)
          }
       
        }catch(err){
            console.log(err.message)
            setError(err.message)
        }
       setSuccess(true) 
    }

  return (
    <div className="signUp">
    <div className="user-signUp">
    <header className="user__header">
    <i className="fa-solid fa-lock"></i>
        <h1 className="user__title"> simply sign-up to save you passwords </h1>
    </header>
    
    <form className="form" onSubmit={handleSubmitForSignUp}>
    {error && <p>{error}</p>}
    <br />
        <div className="form__group">
            <input type="text" 
            required={true}
            placeholder="Username" 
            className="form__input"
            onChange={(e) => setName(e.target.value)}/> 
        </div>
        
        <div className="form__group">
            <input type="email"
             required={true} 
             placeholder="Email"
            className="form__input"
            onChange={(e) => setEmail(e.target.value)}/> 
        </div>
        
        <div className="form__group">
            <input type="password" 
            required={true} 
            placeholder="Password" 
            className="form__input" 
            onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div className="form__group">
            <input type="password"
            required={true} 
            placeholder="Confrim password" 
            className="form__input" 
            onChange={(e) => setConfrimPassword(e.target.value)}/>
        </div>
        <div className="form__group">
            <input type="text" 
            required={true} 
            placeholder="Date of birth" 
            className="form__input" 
            onChange={(e) => setDob(e.target.value)}/>
        </div>
        <button className="btn" type="submit">Register</button>
    </form>
    <Link to={"/Login"} className="link"> Already have account Login Here</Link>
</div>
</div>
  )
 }
 export default SignUp