import React, { useEffect, useState } from 'react'
import Header from '../../../Shared/component/Header/Header'
import recipesimg from"../../../../assets/images/recipes-photo.svg"
import { USERREC_URL } from '../../../../Constants/END_POINTS.JSX'
import axios from 'axios'
import NoData from '../../../Shared/component/NoData/NoData'
import { IMAGE_URL } from '../../../../Constants/END_POINTS.JSX'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import DeleteConfirmation from '../../../Shared/component/DeleteConfirmation/DeleteConfirmation'
import { toast } from 'react-toastify'


export default function UsersList({deleteitem}) {
const [user,Setuser]=useState([])
const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [userid,Setuserid]=useState(0)
  const handelshow=(id)=>{
    Setuserid(id)
    setShow(true)
  }
  const getuserdata=async()=>{
    try{
      const response= await axios.get(USERREC_URL.getlist,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})
      console.log(response.data.data)
      Setuser(response.data.data)
    }catch(error){
      console.log(error)
    }
  }
  const deleteuserdata=async()=>{
    try{
      const response=await axios.delete(USERREC_URL.delete(userid),{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})
      handleClose()
      getuserdata()
      toast.success("item is deleted successfully")
    }
    catch(error){
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <DeleteConfirmation deleteitem={"user"} />
          </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={deleteuserdata}>
            Delete this item
          </Button>
        </Modal.Footer>
      </Modal>
    <div className='p-3'>
      <div>
        <h4>Users Table Details</h4>
        <span>You can check all details</span>
      </div>
      <div className="table-container">
   <table className="table">
  <thead>
    <tr className='text-center'>
      <th scope="col">item Name</th>
      <th scope="col">image</th>
      <th scope="col">country</th>
      <th scope="col">phoneNumber</th>
      <th scope="col">email</th>
    </tr>
  </thead>
  <tbody>
    {user?user.map((item)=>{
      return(
        <tr key={item.id}>
          <td> {item.userName} </td>
          <td> {item.imagePath?<img className='image-list' src={`${IMAGE_URL}/${item.imagePath}`}/>:<img className='image-list' src="\src\assets\images\ask-for-insure.svg" />} </td>
          <td> {item.country} </td>
          <td> {item.phoneNumber} </td>
          <td> {item.email} </td>
          <td className=''> 
          <i className='fa fa-edit text-warning mx-3' ></i>
          <i className='fa fa-trash text-danger' onClick={()=>handelshow(item.id)}></i>
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
