import React, { useState } from "react";

const AuthContext = React.createContext({
    token: "",
    isLoggedIn: "",
    login: () => { },
    logout: () => { },
    resetSession: () => { }
})

export const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem('token');
    const [token, setToken] = useState(initialToken);
    const [isSessionExpired, setIsSessionExpired] = useState(false)

    const userIsLoggedIn = !!token;  //
    const resetSessionHandler = (payload) => {
        setIsSessionExpired(payload)
    }

    const loginHandler = (token) => {
        setToken(token);
        localStorage.setItem('token', token);
    };

    const logoutHandler = () => {
        setToken(null)
        localStorage.removeItem('token')
    }


    const contextValue = {
        token: token,
        isSessionExpired: isSessionExpired,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
        resetSession: resetSessionHandler
    }

    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}

export default AuthContext;