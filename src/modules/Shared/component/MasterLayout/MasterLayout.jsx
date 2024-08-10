import React from 'react'
import Sidebar from "../Sidebar/Sidebar"
import Navbar from "../Navbar/Navbar"
import { Outlet } from 'react-router-dom'

export default function MasterLayout({logindata}) {
  return (
    <>
      
      <div className='d-flex'>
      <div className=' '>
      <Sidebar/>
      </div>
      <div className=' w-100 '>
        <Navbar logindata={logindata} />
        <Outlet />
      </div>
      </div>
      
    </>
  )
}
