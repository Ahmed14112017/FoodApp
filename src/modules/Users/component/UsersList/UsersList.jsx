import React, { useEffect, useState } from 'react'
import Header from '../../../Shared/component/Header/Header'
import recipesimg from"../../../../assets/images/recipes-photo.svg"
import { USERREC_URL } from '../../../../Constants/END_POINTS.JSX'
import axios from 'axios'

export default function UsersList() {
const [userrecipe,Setuserrecipe]=useState([])
  const getuserdata=async()=>{
    try{
      const response= await axios.get(USERREC_URL.getlist,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})
      console.log(response)
      Setuserrecipe(response)
    }catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    getuserdata()
  },[])
  return (
    <>
      <Header
      title={"Users list"}
     description={"You can now add your items that any user can order it from the Application and you can edit"} 
    image={recipesimg}
     />
    <div className='p-3'>
      <div>
        <h4>Users Table Details</h4>
        <span>You can check all details</span>
      </div>
      <div className="table-container">
   <table className="table">
  <thead>
    <tr>
      <th scope="col">item Name</th>
      <th scope="col">image</th>
      <th scope="col">price</th>
      <th scope="col">description</th>
      <th scope="col">tag</th>
    </tr>
  </thead>
  <tbody>
    {userrecipe?userrecipe.map((item)=>{
      return(
        <tr key={item.id}>
          <td> {item.name} </td>
          <td> {item.imagePath?<img className='image-list' src={`${IMAGE_URL}/${item.imagePath}`}/>:<img className='image-list' src="\src\assets\images\ask-for-insure.svg" />} </td>
          <td> {item.price} </td>
          <td> {item.description} </td>
          <td> {item.tag.name} </td>
          <td className=''> 
          <i className='fa fa-edit text-warning mx-3' ></i>
          <i className='fa fa-trash text-danger' onClick={()=>handleShow(item.id)}></i>
            </td>
          
          </tr>
          
      )
    }):<NoData/>}
    
    
  </tbody>
</table>
   </div>
    </div>
    </>
  )
}
