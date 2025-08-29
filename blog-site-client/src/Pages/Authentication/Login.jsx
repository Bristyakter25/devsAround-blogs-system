import { useContext } from "react";
import AuthContext from "../../Context/AuthContext";
import Swal from 'sweetalert2';

import SocialLogin from "./SocialLogin";
import { Link } from "react-router-dom";

const Login = () => {
const {signInUser} = useContext(AuthContext);
    const handleSignIn = e =>{
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email,password);
     signInUser(email,password)
        .then(result =>{
          console.log('sign in',result.user)
          Swal.fire({
            title: "SuccessFully Signed In!",
            icon: "success",
            draggable: true
          });
        })
        .catch(error=>{
            console.log(error);
         Swal.fire({
                 icon: "error",
                 title: "Oops...",
                 text: "Something went Wrong!!!",
                
               });;
        })
    }
    return (
       <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md border border-gray-200">
        {/* Heading */}
        <h1 className="text-2xl font-bold text-gray-900 text-center">
          Join DevsAround
        </h1>
        <p className="text-sm text-gray-500 text-center mt-1">
          Create an account to start reading & writing
        </p>

        {/* Form */}
        <form onSubmit={handleSignIn} className="mt-6 space-y-4">
           
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email" name="email"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-black focus:border-black outline-none"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password" name="password"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-black focus:border-black outline-none"
              placeholder="Enter your password"
            />
          </div>

          

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md font-medium hover:bg-gray-800 transition"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-1 border-gray-300" />
          <span className="px-2 text-gray-500 text-sm">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Social Login */}
        <div className="space-y-3">
       
           <SocialLogin></SocialLogin>
         
        
          
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          New Here?{" "}
          <Link to="/signUp" className="font-bold text-black">Join Us</Link> 
        </p>
      </div>
    </div>
    );
};


export default Login;