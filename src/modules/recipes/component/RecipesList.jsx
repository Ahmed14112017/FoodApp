import React, { useContext, useEffect, useState } from 'react'
import Header from '../../Shared/component/Header/Header'
import recipesimg from "../../../assets/images/recipes-photo.svg"
import { RECIPE_URL } from '../../../Constants/END_POINTS.JSX'
import { IMAGE_URL } from '../../../Constants/END_POINTS.JSX'
import axios from 'axios'
import NoData from '../../Shared/component/NoData/NoData'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DeleteConfirmation from '../../Shared/component/DeleteConfirmation/DeleteConfirmation'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import {CATEGORIES_URL,GETALL_TAGES} from"/src/Constants/END_POINTS.JSX"
import { Authcontext } from '../../../Authcontext/Authcontext'
import { USERRECIPEFAV_url } from '../../../Constants/END_POINTS.JSX'

export default function RecipesList() {
  const {logindata}=useContext(Authcontext)
  const navigate=useNavigate()
  const [recipes, setRecipes] = useState([])
  const [show, setShow] = useState(false);
  const [recipesid,Setrecipesid]=useState(0)
  const [Arrayofpage, SetArrayofpage] = useState([]);
  const [Categoriesdata,SetCategoriesdata]=useState([])
  const [tags,Settags]=useState([])
  const [namevalue,Setnamevalue]=useState("")
  const [tagvalue,Settagvalue]=useState("")
  const [categoryvalue,Setcategoryvalue]=useState("")




  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    Setrecipesid(id)
    setShow(true);
  };
  const getrecipesitem=async(pageS,pageNo,nameinput,tagid,categoryid )=>{
    try{
      const response = await axios.get(RECIPE_URL.getlist,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`},
      params:{pageSize:pageS,pageNumber:pageNo,name:nameinput,tagId:tagid,categoriesIds:categoryid}
    });
    setRecipes(response.data.data)
    SetArrayofpage(Array(response.data.totalNumberOfPages).fill().map((_,i)=>i+1))
      console.log(response.data.data)
      console.log(Arrayofpage)
    }
    catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    getrecipesitem(3,1,"")
    getdata()
   Getalltags()
    
  },[])

  const DeleteRecipeItem=async()=>{
    try{
      const response=await axios.delete(RECIPE_URL.delete(recipesid),{headers:{Authorization:`Bearer${localStorage.getItem("token")}`}})
      console.log(response.data.data)
      toast.success("item is deleted successfully")
      handleClose()
      getrecipesitem()
    }
    catch(error){
console.log(error)
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
  const Getalltags=async()=>{
    try{
        const response=await axios.get(GETALL_TAGES,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})
        console.log(response.data)
        Settags(response.data)
        console.log(tags)
    }catch(error){
        console.log(error)
    }
}
const getvaluebyname=(inputname)=>{
  Setnamevalue(inputname.target.value)
  getrecipesitem(3,1,inputname.target.value,tagvalue,categoryvalue)

}
const getvaluebytag=(tagid)=>{
  Settagvalue(tagid.target.value)
  getrecipesitem(3,1,namevalue,tagid.target.value,categoryvalue)

}
const getvaluebycategory=(categoryid)=>{
  Setcategoryvalue(categoryid.target.value)
  getrecipesitem(3,1,namevalue,tagvalue,categoryid.target.value)

}
const addtofavorite=async(id)=>{
  try{
    const response=await axios.post(USERRECIPEFAV_url.addfavorites,{recipeId:id},{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})
    console.log(response)
    toast.success("item is added to favorite successfully")
    
  }
  catch(error){
console.log(error)
  }
}

  return (
    <div>
     <Header
      title={"Recipes Items"}
     description={"You can now add your items that any user can order it from the Application and you can edit"} 
    image={recipesimg}
     />
      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton >
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <DeleteConfirmation deleteitem="Recipe"/>
        <Modal.Footer>
          <Button variant="danger" onClick={DeleteRecipeItem}>
            delete this item
          </Button>
        </Modal.Footer>
      </Modal>
     <div className="title p-3 d-flex justify-content-between align-items-center">
      <div className="title-info">
      <h3>Recipe Table Details</h3>
      <span>You can check all details</span>
      </div>
      {logindata?.userGroup!=="SystemUser"?(<button className="btn btn-success" onClick={()=>navigate("/dashboard/Recipe-data")}>Add New item</button>
):""}
   </div>
   <div className="row">
    <div className="col-md-6">
    <input type='text' placeholder='search by name' className='form-control' onChange={getvaluebyname}/>
    </div>
   
    <div className="col-md-3">
    <select className='form-control' onChange={getvaluebytag} >
        <option >select tages</option>
       {tags?tags.map((item)=>{
        return(
            <option key={item.id} value={item.id}>{item.name}</option>
        )
       }):<NoData/>}
    </select>
    </div>
    <div className="col-md-3">
    <select className='form-control' onChange={getvaluebycategory}>
        <option >select category</option>
       {Categoriesdata?Categoriesdata.map((item)=>{
        return(
            <option key={item.id} value={item.id} >{item.name}</option>
        )
       }):<NoData/>}
    </select>
    </div>
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
    {recipes?recipes.map((item)=>{
      return(
        <tr key={item.id}>
          <td> {item.name} </td>
          <td> {item.imagePath?<img className='image-list' src={`${IMAGE_URL}/${item.imagePath}`}/>:<img className='image-list' src="\src\assets\images\ask-for-insure.svg" />} </td>
          <td> {item.price} </td>
          <td> {item.description} </td>
          <td> {item.tag.name} </td>
          {logindata?.userGroup!=="SystemUser"?(<td className=''> 
          <i className='fa fa-edit text-warning mx-3' ></i>
          <i className='fa fa-trash text-danger' onClick={()=>handleShow(item.id)}></i>
            </td>):(<td className=''> 
          <i onClick={()=>addtofavorite(item.id)} className='fa fa-heart text-danger mx-3' ></i>
            </td>)}
          
          
          </tr>
          
      )
    }):<NoData/>}
    
    
  </tbody>
</table>
   </div>
   <nav aria-label="Page navigation example">
  <ul className="pagination">
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    {Arrayofpage.map((pageno) => (
            <li className="page-item" key={pageno} onClick={() => getrecipesitem(3, pageno)}>
              <a className="page-link" href="#">{pageno}</a>
            </li>
          ))}
   
   
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
    </div>
  )
}
