import React from "react";
import { useAdminContext } from "../contexts/adminContext";

const AdminProfileCard = () => {
  const { admin, loading, error } = useAdminContext();

  if (loading) {
    return <h1 className="text-center text-xl text-gray-300">Loading...</h1>;
  }

  if (error) {
    return <h1 className="text-center text-xl text-red-500">{error}</h1>;
  }

  if (!admin) {
    return (
      <h1 className="text-center text-xl text-gray-300">No admin logged in</h1>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 py-10">
      <div className="max-w-4xl w-full bg-gray-800 text-white shadow-2xl rounded-3xl overflow-hidden transform transition duration-300 hover:scale-105">
        <div className="flex">
          {/* Image Section */}
          <div className="w-1/3 relative">
            <img
              src={admin.image}
              alt={admin.name || "Admin"}
              className="w-full h-full object-cover object-center rounded-l-3xl"
            />
            <div className="absolute bottom-4 left-4 bg-gray-800 bg-opacity-50 text-white px-4 py-2 rounded-md">
              <h2 className="text-2xl font-bold">{admin.name}</h2>
            </div>
          </div>

          {/* Text Content Section */}
          <div className="w-2/3 p-8">
            <h2 className="text-4xl font-bold text-white mb-4">{admin.name}</h2>
            <p className="text-xl text-gray-400 mb-4">{admin.role}</p>
            <div className="space-y-4">
              <p className="text-gray-300">
                <span className="font-semibold text-lg">ID:</span> {admin._id}
              </p>
              <p className="text-gray-300">
                <span className="font-semibold text-lg">Email:</span>{" "}
                {admin.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfileCard;
