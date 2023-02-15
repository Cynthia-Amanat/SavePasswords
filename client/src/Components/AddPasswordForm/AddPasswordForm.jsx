import { useState } from "react";
import { useAuth } from "../../Context/UserContext";
import { PasswordsListContext } from "../../Context/PasswordContext";

import "./AddPasswordFrom.css"
import { useEffect } from "react";
  
const AddPasswordForm = ()=>{
    const {user , setError,error}= useAuth();
    const [title, setTitle] = useState("")
    const [password , setPassword] = useState("")
    const [showPassword, setShowPassword] = useState("password")
    const [open, setOpen] = useState(false)
    // console.log(user)
    const idRegistration = user.idRegistration
    // console.log(idRegistration)
    const url = "http://localhost:8000/passwords/addPassword"
    const methods ={
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({title, password ,idRegistration})
    }


    const {passwordsList, setPasswordList} = PasswordsListContext()


  
    const addPasswordHandler = async($this) =>{
      
        try{
            const response = await fetch(url,methods)
            const data = await response.json()
           

            if (data.success) {
              console.log(data.data)
              setPasswordList(data.data)
                document.getElementById("addPasswords_form").classList.add("hide");
              }
        }catch(error){
           setError(error) 
        }
      
    }
    return(
        <div className="addPasswords" id="addPasswords_form">
        <section className="form_addPasswords">
      {error && <p>{error}</p>}
      <br />
        <div className="form__group_addPasswords">
            <input type="text"
            required={true} 
            placeholder="Ex.facebook"
            className="form__input_addPasswords" 
            onChange={(e) => setTitle(e.target.value)}/>
            
        </div>
        
        <div className="form__group_addPasswords">
            <input type={showPassword}
             required={true} 
             placeholder="password"
             className="form__input_addPasswords"
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
        <button className="btn_login" type="button" onClick={addPasswordHandler}>Add password</button>
    </section>
    </div>
    )
}
  export default AddPasswordForm