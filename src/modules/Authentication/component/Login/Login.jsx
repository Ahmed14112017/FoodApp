import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

export default function Login() {
const navigate=useNavigate()
  const {
    register,
    handleSubmit,
    formState:{errors},
  }=useForm();
  const onSubmit= async(data)=>{

    try{
      let response=await axios.post("https://upskilling-egypt.com:3006/api/v1/Users/Login",data)
      console.log(response)
      navigate("/dashboard");
      toast.success("log in successfully")
      
    }
    catch(error){
      toast.error(error.response.data.message);
    }
  }
  
  return (
    <div className='auth-container'>
<div className="container-fluid bg-overlay">
  <div className="row justify-content-center align-items-center vh-100">
    <div className="col-md-5 bg-white p-3 rounded rounded-3 px-5">
      <div>
      <div>
      <img src="\src\assets\images\login-photo.svg" alt="login-photo"  />
    </div>
    <div>
      <h2>Log In</h2>
      <p className='text-muted'>Welcome Back! Please enter your details</p>
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="input-group py-4">
      <div className="input-group-text">
      <i className="fa-solid fa-envelope"></i>
        </div>
      <input type="text" className="form-control"  placeholder="Enter your email" {...register("email",{
        required:"Email is require",
        pattern:{
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message:"Invalid email",
        },
      })}/>
      
  </div>
  {errors.email&&<p className='text-danger'>{errors.email.message}</p>}
  <div className="input-group">
      <div className="input-group-text">
      <i className="fa-solid fa-key"></i>
        </div>
      <input type="password" className="form-control" placeholder="Password" {...register("password",{
        required:"Password is required",
      })}/>
      
  </div>
  {errors.password&&<p className='text-danger'>{errors.password.message}</p>}
  <div className='d-flex justify-content-between py-2'>
    <Link  className='text-decoration-none text-muted'>Register Now ?</Link>
    <Link  to="/forgetpass"className='text-decoration-none text-success'>Forget Pasword ?</Link>
  </div>
  <button type='submit' className='btn btn-success w-100' >Log in</button>
      </form>
    </div>
      </div>
    
    </div>
  </div>
</div>
      
    </div>
  )
}
