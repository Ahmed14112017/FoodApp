
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
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';




  








function App() {
 const Routes=createBrowserRouter([
  {
    path:"",
    element:<AuthLayout />,
    errorElement:<Notfound />,
    children:[
      {index:true, element:<Login />},
        {path:'login', element:<Login />},
        {path:'forgetpass', element:<ForgetPass />},
        {path:'restpass', element:<RestPass />},
        {path:'register', element:<Register />},
    ] 
      },
      {
        path:"dashboard",
        element:<MasterLayout />,
        errorElement:<Notfound />,
        children:[
          {index:true,element:<Home />},
          {path:'home',element:<Home />},
          {path:"resipesList",element:<RecipesList />},
          {path:"categoriesList",element:<CategoriesList />}, 
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
