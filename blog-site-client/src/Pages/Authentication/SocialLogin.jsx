
import { useContext } from "react";
import AuthContext from "../../Context/AuthContext";



const SocialLogin = () => {
  const { signInWithGoogle } = useContext(AuthContext);

  const handleGoogleSignIn = () => {
    signInWithGoogle()
    .then(result =>{
        console.log(result.user);
    })
   .catch(error => {
    console.log(error.message);
   })
  };
  return (
    <div className="w-full dark:text-black mx-auto flex flex-col items-center">

  <button onClick={handleGoogleSignIn} className="w-full border text-black border-gray-300 py-2 rounded-md hover:bg-gray-100 transition">Sign up with Google</button>
</div>
  );
};

export default SocialLogin;
