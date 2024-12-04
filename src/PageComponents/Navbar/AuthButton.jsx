const AuthButton = ({ isAuthenticated, onAuthAction }) => (
  <button
    onClick={onAuthAction}
    className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 dark:bg-gray-700 dark:text-white"
  >
    {isAuthenticated ? "Logout" : "Login"}
  </button>
);
export default AuthButton;
