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
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
// import { useParams } from 'react-router-dom'




export default function CategoriesList() {
  // const param=useParams()
  const {register,handleSubmit,formState:{errors}}=useForm()
  const navigate=useNavigate()
 
  const [Categoriesdata,SetCategoriesdata]=useState([])
  const [show, setShow] = useState(false);
  const [showAdd, SetshowAdd] = useState(false);
  const [Arrayofpage, SetArrayofpage] = useState([]);
  const handleClose = () => setShow(false);
  const handleCloseAdd=()=>SetshowAdd(false)
  const handleshowAdd = () => SetshowAdd(true);
  const [cat,Setcat]=useState(0)
  const [namevalue,Setnamevalue]=useState("")
  const handleShow = (id) => {
    Setcat(id)
    setShow(true);
  }
  const deleteitem=async()=>{
    try{
      const response=await axios.delete(CATEGORIES_URL.delete(cat),{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}},
    )
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
  const getdata=async(pagesize,pageNumber,nameinput)=>{
    try{
      const response=await axios.get(CATEGORIES_URL.getlist,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`},
      params:{pageSize:pagesize,pageNumber:pageNumber,name:nameinput}}) 
      SetCategoriesdata(response.data.data)
      SetArrayofpage(Array(response.data.totalNumberOfPages).fill().map((_,i)=>i+1))

      console.log(Categoriesdata)

    }
    catch(error){
      console.log(error)
    }
  }

  const getValuebyName=(e)=>{
    Setnamevalue(e.target.value)
    getdata(5,1,e.target.value)
  }
  useEffect(()=>{
    // {logindata?.userGroup!=="SystemUser"?getdata(5,1,""):navigate("/login")}
    getdata(5,1,"")
   
  },[])
  const Addcategory=async(data)=>{
    try{
      const response=await axios.post(CATEGORIES_URL.create,data,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})
      console.log(response)
      handleCloseAdd()
      getdata()
      toast.success("item added successfully")
    }catch(error){
      console.log(error)
    }
  }
  return (
    <>
 
    <Header
     title={" Categories Items"}
    description={"You can now add your items that any user can order it from the Application and you can edit"} 
   image={recipesimg}
    />
      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton>
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
      <Modal show={showAdd} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
         <form onSubmit={handleSubmit(Addcategory)}>
         <input type="text" className="form-control my-3"  placeholder="Enter your category" {...register("name",{require:"Category Name is Require"})}/>
         {errors.name&&<span>{errors.name.massege}</span>}
         <Button  type='submit' variant="danger" >save</Button>

         </form>
          </Modal.Body>
        <Modal.Footer>
          
        </Modal.Footer>
      </Modal>
      
    <div className="title p-3 d-flex justify-content-between align-items-center">
      <div className="title-info">
      <h3>Categories Table Details</h3>
      <span>You can check all details</span>
      </div>
   <button className="btn btn-success" onClick={handleshowAdd}>Add New Category</button>
   </div>
    <div className='table-container p-3'>
      <input type='text' placeholder='search by Name' className='form-control' onChange={getValuebyName}  />
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
<nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
      
    </li>
    {Arrayofpage.map((pageno)=>{
        return(
          <li key={pageno} class="page-item" onClick={()=>getdata(5,pageno)}><a class="page-link">{pageno}</a></li>
        )
      })}
    
    
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
    </div>
    </>
   
  )
}
