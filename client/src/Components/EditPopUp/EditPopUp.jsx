
import React ,{useState} from "react"
// import useFetch from "../../hook/UseFetch";
const EditPopUp = ({setOpen, item})=>{
    const [title, setTitle] = useState("")
    const [password , setPassword] = useState("")
    const [showPassword, setShowPassword] = useState("password")
    const url =`http://localhost:8000/passwords/update/${item.idpasswords}`
    const method = {
        method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body:JSON.stringify({ title, password })
        }
 
    const editHandler  =async ()=>{
   
       try{
        const request = await fetch(url , method)
        const response = await request.json()
        console.log(response)
        setOpen(false)    
            
        }catch(error){
        console.log(error.message)
       }
    }

    return(
        <div className="addPasswords" id="addPasswords_form" >
        <section className="form_addPasswords">
        
        <div className="form__group_addPasswords">
        <button className= "close-btn btn" onClick={()=>setOpen(false)}>Close</button>
            <input type="text"
            required
            placeholder= {item.title}
            className="form__input_addPasswords" 
            onChange={(e) => setTitle(e.target.value)}/>
            
        </div>
        
        <div className="form__group_addPasswords">
            <input type={showPassword}
             required
             placeholder= "password"
             className="form__input_addPasswords"
             onChange={(e) => setPassword(e.target.value)} />
            <i
              style={{position: "fixed" , top:"50%" , left:"70%"}}
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
        <button className="btn_login" type="button" onClick={()=>editHandler()}>Edit</button>
    </section>
    </div>
    )
}
export default EditPopUp