import React, { useState } from 'react'
import { Sidebar as Prosider, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  const [collape,Setcollape]=useState(false)
  const toggle=()=>{
    Setcollape(!collape)
  }
  return (
    <>
    <div className="sidebar-container">
    <Prosider collapsed={collape}>
  <Menu>
  <MenuItem className='first-item my-5 w-50 m-auto'  onClick={toggle} icon={<img src='\src\assets\images\3.png'alt='collape'/>}> </MenuItem>
    <MenuItem icon={<i className='fa fa-home'></i>} component={<Link to="home" />}> home</MenuItem>
    <MenuItem icon={<i className='fa fa-users'></i>} component={<Link to="users" />}> users</MenuItem>
    <MenuItem icon={<i className="fa-solid fa-receipt"></i>} component={<Link to="resipesList" />}> recipes</MenuItem>
    <MenuItem icon={<i className="fa-solid fa-list"></i>}component={<Link to="categoriesList" />}> Categories</MenuItem>
    <MenuItem icon={<i className="fa-solid fa-arrow-right-from-bracket"></i>}> Logout</MenuItem>
  </Menu>
</Prosider>;
        </div>

    </>
  )
}
