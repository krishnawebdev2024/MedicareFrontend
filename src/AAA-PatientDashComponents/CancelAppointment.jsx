import React, { useEffect } from "react";
import { useBooking } from "../doctorContextsAndBookingContexts/BookingContext"; // assuming your context is in BookingContext.js
import { useAuthContext } from "../contexts/userContext";
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer from React-Toastify
import "react-toastify/dist/ReactToastify.css"; // Import the Toastify CSS

const CancelAppointment = () => {
  const { user, loading: userLoading, error: userError } = useAuthContext();
  const { bookings, loading, error, fetchBookingsByPatient, deleteBooking } =
    useBooking();

  useEffect(() => {
    if (user) {
      fetchBookingsByPatient(user._id); // Fetch bookings for this patient when the component loads
    }
  }, [user]);

  useEffect(() => {
    console.log("Fetched bookings in CancelAppointment:", bookings);
  }, [bookings]);

  const handleCancelBooking = async (id) => {
    try {
      await deleteBooking(id); // Delete the booking when cancel button is clicked
      toast.success("Appointment successfully canceled!"); // Show success toast
    } catch (err) {
      toast.error("Failed to cancel appointment. Please try again!"); // Show error toast
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-red-50 border border-red-600 rounded-lg shadow-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-red-600 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        <p className="text-red-600 font-semibold text-xl mb-4">
          It seems like No appointments are scheduled.
        </p>
        <p className="text-gray-700 text-lg mb-6">{error}</p>
        <button
          onClick={() => fetchBookingsByPatient(user._id)} // Assuming you want to trigger the fetch action
          className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all duration-300"
        >
          Retry
        </button>
      </div>
    );

  return (
    <div>
      {/* Toast Container to show notifications */}
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <h2 className="text-3xl font-bold mb-6 text-indigo-400">Your Bookings</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-8">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-gray-800 dark:to-gray-700 text-white border border-gray-400 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300"
          >
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">
                Doctor:{" "}
                <span className="text-gray-100">{booking.doctorId?.name}</span>
              </h3>
              <p className="text-sm text-gray-200 mb-4">
                Email:{" "}
                <span className="text-gray-100">{booking.doctorId?.email}</span>
              </p>
              <p className="text-sm text-gray-200 mb-2">
                Slot:{" "}
                <span className="text-gray-100">
                  {booking.slot?.startTime} - {booking.slot?.endTime}
                </span>
              </p>
              <p className="text-sm text-gray-200 mb-2">
                Status:{" "}
                <span
                  className={`font-semibold ${
                    booking.status === "cancelled"
                      ? "text-red-400"
                      : "text-green-400"
                  }`}
                >
                  {booking.status}
                </span>
              </p>
              <p className="text-sm text-gray-200">
                Date:{" "}
                <span className="text-gray-100">
                  {new Date(booking.date).toLocaleDateString()}
                </span>
              </p>
            </div>
            <div className="p-4 bg-gradient-to-r from-purple-700 to-indigo-700 dark:from-gray-700 dark:to-gray-800 rounded-b-2xl">
              <button
                onClick={() => handleCancelBooking(booking._id)}
                className="w-full bg-red-600 hover:bg-red-500 text-white font-medium px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                Decline Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CancelAppointment;
