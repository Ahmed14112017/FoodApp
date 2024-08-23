import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import AuthLayout from './modules/Shared/component/AuthLayout/AuthLayout';
import Login from './modules/Authentication/component/Login/Login';
import ForgetPass from './modules/Authentication/component/ForgetPass/ForgetPass';
import RestPass from './modules/Authentication/component/RestPass/RestPass';
import Register from './modules/Authentication/component/Register/Register';
import Notfound from './modules/Shared/component/Notfound/Notfound';
import MasterLayout from './modules/Shared/component/MasterLayout/MasterLayout';
import Home from './modules/Home/component/Home';
import RecipesList from './modules/recipes/component/RecipesList';
import CategoriesList from './modules/Categories/component/CategoriesList';
import UsersList from './modules/Users/component/UsersList/UsersList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ProtectedRoute from './modules/Shared/component/ProtectedRoute/ProtectedRoute';
import RecipeData from './modules/recipes/component/RecipeData/RecipeData';
import VerifyAccount from './modules/Authentication/component/VerifyAccount/VerifyAccount';
import Favorites from './modules/recipes/component/Favorites/Favorites';

function App() {
  

  const Routes = createHashRouter([
    {
      path: "",
      element: <AuthLayout />,
      errorElement: <Notfound />,
      children: [
        { index: true, element: <Login/> },
        { path: 'login', element: <Login/> },
        { path: 'forget-password', element: <ForgetPass /> },
        { path: 'rest-password', element: <RestPass /> },
        { path: 'register', element: <Register /> },
        { path: 'verify-account', element: <VerifyAccount /> },
      ]
    },
    {
      path: "dashboard",
      element: (
        <ProtectedRoute>
          <MasterLayout/>
        </ProtectedRoute>
      ),
      errorElement: <Notfound />,
      children: [
        { index: true, element: <Home /> },
        { path: 'home', element: <Home /> },
        { path: "resipesList", element: <RecipesList /> },
        { path: "Recipe-data", element: <RecipeData /> },
        { path: "categoriesList", element: <CategoriesList /> },
        { path: "favorites", element: <Favorites /> },
        { path: "users", element: <UsersList /> }
      ]
    }
  ]);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={Routes} />
    </>
  );
}

export default App;
