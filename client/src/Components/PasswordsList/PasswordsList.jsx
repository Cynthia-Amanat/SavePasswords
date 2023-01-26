import React ,{useState} from "react"
import { PasswordsListContext } from "../../Context/PasswordContext";
import "./passwordList.css"
import BrokenImage from "./noAppLogo.png"
import EditPopUp from "../EditPopUp/EditPopUp";

const PasswordsList = ()=>{
const {passwordsList , setPasswordList,setError} = PasswordsListContext()
const [open ,setOpen]= useState(false)
console.log(passwordsList)
const decryptPassword = async(encryption) =>{
    const url = "http://localhost:8000/passwords/decryptpassword"
    const methods = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body:JSON.stringify({password:encryption.password, iv:encryption.iv})
    }
    try{
        const response = await fetch(url,methods)
        const data = await response.json()
        setPasswordList(passwordsList.map((item)=>{
            return item.idpasswords === encryption.idpasswords ? {
                idpasswords:item.idpasswords,
                title: data,
                iv: item.iv
            } : item;
        }))
      setTimeout(()=>{
        window.removeEventListener(decryptPassword , setPasswordList(passwordsList))
      },3000)
          
    }catch(error){
        setError(error)
    }

}
// on imageError
const imageOnError = (event) => {
    event.currentTarget.src = BrokenImage;
    event.currentTarget.className = "error_on_image";
  };
// delete handler
const deleteHandler =async(id)=>{
const url = `http://localhost:8000/passwords/delete/${id}`
const method = {
    method: "DELETE"
}
try{
    const request = await fetch(url ,method)
    const response = await request.json();
    console.log(response)
}catch(error){
    console.log(error.message)
}

}
return(
    <>
    <div className="passwords_list_div">
    <table className="passwords_table">
    <thead>
  <tr>
    <th>Logo</th>
    <th>Title</th>
    <th>Edit</th>
    <th>Delete</th>
  </tr>
  </thead>
  <tbody>
        {passwordsList.map((item,key)=>{
        return <tr key={key}>
        <td>
        <img  className="app_logo" src={`https://logo.clearbit.com/${item.title}.com?size=100`}alt ="logo" onError={imageOnError}/>
        </td>
        <td onClick={()=>{decryptPassword({
            password: item.password,
            iv:item.iv,
            idpasswords: item.idpasswords
            
        })}}
       >{item.title}</td>
        <td>
            <button className="btn-edit" onClick={()=>setOpen(!open)}>
 <i className="fas fa-edit"></i>
 </button>
 {open ? (
         <div className="update-profile-popup-container">
          <EditPopUp
            setOpen={setOpen}
            item={item}
          />
        </div>
      ) : null} 
 </td>
        <td><button className="btn-edit" onClick={()=>deleteHandler(item.idpasswords)}><i className="fa-solid fa-trash-can"></i></button></td>   
      </tr>
    
         })}
         </tbody>
    </table>
    </div>
        
    </>
)

}

export default PasswordsList