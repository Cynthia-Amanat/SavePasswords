import React ,{useEffect,useState} from "react"
import { useAuth } from "../../Context/UserContext";
import "./passwordList.css"

const PasswordsList = ()=>{
const {user , setError,error}= useAuth();
const [passwordsList , setPasswordList] = useState([])
// console.log(user)
// const idRegistration = user.idRegistration
// console.log(idRegistration)
const url = `http://localhost:8000/passwords/getPasswords/4`
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

}, [])

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
        {passwordsList.map((item)=>{
        return <tr>
        <td>
        <img  className="app_log" src={`https://logo.clearbit.com/${item.title}.com?size=100`}alt ="logo"/>
        </td>
        <td>{item.title}</td>
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