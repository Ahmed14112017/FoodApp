import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { GETALL_TAGES } from '../../../../Constants/END_POINTS.JSX'
import NoData from '../../../Shared/component/NoData/NoData'
import { CATEGORIES_URL } from '../../../../Constants/END_POINTS.JSX'
import { RECIPE_URL } from '../../../../Constants/END_POINTS.JSX'
import { toast } from 'react-toastify'

export default function RecipeData() {
    const{register,handleSubmit,getValues,formState:{errors},reset}=useForm()
    const [Categoriesdata,SetCategoriesdata]=useState([])
    // const [addrecipesdata,Setaddrecipesdata]=useState([])

    const [tags,Settags]=useState([])

    const AppendToFormData=(data)=>{
      const formData = new FormData();
      formData.append("name",data.name)
      formData.append("description",data.description)
      formData.append("price",data.price)
      formData.append("tagId",data.tagId)
      formData.append("recipeImage",data.recipeImage[0])
      formData.append("categoriesIds",data.categoriesIds)
      return formData
    }

    const submitAddrecipe=async(data)=>{
        const recipedata=AppendToFormData(data)
        try{
          const response = await axios.post(RECIPE_URL.create, recipedata,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})
          console.log(response.data)
          navigate("/dashboard/resipesList")
          toast.success(response.data.message)
          localStorage.removeItem("recipe-data");

        }catch(error){
          console.log(error.response.data)
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
    }catch(error){
        console.log(error)
    }
}
useEffect(()=>{
  const gettagandcategorys=async()=>{
await  getdata()
await Getalltags()
const stordata=JSON.parse(localStorage.getItem(("recipe-data")))
reset(stordata)
  }
    gettagandcategorys()
   
},[])

    const navigate=useNavigate()
   
    useEffect(()=>{
       const beforeunload=(e)=>{
        e.preventDefault()
        localStorage.setItem("recipe-data",JSON.stringify(getValues()))
       }
       window.addEventListener('beforeunload',beforeunload)
       return()=>{
        window.removeEventListener('beforeunload',beforeunload)
       }
    },[])
  return (
   <>
    <div className='d-flex justify-content-between align-items-center px-2 m-3 'style={{backbroundColor:"#F5F5F5"}}>
    <div className='mx-2'>
    <h4>Fill the <span className='text-success'>Recipes !</span></h4>
    <p className='text-muted'>you can now fill the meals easily using the table and form ,<br></br>
      click here and sill it with the table !</p>
    </div>
      <button  onClick={()=>navigate("/dashboard/resipesList")} className='btn btn-success px-3'>Fill Recipes<i className="fa-solid fa-arrow-right ms-2" aria-hidden="true"></i></button>
   </div>
    <form onSubmit={handleSubmit(submitAddrecipe)}>
    <input type="text" className="form-control"  placeholder="Recipe Name" {...register("name",{required:"name is require"})}/>  
    {errors.name&&<span className='text-danger'>{errors.name.message}</span>} 
    <select className='form-control my-2 '{...register("tagId",{required:"tagId is require"})}>
    <option disabled>select tag</option>

       {tags?tags.map((tag)=>{
        return(
            <option key={tag.id} value={tag.id}>{tag.name}</option>
        )
       }):<NoData/>}
    </select >
    {errors.tagId&&<span className='text-danger'>{errors.tagId.message}</span>} 

    <input type="text" className="form-control"  placeholder="price" {...register("price",{required:"price is require"})}/>   
    {errors.price&&<span className='text-danger'>{errors.price.message}</span>}
    <select className='form-control my-2' {...register("categoriesIds",{required:"categoriesIds is require"})}>
        <option disabled>select category</option>
       {Categoriesdata?Categoriesdata.map((item)=>{
        return(
            <option key={item.id} value={item.id}>{item.name}</option>
        )
       }):<NoData/>}
    </select>
    {errors.categoriesIds&&<span className='text-danger'>{errors.categoriesIds.message}</span>} 

   <textarea placeholder='description' className='form-control my-2'{...register("description",{required:"description  is require"})}>

   </textarea>
   {errors.description&&<span className='text-danger'>{errors.description.message}</span>}

   <input type="file" className="form-control"  placeholder="upload image" {...register("recipeImage",{required:"recipeImage is require"})}/>   
   {errors.recipeImage&&<span className='text-danger'>{errors.recipeImage.message}</span>} 

   <button className='btn btn-outline-success p-x m-2' type='button' onClick={()=>{
    navigate(-1);
    localStorage.removeItem("recipe-data");
    
    }}>cancel</button>
   <button className='btn btn-success px-3 m-2'>save</button>
    </form>
   </>
  )
}
