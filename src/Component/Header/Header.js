import { useContext } from "react";
import {NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../../Context-Api/Auth-Context";

const Header = (props) => {
  const authCtx = useContext(AuthContext)
  const navigate = useNavigate();

  const signinHandler = () =>{
    navigate("/login")
  }

  const signUpHandler = ( ) => {
    navigate('/signup')
  }

const logoutHandler = ( ) => {
  authCtx.logout();
    navigate('/login')
}


  return (
    <>
      <header className="header">
        <ul className="header__route">
          <li>
            <NavLink  to="/home">HOME</NavLink >
          </li>
          <li>
            <NavLink  to="/about">ABOUT</NavLink >
          </li>
          <li>
            <NavLink  to="/profile">Profile</NavLink >
          </li>
        </ul>
        <div className="header__button">
           {authCtx.isLoggedIn && <button className="logout__btn" onClick={logoutHandler}>Logout</button>}
            {!authCtx.isLoggedIn && <>
              <button className="signin__btn" onClick={signinHandler}>SignIn</button>
            <button className="signout__btn"onClick={signUpHandler}>SignUp</button>
            </>}
        </div>
      </header>
    </>
  );
};

export default Header;
