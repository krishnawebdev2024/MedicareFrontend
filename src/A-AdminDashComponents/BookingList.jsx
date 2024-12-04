import React, { useEffect, useState } from "react";
import { useBooking } from "../doctorContextsAndBookingContexts/BookingContext";

const BookingList = () => {
  const { bookings, loading, error, fetchBookings, deleteBooking } =
    useBooking();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleDelete = (id) => {
    setBookingToDelete(id); // Set the booking ID for deletion
    setIsModalOpen(true); // Open the modal
  };

  const handleConfirmDelete = (id) => {
    deleteBooking(id); // Call the deleteBooking function
    setIsModalOpen(false); // Close the modal after deletion
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal if cancelled
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader">Loading...</div>
      </div>
    );
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
            No bookings available at the moment
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
    <div className="max-w-6xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Bookings</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 max-w-md w-full mx-auto  border border-indigo-500 dark:border-indigo-400"
          >
            <div className="flex flex-col space-y-6">
              {/* Doctor Section */}
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white truncate">
                  Doctor: {booking.doctorId.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm truncate">
                  Email: {booking.doctorId.email}
                </p>
              </div>

              {/* Patient Section */}
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white truncate">
                  Patient: {booking.patientId.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm truncate">
                  Email: {booking.patientId.email}
                </p>
              </div>

              {/* Date and Time Section */}
              <div className="flex justify-between items-center text-gray-600 dark:text-gray-400 text-sm">
                <p>
                  Date:{" "}
                  {new Date(booking.date).toLocaleDateString("en-US", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <p className="bg-gray-200 p-4 rounded dark:text-black">
                  Time: {booking.slot.startTime} - {booking.slot.endTime}
                </p>
              </div>

              {/* Status Badge */}
              <div className="mt-4">
                <span
                  className={`inline-block px-4 py-2 rounded-full text-white ${
                    booking.status === "pending"
                      ? "bg-yellow-500"
                      : booking.status === "confirmed"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                >
                  {booking.status}
                </span>
              </div>

              {/* Cancel Button */}
              <div className="mt-4">
                <button
                  onClick={() => handleDelete(booking._id)}
                  className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
                >
                  Cancel Appointment
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for confirmation */}
      <DeleteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        bookingId={bookingToDelete}
      />
    </div>
  );
};

export default BookingList;

const DeleteModal = ({ isOpen, onClose, onConfirm, bookingId }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Are you sure you want to delete this booking?
        </h2>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(bookingId)}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
