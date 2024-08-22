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
import { useBlocker } from 'react-router-dom'


export default function UsersList() {
const [user,Setuser]=useState([])
const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [userid,Setuserid]=useState(0)
  const [arrayofapge,Setarrayofpage]=useState([])
  const [namevalue,Setnamevalue]=useState("")
  const [emailvalue,Setemailvalue]=useState("")
  const [countryvalue,Setcountryvalue]=useState("")
  const [kinduser,Setkinduser]=useState()
  // const [numberuser,Setknumberuser]=useState([])
  const {location,reset,proceed,state}=useBlocker(({currentLocation,nextLocation})=>{
    console.log(currentLocation,nextLocation)
    return currentLocation!==nextLocation;
    
  })
  const handelshow=(id)=>{
    Setuserid(id)
    setShow(true)
  }
  const getuserdata=async(pagesiz,pageno,nameinput,useremail,countryuser,kindofuser)=>{
    try{
      const response= await axios.get(USERREC_URL.getlist,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`},
      params:{pageSize:pagesiz,pageNumber:pageno,userName:nameinput,email:useremail,country:countryuser,groups:kindofuser}
    })
    Setarrayofpage(
      Array(Math.min(response.data.totalNumberOfPages, 10))
        .fill()
        .map((_, i) => i + 1)
    );
        
      console.log(response.data.data)
      Setuser(response.data.data)
    }catch(error){
      console.log(error)
    }
  }
  const deleteuserdata=async()=>{
    try{
      const response=await axios.delete(USERREC_URL.delete(userid),{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})
      console.log(response)
      handleClose()
      getuserdata()
      toast.success(response.data.message)
    }
    catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    getuserdata(8,1)
  },[])
  const getvaluebyname=(inputname)=>{
    Setnamevalue(inputname.target.value)
    getuserdata(8,1,inputname.target.value)
  }
  const getvaluebyemail=(inputemail)=>{
    Setemailvalue(inputemail.target.value)
    getuserdata(8,1,namevalue,inputemail.target.value)
  }
  const getvaluebycountry=(inputcountry)=>{
    Setcountryvalue(inputcountry.target.value)
    getuserdata(8,1,namevalue,emailvalue,inputcountry.target.value)
  }
  const getkinduser=(userkind)=>{
    const value=parseInt(userkind.target.value);
    if(value==1){
      Setkinduser([1]);
      getuserdata(8,1,namevalue,emailvalue,countryvalue,[value])
    }else{
      Setkinduser([2]);
    }
    getuserdata(8,1,namevalue,emailvalue,countryvalue,[value])
  }
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
      <div className="row">
        <div className="col-md-3">
<input type='text' placeholder='search by name' className='form-control' onChange={getvaluebyname}/>
        </div>
        <div className="col-md-3">
        <input type='text' placeholder='search by email' className='form-control' onChange={getvaluebyemail}/>

        </div>
        <div className="col-md-3">
        <input type='text' placeholder='search by country' className='form-control' onChange={getvaluebycountry}/>

        </div>
        <div className="col-md-3">
          <select className='form-control' onChange={getkinduser}>
            <option value={1}>Group Admin</option>
            <option value={2}>System User</option>
          </select>
        </div>
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
   <nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    {arrayofapge.map((pageno)=>{
      return(
        <li class="page-item" key={pageno} onClick={()=>getuserdata(8,pageno)}><a class="page-link" >{pageno}</a></li>
      )
    })}
    
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
{state=="blocked"&&(
  <div>
    <button className='btn btn-success me-2' onClick={()=>{proceed()}}>proceed</button>
    <button className='btn btn-success'onClick={()=>{reset()}}>cancel</button>
  </div>
)}
    </div>
    </>
  )
}
