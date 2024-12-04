import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { apiUrl } from "../../config/config.js";
const API_URL = apiUrl;

const DoctorRegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "doctor", // Default role for doctors
    image: null,
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Initialize the navigate function
  const navigate = useNavigate();

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (error) setError(null);
  };

  // Handle image file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file,
    });

    // Preview the selected image
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    formDataObj.append("name", formData.name);
    formDataObj.append("email", formData.email);
    formDataObj.append("password", formData.password);
    formDataObj.append("role", formData.role);
    formDataObj.append("image", formData.image);

    try {
      const response = await axios.post(
        `${API_URL}/api/v1/doctors`,
        formDataObj,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      setSuccess("Account created successfully!");
      setError(null);
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "doctor", // Set default role back to doctor after submission
        image: null,
      });
      setImagePreview(null);
      // Navigate to login page after successful account creation
      navigate("/doctor-login");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "An error occurred while creating the account."
      );
      setSuccess(null);
    }
  };

  return (
    <>
      <div className="w-screen overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center py-6 px-[80px] mt-[80px]">
        <div className="bg-[#EFC712] dark:bg-slate-600 w-full h-full rounded-3xl x-overflow-hidden p-8 ">
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-200">
            Doctor RegisterForm
          </h2>
          <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto p-4 space-y-4 bg-white shadow-lg rounded-md"
          >
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

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

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="doctor">Doctor</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Profile Image
              </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* Image Preview */}
            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="Image Preview"
                  className="w-32 h-32 object-cover rounded-md"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Create Account
            </button>
            <div className="mt-4 flex flex-row justify-between items-center space-x-6">
              <Link
                to="/patient-register"
                className="text-blue-600 hover:underline"
              >
                Register as Patient
              </Link>
              <Link
                to="/admin-register"
                className="text-blue-600 hover:underline"
              >
                Register as Admin
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default DoctorRegisterForm;
