
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import AuthLayout from './modules/Shared/component/AuthLayout/AuthLayout'
import Login from './modules/Authentication/component/Login/Login'
import ForgetPass from './modules/Authentication/component/ForgetPass/ForgetPass'
import RestPass from './modules/Authentication/component/RestPass/RestPass'
import Register from './modules/Authentication/component/Register/Register'
import Notfound from'./modules/Shared/component/Notfound/Notfound'
import MasterLayout from './modules/Shared/component/MasterLayout/MasterLayout'
import Home from './modules/Home/component/Home'
import RecipesList from './modules/recipes/component/RecipesList'
import CategoriesList from './modules/Categories/component/CategoriesList'
import UsersList from './modules/Users/component/UsersList/UsersList'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {  useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import ProtectedRoute from './modules/Shared/component/ProtectedRoute/ProtectedRoute'

function App() {
  const[logindata,Setlogindata]=useState(null)
  const savelogindata=()=>{
    const getdata=localStorage.getItem("token")
    const readdata=jwtDecode(getdata);
    console.log(readdata)
    Setlogindata()
    console.log(logindata)
  }
  useEffect(()=>{
    if(localStorage.getItem("token")){
      savelogindata()
    }
  })
  
 const Routes=createBrowserRouter([
  {
    path:"",
    element:<AuthLayout />,
    errorElement:<Notfound />,
    children:[
      {index:true, element:<Login savedata={savelogindata} />},
        {path:'login', element:<Login savedata={savelogindata}/>},
        {path:'forget-password', element:<ForgetPass />},
        {path:'rest-password', element:<RestPass />},
        {path:'register', element:<Register />},
    ] 
      },
      {
        path:"dashboard",
        
        element:<ProtectedRoute>
          <MasterLayout  logindata={logindata}/>
          </ProtectedRoute>,
        errorElement:<Notfound />,
        children:[
          {index:true,element:<Home />},
          {path:'home',element:<Home />},
          {path:"resipesList",element:<RecipesList />},
          {path:"categoriesList",element:<CategoriesList />}, 
          {path:"users",element:<UsersList />}
        ]
      }
    ]
  )
  
  return(
    <>
    <ToastContainer />
    <RouterProvider router={Routes} />
    </>
    
  );
}

export default App
