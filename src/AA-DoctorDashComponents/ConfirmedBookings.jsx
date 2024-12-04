import React, { useEffect } from "react";
// Assuming this is where your auth context is
import { useDoctorContext } from "../contexts/doctorContext";
import { useBooking } from "../doctorContextsAndBookingContexts/BookingContext"; // Assuming BookingContext is in this path

const ConfirmedBookings = () => {
  const { doctor } = useDoctorContext();
  // Get user info from auth context
  const { fetchBookingsByDoctor, bookings, loading, error } = useBooking(); // Get booking related functions from context

  useEffect(() => {
    if (doctor && doctor._id) {
      fetchBookingsByDoctor(doctor._id); // Fetch bookings when user ID is available
    }
  }, [doctor]); // Run effect when user is available

  // Log the fetched data
  useEffect(() => {
    if (bookings && bookings.length > 0) {
      console.log("Fetched Bookings:", bookings); // Log bookings when they are available
    }
  }, [bookings]); // Run effect when bookings change

  if (loading) {
    return <p className="text-center text-gray-500">Loading bookings...</p>;
  }

  if (error) {
    return (
      <p className="text-center text-red-500">
        Error fetching bookings: {error}
      </p>
    );
  }

  return (
    <div className="p-6 dark:bg-gray-800 bg-slate-50 text-white min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-indigo-400">Bookings</h2>
      {bookings && bookings.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <li
              key={booking._id}
              className="bg-gray-800 border border-spacing-1 border-white  p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-semibold text-indigo-500">
                  {booking.doctorId.name}
                </h3>
                <span className="text-sm text-gray-400">
                  {new Date(booking.date).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-300 mb-2">
                Patient: {booking.patientId.name} {/* Display Patient's name */}
              </p>
              <p className="text-gray-300 mb-2">
                Patient Email: {booking.patientId.email}{" "}
                {/* Display Patient's email */}
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
              <div className="mt-4">
                <button className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105">
                  View Details
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-400">
          No bookings found for this Doctor.
        </p>
      )}
    </div>
  );
};

export default ConfirmedBookings;
