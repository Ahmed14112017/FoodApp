import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { USERS_URL } from '../../../../Constants/END_POINTS.JSX'
import { Emailvalitaion } from '../../../../Constants/VALIDATION.JSX'
import { Passwordvalitaion } from '../../../../Constants/VALIDATION.JSX';


export default function RestPass() {
  const{register,handleSubmit,getValues,formState:{errors,isSubmitting}}=useForm()
  const Navigate=useNavigate()
  console.log(register)
  
 
  const onSubmit=async(data)=>{
    try{
      const response=await axios.post(USERS_URL.reset,data)
      
      console.log(response.data)
      Navigate("/login")
      toast.success("password is successfully updated")
      

    }catch(error){
      toast.error(error.response?.data?.message || "An error occurred. Please try again.")
    }
    
   
  }
  const [Passwordvisibel,Setpasswordvisibel]=useState(false)
  return (
    <>
    <h2 className='fw-bold pb-2'> Reset  Password</h2>
    <p className='text-muted'>Please Enter Your Otp  or Check Your Inbox</p>
    <form onSubmit={handleSubmit(onSubmit)}>
    <div className="input-group flex-nowrap pb-2">
  <span className="input-group-text" id="addon-wrapping"><i className="fa-solid fa-envelope"></i>
  </span>
  <input type="text" className="form-control" placeholder="Enter your Email" aria-label="Enter your Email" aria-describedby="addon-wrapping" {...register("email",Emailvalitaion)}/>
  </div>
  {errors.email&&<p>{errors.email.message}</p>}

  <div className="input-group flex-nowrap pb-2">
  <span className="input-group-text" id="addon-wrapping"><i className="fa-solid fa-key"></i>
  </span>
  <input type="seed" className="form-control" placeholder="OTP" aria-label="OTP" aria-describedby="addon-wrapping"{...register("seed",{
    required:"OTP is require",
    
  })}/>
  </div>
  {errors.seed&&<p>{errors.seed.message}</p>}

  <div className="input-group flex-nowrap  pb-2">
  <span className="input-group-text" id="addon-wrapping">
    <i className="fa-solid fa-lock"></i>
  </span>
  <input type={Passwordvisibel?"text":"password"} className="form-control" placeholder="New Password" aria-label="New Password" aria-describedby="addon-wrapping"{...register("password",Passwordvalitaion
  )}/>
  <button type='button' onMouseDown={(e)=>e.preventDefault()} onMouseUp={(e)=>e.preventDefault()} onClick={()=>Setpasswordvisibel((prevstate)=>!prevstate)}>
  <span className='sr-only'>{Passwordvisibel?"show password":"hide password"}</span>

    <i className={`fa-solid ${Passwordvisibel ?"fa-eye" : "fa-regular fa-eye-slash"}`}aria-hidden="true">
      </i>
      </button>

  </div>
  {errors.password&&<p>{errors.password.message}</p>}
  
  

  <div className="input-group flex-nowrap  pb-2">
  <span  className="input-group-text" id="addon-wrapping pt-3"><i className="fa-solid fa-lock"></i>
  </span>
  <input type={Passwordvisibel?"text":"password"} className="form-control" placeholder="Confirm your password" aria-label="confirm your password" aria-describedby="addon-wrapping"{...register("confirmPassword",{
    required:"Confirm Password is require",
    validate:(value)=>
      value ==getValues("password")||"password is not match"
    
    
  })}/>
  <button onMouseDown={(e)=>e.preventDefault()} onMouseUp={(e)=>e.preventDefault()} onClick={()=>Setpasswordvisibel((prevstate)=>!prevstate)} className="input-group-text" id="addon-wrapping pt-3"type='button'>
  <span className='sr-only'>{Passwordvisibel?"show password":"hide password"}</span>

    <i  className={`fa-solid ${Passwordvisibel ? "fa-eye" : "fa-regular fa-eye-slash"}`}aria-hidden="true">
      </i>
      </button>
  </div>
  {errors.confirmPassword&&<p>{errors.confirmPassword.message}</p>}

  <button type="submit" className="btn btn-success w-100"disabled={isSubmitting}>Rest Password</button>
    </form>
    </>
    

  )
}
