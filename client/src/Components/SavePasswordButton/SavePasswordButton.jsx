import React ,{useState} from "react"
import "./SavePasswordButton.css"
import AddPasswordForm from "../AddPasswordForm/AddPasswordForm"

const SavePasswordButton = ()=>{
    const [open ,setOpen]= useState(false)
  
    return(
        <><div className="savePasswordBtn"> 
            <button className="savePasswordBtn" onClick={()=>setOpen(!open)}> click here to Save Passwords</button>
        </div>
            <div>
            {open && <AddPasswordForm/>}
            </div>
       
            </>
    )
}
export default SavePasswordButton