import React, { useState } from "react";

import PatientProfileCard from "../AAA-PatientDashComponents/PatientProfileCard";
import DoctorsList from "../AAA-PatientDashComponents/DoctorsList";
import AppointmentBooking from "../AAA-PatientDashComponents/AppointmentBooking";
import BookedAppointments from "../AAA-PatientDashComponents/BookedAppointments";
import CancelAppointment from "../AAA-PatientDashComponents/CancelAppointment";
import FileUpload from "../AAA-PatientDashComponents/FileUpload";

import Logout from "../01-UserAccountCreate/Logout";

// Main Dashboard Layout
const PatientDashboardLayout = () => {
  const [activeComponent, setActiveComponent] = useState("profile");

  // Determine what to render based on the activeComponent state
  const renderContent = () => {
    switch (activeComponent) {
      case "profile":
        return <PatientProfileCard />;
      case "doctors":
        return <DoctorsList />;
      case "appointmentBooking":
        return <AppointmentBooking />;
      case "bookedAppointments":
        return <BookedAppointments />;
      case "cancelAppointment":
        return <CancelAppointment />;

      case "fileUpload":
        return <FileUpload />;

      case "logout":
        return <Logout />;
      default:
        return <PatientProfileCard />;
    }
  };

  return (
    <div className="flex min-h-screen mt-[110px] dark:bg-gray-900">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white w-64 p-4 dark:bg-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-white">
          Patient Dashboard
        </h2>
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

          {/* Doctors List */}
          <button
            className={`w-full text-left p-3 rounded-md ${
              activeComponent === "doctors"
                ? "bg-gray-600"
                : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveComponent("doctors")}
          >
            View Available Doctors
          </button>

          {/* Appointment Booking */}
          <button
            className={`w-full text-left p-3 rounded-md ${
              activeComponent === "appointmentBooking"
                ? "bg-gray-600"
                : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveComponent("appointmentBooking")}
          >
            Book Appointment
          </button>
          {/* Doctors Tabs */}
          <button
            className={`w-full text-left p-3 rounded-md ${
              activeComponent === "bookedAppointments"
                ? "bg-gray-600"
                : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveComponent("bookedAppointments")}
          >
            Appointments status
          </button>

          {/* Cancel Appointment */}
          <button
            className={`w-full text-left p-3 rounded-md ${
              activeComponent === "cancelAppointment"
                ? "bg-gray-600"
                : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveComponent("cancelAppointment")}
          >
            Decline Appointment
          </button>

          {/* File Upload */}
          <button
            className={`w-full text-left p-3 rounded-md ${
              activeComponent === "fileUpload"
                ? "bg-gray-600"
                : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveComponent("fileUpload")}
          >
            Upload Prescription
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

export default PatientDashboardLayout;
