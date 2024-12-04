import { useAdminContext } from "../contexts/adminContext";
import { useNavigate } from "react-router-dom";

const LogoutAdmin = () => {
  const { logout, loading, error } = useAdminContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(); // Calls the logout function from context
      navigate("/admin-login"); // Redirect to admin login page after successful logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-full max-w-md">
        {loading ? (
          <p className="text-center text-xl text-gray-300">Logging out...</p> // Show loading text while logging out
        ) : (
          <div className="text-center">
            <p className="text-lg mb-4 text-gray-300">
              Are you sure you want to log out?
            </p>
            <button
              onClick={handleLogout}
              className="w-full px-6 py-3 rounded-md font-bold text-white bg-blue-500 hover:bg-blue-600 
              dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300 shadow-md transition-all duration-300 ease-in-out"
            >
              Yes, Log me out
            </button>
          </div>
        )}
        {error && <p className="text-center text-red-500 mt-4">{error}</p>}{" "}
        {/* Display error if it occurs */}
      </div>
    </div>
  );
};

export default LogoutAdmin;
