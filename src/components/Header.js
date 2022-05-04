import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const Header = () => {
  let {logOutUser, user} = useContext(AuthContext)

  return (
    <div className='app-header'>
      {user && <h1>Hello {user}<br/></h1> }
      <h3>Notes List</h3>
      {user ? (
            <p onClick={logOutUser} style={{cursor: "pointer"}}>Logout</p>
        ): <><Link to="/register">Create account</Link></> }
    </div>
  )
}

export default Header