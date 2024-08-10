import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from "../../../Authentication/component/auth.module.css"
import { USERS_URL } from '../../../../Constants/END_POINTS.JSX';
import { Emailvalitaion } from '../../../../Constants/VALIDATION.JSX';


export default function ForgetPass() {
  const{register,handleSubmit,formState:{errors,isSubmitting}}=useForm();
  const navigate=useNavigate()

  console.log(useForm())
  const onSubmit=async(data)=>{
    try{
      const response=await axios.post(USERS_URL.resetRequest,data)
      console.log(response.data)
      navigate("/rest-password")
      toast.success(response.data.message||"check your email")
    }catch(error){
      toast.error(error.response.data.message);
    }
  }

  return (
   <>
   <div className={styles["form-header"]}>
   <h3 className='fw-bold'>Forgot Your Password?</h3>
   <p className=' text-muted'>No worries! Please enter your email and we will send a password reset link </p>
   </div>
   
   
          <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group flex-nowrap">
  <span className="input-group-text" id="addon-wrapping"> <i className="fa-solid fa-envelope"></i>
  </span>
  <input type="text" className="form-control" placeholder="Enter your Email" aria-label="email" aria-describedby="addon-wrapping"{...register("email",Emailvalitaion)}/>
  
 
</div>
<div className='py-2'>
  {errors.email&&<p>{errors.email.message}</p>}
  </div>
<button className='btn btn-success w-100 my-5 ' disabled={isSubmitting}>submit</button>
          </form>
         

   </>
           )
}
