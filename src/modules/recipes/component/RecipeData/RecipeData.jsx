import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { GETALL_TAGES } from '../../../../Constants/END_POINTS.JSX'
import NoData from '../../../Shared/component/NoData/NoData'
import { CATEGORIES_URL } from '../../../../Constants/END_POINTS.JSX'

export default function RecipeData() {
    const{register,handleSubmit,formState:{errors}}=useForm()
    const [Categoriesdata,SetCategoriesdata]=useState([])

    const [tags,Settags]=useState([])

    const submitAddrecipe=(data)=>{
        console.log(data)
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
    Getalltags()
},[])

    const navigate=useNavigate()
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

   <button className='btn btn-outline-success p-x m-2'>cancel</button>
   <button className='btn btn-success px-3 m-2'>save</button>
    </form>
   </>
  )
}
