import {
  createBrowserRouter,
  
} from "react-router-dom";

import MainLayout from "../Layout/MainLayout";
import SignUp from "../Pages/Authentication/SignUp";
import Login from "../Pages/Authentication/Login";
import SocialLogin from "../Pages/Authentication/SocialLogin";
import CreateBlogs from "../Pages/Blogs/CreateBlogs";
import HomePage from "../Pages/Home/HomePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children:[
      {
        path:"/",
        element: <HomePage></HomePage>

      },
      {
        path:"/signIn",
        element: <Login></Login>
      },
      {
        path:"/signUp",
        element:<SignUp></SignUp>
      },
      {
        path: "/socialLogin",
        element: <SocialLogin></SocialLogin>
      },
      {
        path: "/createBlogs",
        element: <CreateBlogs></CreateBlogs>
      }
    ]
  },
  {
    
  }
]);