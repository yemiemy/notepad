import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    
    const [auth, setAuth] = useState(() => sessionStorage.getItem("auth") ? JSON.parse(sessionStorage.getItem("auth")) : {})
    const navigate = useNavigate()

    const logOutUser = () => {
        setAuth({})
        sessionStorage.removeItem("auth")
        navigate('/login')
    }

    return (
        <AuthContext.Provider value={{auth, setAuth, logOutUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext