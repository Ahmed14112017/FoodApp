import React, { useContext, useState } from 'react'
import { Sidebar as Prosider, Menu, MenuItem } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';
import { Authcontext } from '../../../../Authcontext/Authcontext';

export default function Sidebar() {
  const {logindata}=useContext(Authcontext)
  const [collape,Setcollape]=useState(false)
  const navigate=useNavigate()
  console.log(logindata)
  const toggle=()=>{
    Setcollape(!collape)
  }
  return (
    <>
    <div className="sidebar-container">
    <Prosider collapsed={collape}>
    <button style={{background:"none",border:"none"}}  onClick={toggle}> <img style={{
      width:collape?"6rem":"8rem",
      textAlign:collape?"":"center",
      transition:"all 300ms"
      
    }} src='\src\assets\images\3.png'alt='collape'/> </button>
  <Menu > 
    <MenuItem icon={<i className='fa fa-home'></i>} component={<Link to="home" />}> home</MenuItem>
    {logindata?.userGroup=="SuperAdmin"?(<MenuItem icon={<i className='fa fa-users'></i>} component={<Link to="users" />}> users</MenuItem>
):""}
    <MenuItem icon={<i className="fa-solid fa-receipt"></i>} component={<Link to="resipesList" />}> recipes</MenuItem>
    {logindata?.userGroup!=="SuperAdmin"?(<MenuItem icon={<i className="fa-solid fa-receipt"></i>} component={<Link to="favorites" />}> Favorites</MenuItem>):""}
    {logindata?.userGroup == "SuperAdmin"?(<MenuItem icon={<i className="fa-solid fa-list"></i>} component={<Link to="categoriesList" />}> Categories</MenuItem>):""}
    <MenuItem onClick={()=>{
      localStorage.removeItem("token"),
      navigate("/login")}} 
      icon={<i className="fa-solid fa-arrow-right-from-bracket"></i>}> Logout</MenuItem>
  </Menu>
</Prosider>;
        </div>

    </>
  )
}
