import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "../contexts/userContext"; // Import the useAuthContext hook

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  // Use the context's login function
  const { login, error: contextError, loading, user } = useAuthContext();

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (error) setError(null);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call the login function from context
      const loggedInUser = await login(formData.email, formData.password);
      console.log("Logged-in User:", loggedInUser); // Debugging line to check user

      if (loggedInUser) {
        setSuccess("Login successful!");
        setError(null);
        console.log("Navigating to patient dashboard...");
        navigate("/patientdashboard"); // Navigate after successful login
      }
    } catch (error) {
      setError(contextError || "Login failed. Please try again.");
      setSuccess(null);
    }
  };

  return (
    <div className="w-screen overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center py-6 px-[80px] mt-[80px]">
      <div className="bg-[#EFC712] dark:bg-slate-600 w-full h-full rounded-3xl overflow-hidden p-8">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-200">
          Patient Login
        </h2>
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto p-4 space-y-4 bg-white shadow-lg rounded-md"
          aria-live="polite" // Accessibility for live messages
        >
          {error && (
            <div className="text-red-500 font-semibold">
              <p>{error}</p>
            </div>
          )}
          {success && (
            <div className="text-green-500 font-semibold">
              <p>{success}</p>
            </div>
          )}
          {loading && (
            <div className="text-blue-500 font-semibold">
              <p>Loading...</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full btn btn-primary mt-4"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="mt-4 text-center">
            <span className="text-sm text-gray-500">
              Don't have an account?
            </span>
            <Link
              to="/patient-register"
              className="ml-2 text-blue-500 hover:underline"
            >
              Register
            </Link>
          </div>
          {/* Added links for Doctor and Admin login */}

          <div className="mt-4 flex flex-row justify-between items-center space-x-6">
            <Link to="/doctor-login" className="text-blue-600 hover:underline">
              Login as Doctor
            </Link>
            <Link to="/admin-login" className="text-blue-600 hover:underline">
              Login as Admin
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
