import React from "react";
import { useAuthContext } from "../contexts/userContext";

const PatientProfileCard = () => {
  const { user, loading, error } = useAuthContext();

  if (loading) {
    return (
      <h1 className="text-center text-2xl font-bold text-indigo-500 animate-pulse">
        Loading...
      </h1>
    );
  }

  if (error) {
    return (
      <h1 className="text-center text-2xl font-bold text-red-600 animate-pulse">
        {error}
      </h1>
    );
  }

  if (!user) {
    return (
      <h1 className="text-center text-2xl text-gray-500">No user logged in</h1>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-indigo-800 dark:from-gray-900 dark:to-gray-800">
      <div className="flex flex-col md:flex-row max-w-5xl w-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-900 shadow-2xl rounded-3xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
        {/* Image Section */}
        <div className="w-full md:w-1/3 bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
          <img
            src={user.image || "https://via.placeholder.com/150"}
            alt={user.name}
            className="w-40 h-40 rounded-full border-4 border-white shadow-lg transform hover:scale-110 transition-transform duration-300"
          />
        </div>

        {/* Content Section */}
        <div className="w-full md:w-2/3 p-10">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            {user.name}
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            {user.role || "Role not specified"}
          </p>
          <div className="space-y-4">
            <p className="text-gray-800 dark:text-gray-300 text-lg flex items-center">
              <span className="font-semibold text-indigo-500 dark:text-indigo-400 mr-2">
                ID:
              </span>
              {user._id}
            </p>
            <p className="text-gray-800 dark:text-gray-300 text-lg flex items-center">
              <span className="font-semibold text-indigo-500 dark:text-indigo-400 mr-2">
                Email:
              </span>
              {user.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfileCard;
