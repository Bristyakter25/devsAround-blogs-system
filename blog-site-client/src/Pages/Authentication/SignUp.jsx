import { useContext} from "react";
import AuthContext from "../../Context/AuthContext";
import Swal from 'sweetalert2';

import SocialLogin from "./SocialLogin";

const SignUp = () => {
     const {createUser,setUser} = useContext(AuthContext);


const handleRegister = e => {
  e.preventDefault();
  const form = e.target;
  const name = form.name.value;
  const email = form.email.value;
  const password = form.password.value;
  console.log(name);

//   firebase authentication
   createUser(email, password)
      .then((result) => {
        const createdUser = result.user;
        setUser(createdUser);


// save to DB
          fetch("http://localhost:5000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password, 
      }),
    })
    .then(res => res.json())
    .then(data => console.log("User saved to DB", data))
    .catch(err => console.error("DB save error:", err));

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "You are Successfully Registered!",
          showConfirmButton: false,
          timer: 1500,
        });
      })
    .catch(error =>{
        console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email Address Already Exist!",
       
      });
    })
};

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
        <form onSubmit={handleRegister} className="mt-6 space-y-4">
            {/* Name */}
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
             Name
            </label>
            <input
              type="text" name="name"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-black focus:border-black outline-none"
              placeholder="Enter your name"
            />
          </div>
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
            Sign Up
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
          Already have an account?{" "}
          <a href="#" className="text-black font-medium hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
