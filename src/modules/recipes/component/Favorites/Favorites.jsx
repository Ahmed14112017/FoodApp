import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { USERRECIPEFAV_url } from '../../../../Constants/END_POINTS.JSX'
import NoData from '../../../Shared/component/NoData/NoData'
import Header from '../../../Shared/component/Header/Header'
import favoriteimg from"/src/assets/images/recipes-photo.svg"
import { IMAGE_URL } from '../../../../Constants/END_POINTS.JSX'
import { toast } from 'react-toastify'

export default function Favorites() {
    const [favlist,Setfavlist]=useState([])
    const getfavlist=async()=>{
        try{
            const respones=await axios.get(USERRECIPEFAV_url.getlist,{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})
            console.log(respones)
            Setfavlist(respones.data.data)
            console.log(favlist)
        }
        catch(error){
            console.log(error)
        }
       
    }
    useEffect(()=>{
        getfavlist();
    },[])
    const removefromfavorite=async(id)=>{
        try{
            const response=await axios.delete(USERRECIPEFAV_url.delete(id),{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})
            console.log(response)
            getfavlist()
            toast.success("item is removed successfully")
        }
        catch(error){
      console.log(error)
        }
      }
  return (
    <>
       <Header 
      title={"Favorite Item"}
      image={favoriteimg}
      description={"You can now add your items that any user can order it from the Application and you can edit"}
      />
      
      
      {favlist.length > 0 ? (
        <div className='container'>
            <div className="row">
                
                    {favlist.map((favitem)=>{
                        return(
                            <div key={favitem.id} className="col-md-4 my-3">
                                <div className="recipe">
                                   {favitem.recipe.imagePath?<img className='image-list' src={`${IMAGE_URL}/${favitem.recipe.imagePath}`}/>:<img className='image-list' src="\src\assets\images\ask-for-insure.svg" />}
                                    <h3>{favitem.recipe.name}</h3>
                                    <p>{favitem.recipe.description}</p>
                                    <button className='btn btn-outline-danger' onClick={()=>removefromfavorite(favitem.id)}>removefromfavorite</button>
                                </div>

                            </div> 
                        )
                    })}
                </div>
            </div>
        
      ):<NoData/>}
    </>
  )
}
