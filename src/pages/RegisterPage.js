import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const RegisterPage = () => {
    let { registerUser } = useContext(AuthContext)
    return (
        <div>
            <h1 className='login-header'>Sign Up</h1>
            <form onSubmit={registerUser}>
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
                
                <input type="submit" value="Sign up" />

                <div className='signup_link'>
                    Already have an account? 
                    <Link to='/login'> Login</Link>
                </div>
            </form>
        </div>
    )
}

export default RegisterPage