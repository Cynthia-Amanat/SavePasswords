
import React from "react";
import { createContext , useState ,useEffect, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState([]);
  const [error, setError] = useState("");
  const [token, setToken] = useState(() => {
    const token = localStorage.getItem("accessToken");
    return token;
  });

 const url = "http://localhost:8000/users/profile"
 const method = {
  method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
 }

 const getUser = async()=>{
  try{
    const response = await fetch(url, method)
    const data = await response.json()
    console.log(data)
    setUser(data.user)
  }catch(error){
    setError(error.message)
  }
  
 }
useEffect(() => {
  if(token){
    getUser()
  }
}, []);
const logout = () => {
  setUser("")
  setToken("")
};

  
  const value = {
    user:user,
    setUser:setUser,
    logout:logout,
    error:error,
    setError:setError
  };


  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


