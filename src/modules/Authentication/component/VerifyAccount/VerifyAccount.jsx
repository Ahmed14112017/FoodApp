import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Emailvalitaion } from '../../../../Constants/VALIDATION.JSX';
import styles from "/src/modules/Authentication/component/auth.module.css"
import axios from 'axios';
import { toast } from 'react-toastify';
import { USERS_URL } from '../../../../Constants/END_POINTS.JSX';
export default function VerifyAccount() {
    const navigate=useNavigate()
  const {
    register,
    handleSubmit,
    formState:{errors},
  }=useForm();
  const onSubmit = async(data)=>{
    try{    
        const response=await axios.put(USERS_URL.verify,data)
        console.log(response)
        toast.success(response.data.message)
        navigate("/login")

    }catch(error){
        console.log(error)
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles["form-header"]}>
        <h3>Verfiy Account</h3>
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
      <input type="text"className="form-control" placeholder="Enter Your verify code" {...register("code",{
        required:"verify code is required",
      })}/>
  </div>
  {errors.code&&<p className='text-danger'>{errors.code.message}</p>}
  
  <button type='submit' className='btn btn-success w-100' >verify</button>
      </form>
    </>
  )
}
