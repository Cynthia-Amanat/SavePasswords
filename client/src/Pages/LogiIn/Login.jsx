
import "./login.css"
import { GoogleLogin } from '@react-oauth/google';
import { useState } from "react";
import {useAuth} from "../../Context/UserContext";
import jwt_decode from "jwt-decode"
import { useNavigate,  Link} from "react-router-dom";
import { useEffect } from "react";


const Login = () => {
const navigate = useNavigate()
const {setUser}= useAuth() 
const [error,setError] = useState(false)
const [Isloading ,setIsLoading] = useState(false)
const [email, setEmail]= useState()
const [password, setPassword]= useState()
const [showPassword, setShowPassword] = useState("password")
const [onClick, setOnClick] = useState(false);

// login with google
    const onSuccessGoogleLogin = async(credentialResponse)=>{
        console.log(credentialResponse)
        const decodedToken = await jwt_decode(credentialResponse.credential);
    setUser({
      user: decodedToken,
      token: credentialResponse.credential,
    });
    localStorage.setItem(
      "accessToken",
      JSON.stringify({
        user: decodedToken,
        token: credentialResponse.credential,
      })
    );
    navigate('/' , { replace: true });
  };
  // login with database

  const url = "http://localhost:8000/users/login"
  const method = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({email, password}),
  }
useEffect(()=>{
( async () => {
  if(onClick) {
    try{
      setIsLoading(true)
      const response = await fetch( url , method)
      const data = await response.json()
      if(data.success){
      const { accessToken } = data;
      localStorage.setItem("accessToken", `${accessToken}`);
      localStorage.setItem("loggin", true);
      setUser(data.user);
      navigate('/' , { replace: true });
      }else{
        setError(data.message)
      }
      setIsLoading(false)
    

    }
    catch(error){
      setError(error.message)
      console.log(error)
    }
  }


}) ();
setOnClick(false)

},[onClick])
    
    return(
        <div className="login">
    <div className="user__login">
    <header className="user__header_login">
    <i className="fa-solid fa-lock"></i>
    </header>
    
    <section className="form_login">
      {error && <p>{error}</p>}
      <br />
        <div className="form__group_login">
            <input type="email"
            required={true} 
            placeholder="Email"
            className="form__input_login" 
            onChange={(e) => setEmail(e.target.value)}/>
            
        </div>
        
        <div className="form__group_login">
            <input type={showPassword}
             required={true} 
             placeholder="password"
             className="form__input_login"
             onChange={(e) => setPassword(e.target.value)} />
            <i
              className={
                showPassword === "text"
                  ? "fa-regular fa-eye"
                  : "fa-regular fa-eye-slash"
              }
              onClick={() =>
                showPassword === "password"
                  ? setShowPassword("text")
                  : setShowPassword("password")
              }
            ></i>
        </div>
        <button className="btn_login" type="submit" onClick={()=>{setOnClick(true)}}>Login</button>
        <button  className="google_button"><GoogleLogin onSuccess={onSuccessGoogleLogin}/></button>
        
        <Link to ={"/signUp"} className= "linkForSignUp">No account signUp here</Link>
    </section>
    
    
</div>
</div>
    )
            }
export default Login