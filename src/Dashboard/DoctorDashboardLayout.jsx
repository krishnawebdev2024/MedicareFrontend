import React, { useState } from "react";
import DoctorProfileCard from "../AA-DoctorDashComponents/DoctorProfileCard";
import CreateAvailability from "../AA-DoctorDashComponents/CreateAvailability";
import GetAvailability from "../AA-DoctorDashComponents/GetAvailability"; // Import GetAvailability
import UpdateAvailability from "../AA-DoctorDashComponents/UpdateAvailability";
import DeleteAvailability from "../AA-DoctorDashComponents/DeleteAvailability";
import DeleteSlots from "../AA-DoctorDashComponents/DeleteSlots";
import ConfirmedBookings from "../AA-DoctorDashComponents/ConfirmedBookings";
import LogoutDoctor from "../03-DoctorAccountCreate/LogoutDoctor";

// Main Dashboard Layout
const DoctorDashboardLayout = () => {
  const [activeComponent, setActiveComponent] = useState("profile");

  // Determine what to render based on the activeComponent state
  const renderContent = () => {
    switch (activeComponent) {
      case "profile":
        return <DoctorProfileCard />;
      case "createAvailability":
        return <CreateAvailability />;
      case "getAvailability": // Add this case for GetAvailability
        return <GetAvailability />;
      case "updateAvailability": // Add this case for UpdateAvailability
        return <UpdateAvailability />;
      case "deleteAvailability": // Add this case for DeleteAvailability
        return <DeleteAvailability />;

      case "deleteSlots": // Add this case for DeleteSlots
        return <DeleteSlots />;

      case "confirmedBookings": // Add this case for ConfirmedBookings
        return <ConfirmedBookings />;

      case "logout":
        return <LogoutDoctor />;
      default:
        return <DoctorProfileCard />;
    }
  };

  return (
    <div className="flex min-h-screen mt-[110px] dark:bg-gray-900">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white w-64 p-4 dark:bg-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-white">Doctor Dashboard</h2>
        <nav className="space-y-4">
          <button
            className={`w-full text-left p-3 rounded-md ${
              activeComponent === "profile"
                ? "bg-gray-600"
                : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveComponent("profile")}
          >
            Profile
          </button>

          {/* Create Availability Button */}
          <button
            className={`w-full text-left p-3 rounded-md ${
              activeComponent === "createAvailability"
                ? "bg-gray-600"
                : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveComponent("createAvailability")}
          >
            Add Availability
          </button>

          {/* Get Availability Button */}
          <button
            className={`w-full text-left p-3 rounded-md ${
              activeComponent === "getAvailability"
                ? "bg-gray-600"
                : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveComponent("getAvailability")} // Switch to GetAvailability
          >
            View Availability
          </button>
          {/* Update Availability Button */}
          <button
            className={`w-full text-left p-3 rounded-md ${
              activeComponent === "updateAvailability"
                ? "bg-gray-600"
                : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveComponent("updateAvailability")} // Switch to UpdateAvailability
          >
            Edit Availability
          </button>

          {/* Delete Availability Button */}
          <button
            className={`w-full text-left p-3 rounded-md ${
              activeComponent === "deleteAvailability"
                ? "bg-gray-600"
                : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveComponent("deleteAvailability")} // Switch to DeleteAvailability
          >
            Delete Availability
          </button>
          {/* Delete Slots Button */}
          <button
            className={`w-full text-left p-3 rounded-md ${
              activeComponent === "deleteSlots"
                ? "bg-gray-600"
                : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveComponent("deleteSlots")} // Switch to DeleteSlots
          >
            Delete Slots
          </button>

          {/* Confirmed Bookings Button */}
          <button
            className={`w-full text-left p-3 rounded-md ${
              activeComponent === "confirmedBookings"
                ? "bg-gray-600"
                : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveComponent("confirmedBookings")} // Switch to ConfirmedBookings
          >
            View Bookings
          </button>

          {/* Logout Button */}
          <button
            className="w-full text-left p-3 mt-4 rounded-md text-red-500 hover:bg-gray-700"
            onClick={() => setActiveComponent("logout")}
          >
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100 dark:bg-gray-800">
        {renderContent()}
      </div>
    </div>
  );
};

export default DoctorDashboardLayout;
