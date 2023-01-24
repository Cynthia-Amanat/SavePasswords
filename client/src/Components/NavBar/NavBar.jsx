import "../NavBar/NavBar.css"
import { useAuth } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import defaultUserImg from "../NavBar/default-profile-picture.png"
import SavePasswordButton from "../SavePasswordButton/SavePasswordButton";
const NavBar = ()=>{

    const navigate = useNavigate()
    const {logout, user}= useAuth()
      
    return(
        <div className="navbar">
            <header className="navbar_header">
                <div className="navbar_logo"><i className="fa-solid fa-lock"></i><h3>SavePass</h3></div>
                {user &&
                <div className="navbar_userInfo">  
                 <h6> welcome {user?.name}</h6>     
             <div className="user-img-header-container">
            <img
              src={user && user?.photo ? user.photo : defaultUserImg}
              alt="user"
              className="user-img-header"
            />
          </div>
                </div>}
                
              <div className="navbar_buttons">
                    <button onClick={()=>{
                        logout();
                     navigate('/Login',{replace:true})  }}>logOut</button >  
                </div>
            </header>
        </div>
    )
}

export default NavBar