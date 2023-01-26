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
const idRegistration = user.idRegistration
console.log(idRegistration)
const url = `http://localhost:8000/passwords/getPasswords/${idRegistration}`


const getPasswords = async()=>{
    try{
        const response = await fetch(url)
        const data = await response.json()
        console.log(data)
        setPasswordList(data?.result)
    }catch(error){
    setError(error.message)
    }
}
useEffect(()=>{
getPasswords()
}, [user])

const value = {
    passwordsList,
    setPasswordList,
    error,
    setError

}
 return <PasswordContext.Provider value={value}>{children}</PasswordContext.Provider>
}