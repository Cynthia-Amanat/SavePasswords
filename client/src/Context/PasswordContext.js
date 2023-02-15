import React from "react";
import { createContext , useState ,useEffect, useContext } from "react";
import { useAuth } from "./UserContext";

export const PasswordContext = createContext();

export const PasswordsListContext = () => {
    return useContext(PasswordContext);
  };

export const PasswordProvider = ({children}) => {
const {user}= useAuth();
const [passwordsList , setPasswordList] = useState([])
const [error , setError] = useState(false)
const [loading, setLoading] = useState(true);
const idRegistration = user.idRegistration
const url = `http://localhost:8000/passwords/getPasswords/${idRegistration}`


const getPasswords = async()=>{
    try{
        const response = await fetch(url)
        const data = await response.json()
        setPasswordList(data?.result)
  if(data.result) setLoading(false)  
     
    }catch(error){
    setError(error.message)
    }
}

useEffect(()=> {
  getPasswords()
}, [user])

useEffect(()=> {

},[passwordsList])



const value = {
    passwordsList,
    setPasswordList,
    error,
    setError,
    loading
}
 return <PasswordContext.Provider value={value}>{
    loading ? (
    <p>Loading...</p>
  ) : (
    children
  )}</PasswordContext.Provider>
}
