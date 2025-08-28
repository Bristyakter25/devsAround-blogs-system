import {
  createBrowserRouter,
  
} from "react-router-dom";

import MainLayout from "../Layout/MainLayout";
import SignUp from "../Pages/Authentication/SignUp";
import Login from "../Pages/Authentication/Login";
import SocialLogin from "../Pages/Authentication/SocialLogin";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children:[
      {
        path:"/login",
        element: <Login></Login>
      },
      {
        path:"/signUp",
        element:<SignUp></SignUp>
      },
      {
        path: "/socialLogin",
        element: <SocialLogin></SocialLogin>
      }
    ]
  },
  {
    
  }
]);