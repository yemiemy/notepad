import { createContext, useState, useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({children}) => {

    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading] = useState(true)

    let navigate = useNavigate()

    let registerUser = async (e) => {
        e.preventDefault()
        let response = await fetch('https://notepad-be.herokuapp.com/auth/users/', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({'username':e.target.username.value, 'password':e.target.password.value})
        })
        let data = await response.json()

        if (response.status === 201){
            navigate('/login')
        }else{
            console.log(response.status, data);
            navigate('/register')
        }
    }

    let loginUser = async (e) => {
        e.preventDefault()
        let response = await fetch('https://notepad-be.herokuapp.com/auth/jwt/create/', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({'username':e.target.username.value, 'password':e.target.password.value})
        })
        let data = await response.json()

        if (response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            navigate('/')
        }else{
            console.log(response.status, data);
            alert('Something went wrong.')
        }
    }

    let logOutUser = () => {
        setAuthTokens(null)
        setUser(null)

        localStorage.removeItem('authTokens')
        navigate('/login')
    }

    let updateToken = async () => {

        let response = await fetch('https://notepad-be.herokuapp.com/auth/jwt/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({'refresh':authTokens?.refresh})
        })
        let data = await response.json()

        if (response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        }else{
            console.log(response.status, data);
            logOutUser()
        }

        if(loading){
            setLoading(false)
        }
    }

    let contextData = {
        user:user,
        authTokens:authTokens,
        registerUser:registerUser,
        loginUser:loginUser,
        logOutUser:logOutUser
    }

    useEffect(() => {

        if(loading){
            updateToken()
        }

        let mins = 1000 * 60 * 25
        let intervalID = setInterval(() => {
            if (authTokens){
                updateToken()
            }
        }, mins) 

        return () => clearInterval(intervalID)

    }, [authTokens, loading])

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )

}