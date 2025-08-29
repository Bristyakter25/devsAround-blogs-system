import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const LoginRequired = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white/80 backdrop-blur-md p-10 rounded-3xl shadow-2xl text-center max-w-md"
      >
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-3xl font-extrabold text-black mb-4 drop-shadow-sm"
        >
          🔒 Login Required
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-8 text-gray-700 text-lg"
        >
          To access this page, please log in to your account.
        </motion.p>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/signIn"
            className="bg-black text-white px-6 py-3 rounded-xl shadow-md hover:shadow-xl transition duration-300 font-medium"
          >
            Go to Login
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginRequired;
