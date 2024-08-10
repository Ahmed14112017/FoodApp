import React from 'react'
import Header from '../../Shared/component/Header/Header'
import headerimg from "../../../assets/images/header-logo.png"
import { useNavigate } from 'react-router-dom'
export default function Home() {
  const navigate=useNavigate()
  return (
    <div>
     <Header
      title={"wellcome ahmed arafa"}
     description={"This is a welcoming screen for the entry of the application , you can now see the options"} 
    image={headerimg}
     />
     <div className='d-flex justify-content-between align-items-center px-2 my-3 'style={{backbroundColor:"#F5F5F5"}}>
      <div className='mx-2'>
      <h4>Fill the <span className='text-success'>Recipes !</span></h4>
      <p className='text-muted'>you can now fill the meals easily using the table and form ,<br></br>
        click here and sill it with the table !</p>
      </div>
        <button onClick={()=>navigate("/dashboard/resipesList")} className='btn btn-success px-3'>Fill Recipes<i className="fa-solid fa-arrow-right ms-2" aria-hidden="true"></i></button>
     </div>
    </div>
  )
}
