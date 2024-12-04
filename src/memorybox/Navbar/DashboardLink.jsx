import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/userContext";
import { useDoctorContext } from "../../contexts/doctorContext";
import { useAdminContext } from "../../contexts/adminContext";

const DashboardLink = () => {
  const { user } = useAuthContext();
  const { doctor } = useDoctorContext();
  const { admin } = useAdminContext();

  // Determine the role and dashboard link
  const getDashboardLink = () => {
    if (admin?.role === "admin") {
      return (
        <Link
          to="/admindashboard"
          className="px-8 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:from-blue-700 dark:to-blue-800 dark:hover:from-blue-800 dark:hover:to-blue-900 transition-all duration-300"
        >
          Admin Dashboard
        </Link>
      );
    }
    if (doctor?.role === "doctor") {
      return (
        <Link
          to="/Doctordashboard"
          className="px-8 py-3 text-sm font-semibold text-white bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-lg hover:shadow-xl hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 dark:from-green-700 dark:to-green-800 dark:hover:from-green-800 dark:hover:to-green-900 transition-all duration-300"
        >
          Doctor Dashboard
        </Link>
      );
    }
    if (user?.role === "user") {
      return (
        <Link
          to="/Patientdashboard"
          className="px-8 py-3 text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-purple-600 rounded-full shadow-lg hover:shadow-xl hover:from-purple-600 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:from-purple-700 dark:to-purple-800 dark:hover:from-purple-800 dark:hover:to-purple-900 transition-all duration-300"
        >
          Patient Dashboard
        </Link>
      );
    }
    // Fallback link
    return (
      <p className="px-6 py-2 text-center text-sm font-medium text-gray-700 bg-yellow-100 border-l-4 border-yellow-500 rounded-lg shadow-sm">
        Please log in to access your dashboard.
      </p>
    );
  };

  return (
    <div className="flex justify-center items-center mt-6">
      {getDashboardLink()}
    </div>
  );
};

export default DashboardLink;
