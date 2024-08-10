import React from 'react'
import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  
  return (
    <div className='auth-container'>
<div className="container-fluid bg-overlay">
  <div className="row justify-content-center align-items-center vh-100">
    <div className="col-md-5 bg-white p-3 rounded rounded-3 px-5">
      <div>
      <div className='mb-3 text-center'>
      <img src="\src\assets\images\login-photo.svg " className='w-50' alt="login-photo"  />
    </div>
    <div>
    <Outlet />
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
  ) 
  
}
