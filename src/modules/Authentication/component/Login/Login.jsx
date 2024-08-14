import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import styles from "/src/modules/Authentication/component/auth.module.css"
import { Emailvalitaion } from '../../../../Constants/VALIDATION.JSX';

export default function Login({savedata}) {
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
      localStorage.setItem("token",response.data.token)
      savedata()
      navigate("/dashboard");
      toast.success("log in successfully")
      
    }
    catch(error){
      toast.error(error.response.data.message);
    }
  }
  const [Passwordvisibel,Setpasswordvisibel]=useState(false)
  
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles["form-header"]}>
        <h3>Log In</h3>
        <p className='text-muted'>Welcome Back! Please enter your details</p>
        </div>
      <div className="input-group py-2">
      <div className="input-group-text">
      <i className="fa-solid fa-envelope"></i>
        </div>
      <input type="text" className="form-control"  placeholder="Enter your email" {...register("email",Emailvalitaion)
      }/>

  </div>
  {errors.email&&<p className='text-danger'>{errors.email.message}</p>}

  <div className="input-group py-2">
      <span className="input-group-text">
      <i className="fa-solid fa-key"></i>
        </span>
      <input type={Passwordvisibel?"password":"text"} className="form-control" placeholder="Password" {...register("password",{
        required:"Password is required",
      })}/>
      <button onMouseUp={(e)=>e.preventDefault()} onMouseDown={(e)=>e.preventDefault()} type='button' className="input-group-text" onClick={()=>Setpasswordvisibel((prevstate)=>!prevstate)}>
        <span className='sr-only'>{Passwordvisibel?"show password":"hide password"}</span>
      <i className={`fa-solid ${Passwordvisibel ? "fa-eye" : "fa-regular fa-eye-slash"}`} aria-hidden="true"></i>
      </button>
  </div>
  {errors.password&&<p className='text-danger'>{errors.password.message}</p>}
  <div className='d-flex justify-content-between py-2'>
    <Link to="/register" className='text-decoration-none text-muted'>Register Now ?</Link>
    <Link  to="/forget-password"className='text-decoration-none text-success'>Forget Pasword ?</Link>
  </div>
  <button type='submit' className='btn btn-success w-100' >Log in</button>
      </form>
    </>
      
   
  )
}
