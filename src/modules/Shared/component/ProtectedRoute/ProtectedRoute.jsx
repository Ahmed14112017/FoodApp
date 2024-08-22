import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { Authcontext } from '../../../../Authcontext/Authcontext';

export default function ProtectedRoute({children}) {
    const {logindata}=useContext(Authcontext)

    if(localStorage.getItem("token")||logindata) return children
    else return <Navigate to="/login" />;
 
}
