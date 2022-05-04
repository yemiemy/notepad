import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const Header = () => {
  let {authTokens, logOutUser} = useContext(AuthContext)

  let [user, setUser] = useState(null)

  useEffect(()=> {
    if (!authTokens){
      setUser(null)
    }else{
      let getUserDetails = async () => {
        let response = await fetch('http://127.0.0.1:8000/auth/users/me/', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization':'Bearer ' + String(authTokens?.access)
          }
        })
    
        let data = await response.json()
        if (response.status === 200){
          setUser(data)
        }
      }
      getUserDetails()
    }
  }, [authTokens])

  return (
    <div className='app-header'>
      {user && <h1>Hello {user.username}<br/></h1> }
      <h3>Notes List</h3>
      {user ? (
            <p onClick={logOutUser} style={{cursor: "pointer"}}>Logout</p>
        ): <><Link to="/register">Create account</Link></> }
    </div>
  )
}

export default Header