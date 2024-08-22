import React, { useContext } from 'react'
import { Authcontext } from '../../../../Authcontext/Authcontext'

export default function Navbar() {
  const {logindata}=useContext(Authcontext)

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          {logindata?.userName}
          
       </li>
        
      </ul>
      
    </div>
  </div>
</nav>
    </>
  )
}
