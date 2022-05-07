import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    
    const [auth, setAuth] = useState({})
    const navigate = useNavigate()

    const logOutUser = () => {
        setAuth({})
        navigate('/login')
    }

    return (
        <AuthContext.Provider value={{auth, setAuth, logOutUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext