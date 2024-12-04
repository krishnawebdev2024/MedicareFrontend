import { useAuthContext } from "../contexts/userContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Logout = () => {
  const { logout, loading, error } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(); // Calls the logout function from context
      navigate("/patient-login"); // Redirect to login page after successful logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-700 dark:from-gray-800 dark:to-gray-900">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center"
      >
        {loading ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-lg font-semibold text-gray-800 dark:text-gray-300"
          >
            Logging out...
          </motion.p>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
              Are you sure you want to log out?
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="w-full px-6 py-3 text-lg font-semibold text-white bg-red-500 rounded-md shadow-md hover:bg-red-600 transition-all duration-300 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              Confirm Logout
            </motion.button>
          </div>
        )}

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-4 text-sm font-semibold text-red-500"
          >
            {error}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default Logout;
