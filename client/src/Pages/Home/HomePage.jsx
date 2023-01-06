import { useAuth } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";

const HomePage =()=>{
    const navigate = useNavigate()
    const { user ,setUser} = useAuth()
const logOut = ()=>{
    setUser('');
    localStorage.removeItem("accessToken");
    navigate('/Login')

}

    return(
        <>
        <h1>HomePage</h1>
        <button onClick={logOut}>LogOut</button>
</>
        
    )
}

export default HomePage