import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const LoginPage = () => {
    let { loginUser } = useContext(AuthContext)
  return (
    <div>
        <h1 className='login-header'>Login</h1>
        <form onSubmit={loginUser}>
            <div className='txt_field'>
                <input type='text' name='username' required />
                <span></span>
                <label>Username</label>
            </div>
            
            <div className='txt_field'>
                <input type='password' name='password' required />
                <span></span>
                <label>Password</label>
            </div>
            
            <input type="submit" value="Login" />

            <div className='signup_link'>
                Don't have an account? 
                <Link to='/register'> Sign up</Link>
            </div>
        </form>
    </div>
  )
}

export default LoginPage