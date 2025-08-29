import {
  createBrowserRouter,
  
} from "react-router-dom";

import MainLayout from "../Layout/MainLayout";
import SignUp from "../Pages/Authentication/SignUp";
import Login from "../Pages/Authentication/Login";
import SocialLogin from "../Pages/Authentication/SocialLogin";
import CreateBlogs from "../Pages/Blogs/CreateBlogs";
import HomePage from "../Pages/Home/HomePage";
import BlogDetails from "../Pages/Blogs/BlogDetails";
import MyBlogs from "../Pages/Blogs/MyBlogs";
import EditBlog from "../Pages/Blogs/EditBlog";
import LoginRequired from "../Pages/Authentication/LoginRequired";
import AllBlogs from "../Pages/Blogs/AllBlogs";
import ContactForm from "../Pages/Home/ContactForm";
import ErrorPage from "../Pages/Error/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
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
      },
      {
        path: "/loginRequired",
        element: <LoginRequired></LoginRequired>
      },
      {
        path: "/myBlogs",
        element: <MyBlogs></MyBlogs>
      },
      {
        path: "/allBlogs",
        element: <AllBlogs></AllBlogs>
      },
      {
        path: "/edit-blog/:slug",
        element: <EditBlog></EditBlog>
      },
      {
        path: "/blogs/:slug",
        element: <BlogDetails></BlogDetails>
      },
      {
        path: "contactForm",
        element: <ContactForm></ContactForm>
      }
    ]
  },
  {
    
  }
]);