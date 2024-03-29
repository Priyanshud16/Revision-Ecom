import React, { createContext, useState } from 'react'

export const AuthContext=createContext()
function AuthContextProvider({children}) {
    const [Auth,setAuth]=useState({
        isAuth:false,
        token:null
    })
    const Loginuser=(token)=>{
       setAuth((prev)=>({
        ...prev,
        isAuth:true,
        token:token
        
       }))
    }
    const LogoutUser=()=>{
       setAuth((prev)=>({
        ...prev,
        isAuth:false,
        token:null
       }))
    }
  return (
    <AuthContext.Provider value={{Auth,Loginuser,LogoutUser}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider