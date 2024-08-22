import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import styles from "/src/modules/Authentication/component/auth.module.css"
import { Emailvalitaion } from '../../../../Constants/VALIDATION.JSX'
import { Passwordvalitaion } from '../../../../Constants/VALIDATION.JSX'
import axios from 'axios'
import { USERS_URL } from '../../../../Constants/END_POINTS.JSX'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const[showpassword,Setshowpassword]=useState(false)
  const navigate=useNavigate()
  const Passwordshown=()=>{
    Setshowpassword(!showpassword)
  }
  const {register,handleSubmit,getValues,formState:{errors}}=useForm()
  const onSubmit = async(data)=>{
    const registerdata=AppendToFormData(data)
    console.log(registerdata)
    navigate("/verify-account")
    try{
      const response=await axios.post(USERS_URL.register,registerdata)
      toast.success(response.data.message)
      
    }catch(error){
      toast.error(error.response.data.message)
    }

  }
  const AppendToFormData=(data)=>{
    const formData = new FormData()
    formData.append("userName",data.userName)
    formData.append("email",data.email)
    formData.append("country",data.country)
    formData.append("phoneNumber",data.phoneNumber)
    formData.append("password",data.password)
    formData.append("confirmPassword",data.confirmPassword)
    formData.append("profileImage",data.profileImage[0])
    return formData
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles["form-header"]}>
        <h3>Register</h3>
        <p className='text-muted'>Welcome Back! Please enter your details</p>
        </div>
        <div className="row">
        <div className="col-md-6">
        <div className="mb-3">
          <div className="input-group flex-nowrap">
  <span className="input-group-text" id="addon-wrapping"><i className="fa-regular fa-user"></i></span>
  <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping"{...register("userName",{
    required:"Username is require",
    maxLength:{value:8,message:"username should be not more than 8"}
  })}/>
</div>
{errors.userName&&<span className='text-danger'>{errors.userName.message}</span>}
</div>
</div>
<div className="col-md-6">
<div className="mb-3">
          <div className="input-group flex-nowrap">
  <span className="input-group-text" id="addon-wrapping"><i className="fa-regular fa-envelope"></i></span>
  <input type="email" className="form-control" placeholder="email" aria-label="email" aria-describedby="addon-wrapping"{...register("email",Emailvalitaion)}/>
</div>
{errors.email&&<span className='text-danger'>{errors.email.message}</span>}
</div>
</div>
</div>
<div className="row">
        <div className="col-md-6">
          <div className="mb-3">
          <div className="input-group flex-nowrap">
  <span className="input-group-text" id="addon-wrapping"><i className="fa-solid fa-earth-americas"></i></span>
  <input type="text" className="form-control" placeholder="country " aria-label="country " aria-describedby="addon-wrapping"{...register("country",{
    required:"country is require",
  })}/>
</div>
{errors.country&&<span className='text-danger'>{errors.country.message}</span>}
</div>
        
</div>
<div className="col-md-6">
<div className="mb-3">
          <div className="input-group flex-nowrap">
  <span className="input-group-text" id="addon-wrapping"><i className="fa-solid fa-mobile-screen-button"></i></span>
  <input type="number" className="form-control" placeholder="phonenumber" aria-label="phonenumber" aria-describedby="addon-wrapping"{...register("phoneNumber",{
    required:"phoneNumber is require",
  })}/>
</div>
{errors.phoneNumber&&<span className='text-danger'>{errors.phoneNumber.message}</span>}
</div>
</div>
</div>
<div className="row">
        <div className="col-md-6">
        <div className="mb-3">
          <div className="input-group flex-nowrap">
  <span className="input-group-text" id="addon-wrapping"><i className="fa-solid fa-key"></i></span>
  <input type={`${showpassword?"password":"text"}`} className="form-control" placeholder="password" aria-label="password" aria-describedby="addon-wrapping"{...register("password",Passwordvalitaion)}/>
  <button onClick={Passwordshown} onMouseDown={(e)=>e.preventDefault()} onMouseUp={(e)=>e.preventDefault()}>
  <span className="input-group-text sr-only" id="addon-wrapping">{`${showpassword?"hidepassword":"showpassword"}`}</span>
  <i className={`fa-solid ${showpassword?"fa-eye":"fa-regular fa-eye-slash"}`}aria-hidden="true"></i>

   

  </button>
</div>
{errors.password &&<span className='text-danger'>{errors.password.message}</span>}
</div>
</div>
<div className="col-md-6">
<div className="mb-3">
          <div className="input-group flex-nowrap">
  <span className="input-group-text" id="addon-wrapping"><i className="fa-solid fa-key"></i></span>
  <input type={`${showpassword?"password":"text"}`} className="form-control" placeholder="ConfirmPassword" aria-label="ConfirmPassword" aria-describedby="addon-wrapping"{...register("confirmPassword",{
    required:"ConfirmPassword is require",
    validate:(value)=>{
      value==getValues("password")||"password is not match"
    }
  })}/>
  <button onClick={Passwordshown} onMouseDown={(e)=>e.preventDefault()} onMouseUp={(e)=>e.preventDefault()}>
  <span className="input-group-text sr-only" id="addon-wrapping">{showpassword ?"show password":"hide password"}</span>

    <i className={`fa-solid ${showpassword ? "fa-eye" : "fa-regular fa-eye-slash"}`}aria-hidden="true">
    </i>
  </button>
</div>
{errors.confirmPassword&&<span className='text-danger'>{errors.confirmPassword.message}</span>}
</div>
</div>
</div>

<div className="row">
        <div className="col-md-12">
        <div className="mb-3">
          <div className="input-group flex-nowrap">
  <span className="input-group-text" id="addon-wrapping"><i className="fa-solid fa-key"></i></span>
  <input type="file" className="form-control" placeholder="uploadImage" aria-label="uploadImage" aria-describedby="addon-wrapping"{...register("profileImage",{
    required:"image is required"
  })}/>

</div>
{errors.profileImage &&<span className='text-danger'>{errors.profileImage.message}</span>}

</div>
</div>

</div>
<div className='text-center'>
<button className='btn btn-success w-75'>register</button>

</div>
      </form>
    </>
  )
}
