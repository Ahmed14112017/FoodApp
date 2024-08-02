import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


export default function RestPass() {
  const{register,handleSubmit,formState:{errors}}=useForm()
  const Navigate=useNavigate()
  console.log(register)
  
 
  const onSubmit=async(data)=>{
    try{
      const response=await axios.post("https://upskilling-egypt.com:3006/api/v1/Users/Reset",data)
      
      console.log(response.data)
      Navigate("/login")
      toast.success("password is successfully updated")
      

    }catch(error){
      toast.error(error.response?.data?.message || "An error occurred. Please try again.")
    }
    
   

  }
  return (
    <div className='auth-container vh-100'>
      <div className="container-fluid bg-overlay">
    <div className="row justify-content-center align-items-center vh-100">
<div className="col-md-5 bg-white p-4">
    <img src='src\assets\images\login-photo.svg' />
    <h2 className='fw-bold pb-2'> Reset  Password</h2>
    <p className='text-muted'>Please Enter Your Otp  or Check Your Inbox</p>
    <form onSubmit={handleSubmit(onSubmit)}>
    <div class="input-group flex-nowrap pb-3">
  <span class="input-group-text" id="addon-wrapping"><i className="fa-solid fa-envelope"></i>
  </span>
  <input type="text" class="form-control" placeholder="Enter your Email" aria-label="Enter your Email" aria-describedby="addon-wrapping" {...register("email",{
    required:"Email is require",
    pattern:{
      value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message:"invalid Email"
    }
  })}/>
  {errors.email&&<p>{errors.email.message}</p>}
  </div>
  <div class="input-group flex-nowrap pb-3">
  <span class="input-group-text" id="addon-wrapping"><i class="fa-solid fa-key"></i>
  </span>
  <input type="seed" class="form-control" placeholder="OTP" aria-label="OTP" aria-describedby="addon-wrapping"{...register("seed",{
    required:"OTP is require",
    
  })}/>
  {errors.seed&&<p>{errors.seed.message}</p>}
  </div>
  <div class="input-group flex-nowrap  pb-3">
  <span class="input-group-text" id="addon-wrapping"><i class="fa-solid fa-lock"></i>
  </span>
  <input type="password" class="form-control" placeholder="New Password" aria-label="New Password" aria-describedby="addon-wrapping"{...register("password",{
    required:"Password is require",
  })}/>
  {errors.password&&<p>{errors.password[0]}</p>}
  </div>
  <div class="input-group flex-nowrap  pb-3">
  <span class="input-group-text" id="addon-wrapping pt-3"><i class="fa-solid fa-lock"></i>
  </span>
  <input type="password" class="form-control" placeholder="Confirm your password" aria-label="confirm your password" aria-describedby="addon-wrapping"{...register("confirmPassword",{
    required:"Confirm Password is require",
    
    
  })}/>
  {errors.confirmPassword&&<p>{errors.confirmPassword.message}</p>}
  </div>
  <button type="submit" class="btn btn-success w-100">Rest Password</button>
    </form>
</div>
    </div>
      </div>
      
    </div>
  )
}
