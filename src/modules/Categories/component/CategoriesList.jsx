import React, { useEffect, useState } from 'react'
import Header from '../../Shared/component/Header/Header'
import recipesimg from"../../../assets/images/recipes-photo.svg"
import axios from 'axios'
import { CATEGORIES_URL } from '../../../Constants/END_POINTS.JSX'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import DeleteConfirmation from '../../Shared/component/DeleteConfirmation/DeleteConfirmation'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import NoData from '../../Shared/component/NoData/NoData'



export default function CategoriesList() {
  const [Categoriesdata,SetCategoriesdata]=useState([])
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [cat,Setcat]=useState(0)

  const handleShow = (id) => {
    Setcat(id)
    setShow(true);
  }
  const deleteitem=async()=>{
    try{
      const response=await axios.delete(CATEGORIES_URL.delete(cat),{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})
      console.log(response)
      toast.success("deleted successfully")
      handleClose()
      getdata()

    }
    catch(error){
      console.log(error)
      toast.error("deleted failed")
      
    }
  }
  const getdata=async()=>{
    try{
      const response=await axios.get(CATEGORIES_URL.getlist,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})
      SetCategoriesdata(response.data.data)
      console.log(Categoriesdata)
    }
    catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    getdata()
  },[])
  return (
    <>
 
    <Header
     title={" Categories Items"}
    description={"You can now add your items that any user can order it from the Application and you can edit"} 
   image={recipesimg}
    />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <DeleteConfirmation deleteitem={"category"} />
          </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={deleteitem}>
            Delete this item
          </Button>
        </Modal.Footer>
      </Modal>
    <div className="title p-3 d-flex justify-content-between">
      <div className="title-info">
      <h3>Categories Table Details</h3>
      <span>You can check all details</span>
      </div>
   <button className="btn btn-success">Add New Category</button>
   </div>
    <div className='table-container p-3'>
     <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Creation data</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
   
    {Categoriesdata.length>0? Categoriesdata.map((items)=>{
      return(
        <tr key={items.id}>
      <th  scope="row">{items.id}</th>
      <td>{items.name}</td>
      <td>{items.creationDate}</td>
      <td className=''>
        <i className='fa fa-edit text-warning mx-3' ></i>
        <i className='fa fa-trash text-danger' onClick={()=>handleShow(items.id)}></i>
      </td>
    </tr>
      )
    }):<NoData/>}
   
  </tbody>
</table>
    </div>
    </>
   
  )
}
