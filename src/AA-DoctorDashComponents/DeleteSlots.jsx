import React, { useEffect, useState } from "react";
import { useAvailability } from "../doctorContextsAndBookingContexts/availabilityContext";
import { useDoctorContext } from "../contexts/doctorContext";
import { toast, ToastContainer } from "react-toastify"; // Import Toast
import "react-toastify/dist/ReactToastify.css"; // Import the Toastify CSS

const DeleteSlot = () => {
  const { doctor } = useDoctorContext();
  const {
    availabilities,
    fetchAvailabilities,
    deleteSlot, // Function to handle single slot deletion
    loading,
    error,
  } = useAvailability();

  const doctorId = doctor?._id;

  // State to manage modal visibility and slot ID
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Fetch availabilities when the component mounts
  useEffect(() => {
    if (doctorId) {
      fetchAvailabilities(doctorId);
    }
  }, [doctorId]);

  // Handle Delete Slot
  const handleDeleteSlot = (availabilityId, slotId) => {
    setSelectedSlot({ availabilityId, slotId });
    setIsModalOpen(true); // Show the modal when delete is clicked
  };

  // Confirm delete action
  const confirmDelete = () => {
    if (selectedSlot) {
      const { availabilityId, slotId } = selectedSlot;
      deleteSlot(availabilityId, slotId)
        .then(() => {
          // After deleting the slot, re-fetch the updated availabilities
          fetchAvailabilities(doctorId);
          setIsModalOpen(false); // Close the modal after deletion
          toast.success("Slot deleted successfully!");
        })
        .catch((err) => {
          // Handle any errors that occur during deletion
          console.error("Error deleting slot:", err);
          toast.error("Failed to delete the slot. Please try again.");
        });
    }
  };

  // Cancel delete action
  const cancelDelete = () => {
    setIsModalOpen(false); // Close the modal without deleting
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4 dark:text-white">Delete Slot</h2>
      {/* Show Loading or Error */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {/* Show Availabilities */}
      <ul className="space-y-4">
        {availabilities.map((availability) => (
          <li
            key={availability._id}
            className="p-4 border rounded flex flex-col space-y-4"
          >
            <div>
              <p className="dark:text-white">
                <strong>Date:</strong>{" "}
                {new Date(
                  availability.availability[0]?.date
                ).toLocaleDateString()}
              </p>
              <p className="dark:text-white">
                <strong>Slots:</strong>
              </p>
              <ul className="space-y-2">
                {availability.availability[0]?.slots.map((slot) => (
                  <li
                    key={slot._id}
                    className={`p-4 rounded-lg shadow-md flex justify-between items-center 
                      ${
                        slot.isBooked
                          ? "bg-red-100 border-l-4 border-red-500"
                          : "bg-green-100 border-l-4 border-green-500"
                      }`}
                  >
                    <div>
                      <p className="font-semibold text-gray-800">
                        {slot.startTime} - {slot.endTime}
                      </p>
                      <p
                        className={`text-sm ${
                          slot.isBooked ? "text-red-500" : "text-green-500"
                        }`}
                      >
                        {slot.isBooked ? "Booked" : "Available to be Booked"}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          slot.isBooked
                            ? "bg-red-500 text-white"
                            : "bg-green-500 text-white"
                        }`}
                      >
                        {slot.isBooked ? "Reserved" : "Free"}
                      </span>
                      <button
                        onClick={() =>
                          handleDeleteSlot(availability._id, slot._id)
                        }
                        disabled={slot.isBooked} // Disable button if slot is booked
                        className={`px-4 py-2 rounded ${
                          slot.isBooked
                            ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                            : "bg-red-500 text-white hover:bg-red-600"
                        }`}
                      >
                        Delete Slot
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
      {/* No availabilities */}
      {availabilities.length === 0 && !loading && (
        <p className="text-gray-500">
          No availabilities found for this doctor.
        </p>
      )}
      {/* Modal for confirming delete */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Are you sure?</h3>
            <p className="mb-4">Do you really want to delete this slot?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 rounded bg-gray-300 text-gray-800 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer /> {/* Add ToastContainer here to show toasts */}
    </div>
  );
};

export default DeleteSlot;
