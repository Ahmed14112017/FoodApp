import React, { useEffect, useState } from 'react'
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
export default function RecipesList() {
  const [recipes, setRecipes] = useState([])
  const [show, setShow] = useState(false);
  const [recipesid,Setrecipesid]=useState(0)

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    Setrecipesid(id)
    setShow(true);
  };
  const getrecipesitem=async()=>{
    try{
      const response = await axios.get(RECIPE_URL.getlist,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})
      setRecipes(response.data.data)
      console.log(response.data.data)
    }
    catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    getrecipesitem()
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
     <div className="title p-3 d-flex justify-content-between">
      <div className="title-info">
      <h3>Recipe Table Details</h3>
      <span>You can check all details</span>
      </div>
   <button className="btn btn-success">Add New item</button>
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
  )
}
