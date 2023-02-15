import React from "react"
import { PasswordsListContext } from "../../Context/PasswordContext";
import "./passwordList.css"
// import BrokenImage from "./noAppLogo.png"
// import EditPopUp from "../EditPopUp/EditPopUp";
import PasswordCard from "../PasswordCard/PasswordCard";

const PasswordsList = ()=>{
const {passwordsList} = PasswordsListContext()
// const [open ,setOpen]= useState(false)

// const decryptPassword = async(encryption) =>{
//     const url = "http://localhost:8000/passwords/decryptpassword"
//     const methods = {
//         method: "POST",
//         headers: {"Content-Type": "application/json"},
//         body:JSON.stringify({password:encryption.password, iv:encryption.iv})
//     }
//     try{
//         const response = await fetch(url,methods)
//         const data = await response.json()
//         setPasswordList(passwordsList.map((item)=>{
//             return item.idpasswords === encryption.idpasswords ? {
//                 idpasswords:item.idpasswords,
//                 title: data,
//                 iv: item.iv
//             } : item;
//         }))
//       setTimeout(()=>{
//         window.removeEventListener(decryptPassword , setPasswordList(passwordsList))
//       },3000)
          
//     }catch(error){
//         setError(error)
//     }

// }
// // on imageError
// const imageOnError = (event) => {
//     event.currentTarget.src = BrokenImage;
//     event.currentTarget.className = "error_on_image";
//   };
// // delete handler
// const deleteHandler =async(id)=>{
// const url = `http://localhost:8000/passwords/delete/${id}`
// const method = {
//     method: "DELETE"
// }
// try{
//     const request = await fetch(url ,method)
//     const response = await request.json();
//     console.log(response)
// }catch(error){
//     console.log(error.message)
// }

// } 
if (passwordsList.length === 0){
  return(
    <div className="nothing_to_show">
      <p>Nothing to show add passwords to save</p>
    </div>
  )
}
return(
    <>
    <div className="passwords_list_div">
      
    <table className="passwords_table">
    <thead>
  <tr className="tr-head">
    <th>Logo</th>
    <th>Title</th>
    <th>Edit</th>
    <th>Delete</th>
  </tr>
  </thead>
  <tbody>
        {passwordsList.map((item, key)=>{
         return <PasswordCard item={item} key={key}/>
//         return <tr key={key}>
//         <td>
//         <img  className="app_logo" src={`https://logo.clearbit.com/${item.title}.com?size=100`}alt ="logo" onError={imageOnError}/>
//         </td>
//         <td onClick={()=>{decryptPassword({
//             password: item.password,
//             iv:item.iv,
//             idpasswords: item.idpasswords
            
//         })}}
//        >{item.title}</td>
//         <td>
//             <button className="btn-edit" onClick={()=>setOpen(!open)}>
//  <i className="fas fa-edit"></i>
//  </button>
 
//  </td>
//         <td><button className="btn-edit" onClick={()=>deleteHandler(item.idpasswords)}><i className="fa-solid fa-trash-can"></i></button></td> 

//         {open ? (
//          <div className="update-profile-popup-container">
//           <EditPopUp
//             setOpen={setOpen}
//             item={item}
//           />
//         </div>
//       ) : null}   
//       </tr>
    
         })}
         </tbody>
    </table>
    </div>
        
    </>
)

}

export default PasswordsList