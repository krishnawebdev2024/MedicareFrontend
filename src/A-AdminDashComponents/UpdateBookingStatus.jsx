import React, { useEffect, useState } from "react";
import { useBooking } from "..//doctorContextsAndBookingContexts/BookingContext"; // Your context

const UpdateBookingStatus = () => {
  const { fetchBookings, bookings, loading, updateBookingStatus, error } =
    useBooking();
  const [selectedBooking, setSelectedBooking] = useState(null); // Store the selected booking

  // Fetch bookings on mount
  useEffect(() => {
    fetchBookings(); // Or fetchBookingsByDoctor if you are fetching for a specific doctor
  }, []);

  const handleUpdateStatus = async (bookingId, newStatus) => {
    try {
      await updateBookingStatus(bookingId, newStatus); // Update status in context and backend
      // Optionally, you can show a success message or update the UI after the status change.
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading bookings...</p>;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-slate-600">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center space-y-6">
          <div className="flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-red-500 animate-bounce"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-label="Error Icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h.01M12 8h.01M21 12c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9 9-4.03 9-9z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-gray-800">
            You don’t have any bookings yet.
          </h1>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8 px-4">
      <h2 className="text-3xl font-bold text-center text-indigo-400 mb-6">
        Manage Bookings
      </h2>
      {bookings && bookings.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <li
              key={booking._id}
              className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-semibold text-indigo-500">
                  Dr. {booking.doctorId.name}
                </h3>
                <span className="text-sm text-gray-400">
                  {new Date(booking.date).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-300 mb-2">
                Patient: {booking.patientId.name}
              </p>
              <p className="text-gray-300 mb-2">
                Slot: {booking.slot.startTime} - {booking.slot.endTime}
              </p>
              <p className="text-gray-300 mb-2">
                Status:{" "}
                <span
                  className={`font-semibold ${
                    booking.status === "pending"
                      ? "text-yellow-400"
                      : booking.status === "confirmed"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {booking.status}
                </span>
              </p>

              <div className="mt-4">
                {/* Conditional Button Rendering based on the current status */}
                {booking.status === "pending" && (
                  <>
                    <button
                      onClick={() =>
                        handleUpdateStatus(booking._id, "confirmed")
                      }
                      className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all duration-200 ease-in-out transform ver:scale-105"
                    >
                      Confirm Booking
                    </button>
                  </>
                )}
                {/*  {booking.status === "confirmed" && (
                  <button
                    onClick={() => handleUpdateStatus(booking._id, "cancelled")}
                    className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105"
                  >
                    Cancel Booking
                  </button>
                )} */}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-400">No bookings found.</p>
      )}
    </div>
  );
};

export default UpdateBookingStatus;

//<button
//onClick={() =>
//  handleUpdateStatus(booking._id, "cancelled")
//}
//className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 -2"
//>
//Cancel Booking
//</button>
