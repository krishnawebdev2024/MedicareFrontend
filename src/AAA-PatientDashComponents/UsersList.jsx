import React, { useEffect } from "react";
import { useAuthContext } from "../contexts/userContext"; // Adjust the import path as needed

const UsersList = () => {
  const { users, loading, error, fetchUsers } = useAuthContext(); // Use context

  useEffect(() => {
    fetchUsers(); // Fetch users when the component mounts
  }, []);

  if (loading) {
    return (
      <p className="text-center text-xl text-gray-300">Loading users...</p>
    );
  }

  if (error) {
    return <p className="text-center text-xl text-red-500">{error}</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">All Users</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-lg shadow-xl p-6 flex flex-col items-left transform hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out border border-indigo-500 dark:border-indigo-400"
          >
            <img
              src={user.image || "https://via.placeholder.com/150"} // Default image if no image is provided
              alt={user.name}
              className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-indigo-500 dark:border-indigo-400 shadow-md transition-transform duration-300 ease-in-out hover:scale-110"
            />
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                Name:
              </span>{" "}
              {user.name}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                Email:
              </span>{" "}
              {user.email}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                Role:
              </span>{" "}
              {user.role}
            </p>
            <p className="text-sm mt-2 text-gray-500 dark:text-gray-400">
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                ID:
              </span>{" "}
              {user._id}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersList;
