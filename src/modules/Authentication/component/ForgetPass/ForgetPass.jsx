import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ForgetPass() {
  const{register,handleSubmit,formState:{errors}}=useForm();
  const navigate=useNavigate()

  console.log(useForm())
  const onSubmit=async(data)=>{
    try{
      const response=await axios.post("https://upskilling-egypt.com:3006/api/v1/Users/Reset/Request",data)
      console.log(response.data)
      navigate("/restpass")
      toast.success("check your email")
    }catch(error){
      toast.error(error.response.data.message);
    }
  }

  return (
    <div className='auth-container vh-100'>
      <div className="container-fluid bg-overlay ">
        <div className="row justify-content-center align-items-center vh-100">
        <div className=" col-md-5 bg-white py-5 px-3 rounded rounded-3">
          <img src='src\assets\images\login-photo.svg' alt='authphoto' />
          <p className='fw-bold'>Forgot Your Password?</p>
          <p className=' text-muted'>No worries! Please enter your email and we will send a password reset link </p>
          <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group flex-nowrap">
  <span className="input-group-text" id="addon-wrapping"> <i className="fa-solid fa-envelope"></i>
  </span>
  <input type="text" className="form-control" placeholder="Enter your Email" aria-label="email" aria-describedby="addon-wrapping"{...register("email",{
    required:"Email is require",
    pattern:{
      value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message:"invalid email"
    }

  })}/>
  
 
</div>
<div className='py-2'>
  {errors.email&&<p>{errors.email.message}</p>}
  </div>
<button className='btn btn-success w-100 my-5 '>submit</button>
          </form>
          </div>
        </div>
       
      </div>
    </div>
  )
}
