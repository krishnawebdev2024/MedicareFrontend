import React, { useEffect } from "react";
import { useAuthContext } from "../contexts/userContext"; // Assuming this is where your auth context is
import { useBooking } from "../doctorContextsAndBookingContexts/BookingContext"; // Assuming BookingContext is in this path

const BookedAppointments = () => {
  const { user, loading: userLoading, error: userError } = useAuthContext(); // Get user info from auth context
  const { fetchBookingsByPatient, bookings, loading, error } = useBooking(); // Get booking related functions from context

  useEffect(() => {
    if (user && user._id) {
      fetchBookingsByPatient(user._id); // Fetch bookings when user ID is available
    }
  }, [user]); // Run effect when user is available

  // Log the fetched data
  useEffect(() => {
    if (bookings && bookings.length > 0) {
      console.log("Fetched Bookings:", bookings); // Log bookings when they are available
    }
  }, [bookings]); // Run effect when bookings change

  if (userLoading) {
    return (
      <p className="text-center text-gray-500">Loading user information...</p>
    );
  }

  if (userError) {
    return (
      <p className="text-center text-red-500">
        Error loading user data: {userError}
      </p>
    );
  }

  if (loading) {
    return <p className="text-center text-gray-500">Loading bookings...</p>;
  }

  {
    error && (
      <div className="flex justify-center items-center my-4 p-4 bg-red-100 text-red-600 rounded-lg shadow-md border border-red-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm-.5-9.5a.5.5 0 0 0-1 0v3a.5.5 0 0 0 1 0V8.5zm0 4.5a.5.5 0 0 0-1 0v.5a.5.5 0 0 0 1 0v-.5z"
            clipRule="evenodd"
          />
        </svg>
        <span className="font-semibold">Error fetching bookings:</span> {error}
      </div>
    );
  }

  return (
    <div className="p-6 dark:bg-gray-800 bg-slate-50 text-white min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-indigo-400">
        Your Bookings Status
      </h2>
      {bookings && bookings.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <li
              key={booking._id}
              className="bg-gray-800 border border-spacing-1 border-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-semibold text-slate-400">
                  {booking.doctorId.name}
                </h3>
                <span className="text-sm text-gray-400">
                  {new Date(booking.date).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-300 mb-2">
                Email: {booking.doctorId.email}
              </p>
              <p className="text-gray-300 mb-2">
                Status:{" "}
                <span
                  className={`font-semibold ${
                    booking.status === "pending"
                      ? "text-yellow-400"
                      : "text-green-500"
                  }`}
                >
                  {booking.status}
                </span>
              </p>
              <p className="text-gray-300">
                Slot: {booking.slot.startTime} - {booking.slot.endTime}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-400">
          No bookings found for this patient.
        </p>
      )}
    </div>
  );
};

export default BookedAppointments;
