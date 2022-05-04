import { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({children}) => {

    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(() => localStorage.getItem('username') ? localStorage.getItem('username') : null)

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
        let response = await fetch('https://notepad-be.herokuapp.com/auth/token/login/', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({'username':e.target.username.value, 'password':e.target.password.value})
        })
        let data = await response.json()

        if (response.status === 200){
            setAuthTokens(data)
            setUser(e.target.username.value)
            localStorage.setItem('authTokens', JSON.stringify(data))
            localStorage.setItem('username', String(e.target.username.value))

            navigate('/')
        }else{
            console.log(response.status, data);
            alert('Something went wrong.')
        }
    }

    let logOutUser = async () => {

        let response = await fetch('https://notepad-be.herokuapp.com/auth/token/logout/', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'Authorization':'Token ' + String(authTokens?.auth_token)
            },
        })
        if (response.status !== 204){
            console.log(response.status, response);
            alert('Something went wrong. Try again.')
        }

        setAuthTokens(null)
        setUser(null)

        localStorage.removeItem('authTokens')
        localStorage.removeItem('username')
        navigate('/login')
    }

    let contextData = {
        user:user,
        authTokens:authTokens,
        registerUser:registerUser,
        loginUser:loginUser,
        logOutUser:logOutUser
    }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )

}