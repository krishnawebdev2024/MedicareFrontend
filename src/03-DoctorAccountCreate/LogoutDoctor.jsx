import React from "react";
import { useDoctorContext } from "../contexts/doctorContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const LogoutDoctor = () => {
  const { logout, loading, error } = useDoctorContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(); // Calls the logout function from context
      navigate("/doctor-login"); // Redirect to doctor login page after successful logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-800 to-purple-700 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-xl transform transition-all duration-300 hover:scale-105">
        {loading ? (
          <motion.p
            className="text-center text-xl font-bold text-indigo-500 dark:text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Logging out...
          </motion.p>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 text-center mb-6">
              Doctor Logout
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
              Are you sure you want to log out?
            </p>
            <motion.button
              onClick={handleLogout}
              className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Confirm Logout
            </motion.button>
          </>
        )}
        {error && (
          <motion.p
            className="mt-4 text-center text-red-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {error}
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default LogoutDoctor;
