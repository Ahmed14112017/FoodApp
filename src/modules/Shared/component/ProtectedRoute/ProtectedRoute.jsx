import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({logindata,children}) {
    if(localStorage.getItem("token")||logindata) return children
    else return <Navigate to="/login" />;
 
}
