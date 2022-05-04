import React, {useContext} from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const PrivateRoute = ({children, ...rest}) => {
    let {user} = useContext(AuthContext)
    let element = {...rest}.element
    let path = {...rest}.path  

    return (
        <Routes>
            <Route path={path} element={!user ? <Navigate to="/login" /> : element}>{children}</Route>
        </Routes>
    )
}

export default PrivateRoute