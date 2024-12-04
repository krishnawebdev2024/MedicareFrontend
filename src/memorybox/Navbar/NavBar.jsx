import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../../assets/Logo.png";
import DashboardLink from "./DashboardLink";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const checkAuthStatus = () => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));
    setIsAuthenticated(!!token);
  };

  // Check auth status on mount and whenever cookies change
  useEffect(() => {
    checkAuthStatus();
  }, [document.cookie]);

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }

    // Handle outside clicks for dropdown
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  // Handle login/logout button action
  const handleAuthButtonClick = async () => {
    if (isAuthenticated) {
      // Logout the user
      try {
        await axios.post("http://localhost:3000/api/v1/users/logout", null, {
          withCredentials: true,
        });
        document.cookie = "token=; Max-Age=0"; // Clear the token
        setIsAuthenticated(false);
        navigate("/about"); // Redirect after logout
      } catch (error) {
        console.error("Logout failed:", error);
      }
    } else {
      // Redirect to login page
      navigate("/patient-login");
    }
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-blue-600 dark:bg-gray-800 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-bold" onClick={closeMobileMenu}>
          <div className="flex items-center">
            <img src={Logo} alt="Logo" className="w-12 h-12" />
            <p className="text-white">Medicare</p>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="hover:text-gray-300">
            Home
          </Link>

          <Link to="/about" className="hover:text-gray-300">
            About Us
          </Link>
          <Link to="/services" className="hover:text-gray-300">
            Services
          </Link>
          <Link to="/contact" className="hover:text-gray-300">
            Contact
          </Link>
          <Link
            to="/corona"
            className="text-sm md:text-base font-medium text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300"
          >
            COVID-19 Info
          </Link>
        </div>

        {/* Dark Mode Toggle Button */}
        <button
          onClick={toggleDarkMode}
          className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-md"
        >
          {isDarkMode ? "🌙 Dark" : "☀️ Light"}
        </button>

        {/* Dashboard Link */}
        <div className=" pb-4">
          <DashboardLink />
        </div>

        {/* Auth Button */}
        <div className="hidden md:flex space-x-4 items-center">
          <button
            onClick={handleAuthButtonClick}
            className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
          >
            {isAuthenticated ? "Logout" : "Login"}
          </button>
          {!isAuthenticated && (
            <Link
              to="/patient-register"
              className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
            >
              Patient Sign Up
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden flex items-center"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-blue-600 dark:bg-gray-800">
          <Link
            to="/"
            className="block px-4 py-2 hover:bg-blue-700 dark:hover:bg-gray-700"
            onClick={closeMobileMenu}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block px-4 py-2 hover:bg-blue-700 dark:hover:bg-gray-700"
            onClick={closeMobileMenu}
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="block px-4 py-2 hover:bg-blue-700 dark:hover:bg-gray-700"
            onClick={closeMobileMenu}
          >
            Contact
          </Link>

          <Link
            to="/services"
            className="block px-4 py-2 hover:bg-blue-700 dark:hover:bg-gray-700"
            onClick={closeMobileMenu}
          >
            Services
          </Link>
          <Link
            to="/corona"
            className="block px-4 py-2 hover:bg-blue-700 dark:hover:bg-gray-700"
            onClick={closeMobileMenu}
          ></Link>
          <button
            onClick={handleAuthButtonClick}
            className="block bg-white text-blue-600 px-4 py-2 my-2 rounded hover:bg-gray-100 dark:bg-gray-700 dark:text-white"
          >
            {isAuthenticated ? "Logout" : "Login"}
          </button>
          {!isAuthenticated && (
            <Link
              to="/createAccount"
              className="block bg-white text-blue-600 px-4 py-2 my-2 rounded hover:bg-gray-100 dark:bg-gray-700 dark:text-white"
              onClick={closeMobileMenu}
            >
              Patient Sign Up
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

//<Link to="/admindashboard" className="hover:text-gray-300">
//Admin
//</Link>
//<Link to="/Doctordashboard" className="hover:text-gray-300">
//Doctor
//</Link>
//<Link to="/Patientdashboard" className="hover:text-gray-300">
//patientdashboard
//</Link>
