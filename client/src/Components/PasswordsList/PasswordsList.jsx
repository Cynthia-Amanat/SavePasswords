import React ,{useEffect,useState} from "react"
import { useAuth } from "../../Context/UserContext";
import "./passwordList.css"
import BrokenImage from "./noAppLogo.png"

const PasswordsList = ()=>{
const {user , setError}= useAuth();
const [passwordsList , setPasswordList] = useState([])
const idRegistration = user.idRegistration
console.log(idRegistration)
const url = `http://localhost:8000/passwords/getPasswords/${idRegistration}`
const methods = {
    method: "GET",
}
useEffect(()=>{
(async()=>{
try{
    const response = await fetch(url,methods)
    const data = await response.json()
    console.log(data.result)
    setPasswordList(data?.result)
}catch(error){
setError(error.message)
}
})()

}, [user])
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
const imageOnError = (event) => {
    event.currentTarget.src = BrokenImage;
    event.currentTarget.className = "error_on_image";
  };

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
        return <tr>
        <td>
        <img  className="app_logo" src={`https://logo.clearbit.com/${item.title}.com?size=100`}alt ="logo" onError={imageOnError}/>
        </td>
        <td onClick={()=>{decryptPassword({
            password: item.password,
            iv:item.iv,
            idpasswords: item.idpasswords
        })}}
        key={key}>{item.title}</td>
        {/* <td><button className="btn" onClick={()=>{decryptPassword({
            password: item.password,
            iv:item.iv,
            idpasswords: item.idpasswords
        })}}>show Password</button></td> */}
        <td>
            <button className="btn-edit">
 <i className="fas fa-edit"></i>
 </button>
 </td>
        <td><button className="btn-edit"><i className="fa-solid fa-trash-can"></i></button></td>
      </tr>
         })}
         </tbody>
    </table>
    </div>
    </>
)

}

export default PasswordsList