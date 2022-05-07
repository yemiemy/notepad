import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Header = () => {
  let {auth, logOutUser} = useAuth()

  return (
    <div className='app-header'>
      {auth?.user && <h1>Hello {auth?.user}<br/></h1> }
      <h3>Notes List</h3>
      {auth?.user ? (
            <p onClick={logOutUser} style={{cursor: "pointer"}}>Logout</p>
        ): <><Link to="/register">Create account</Link></> }
    </div>
  )
}

export default Header