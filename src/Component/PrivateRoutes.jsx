import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContextProvider'
import {Navigate} from 'react-router-dom'

function PrivateRoutes({children}) {
    const {Auth}=useContext(AuthContext)
  
  return (
    Auth.isAuth? children : <Navigate to="/login"/>
  )
}

export default PrivateRoutes