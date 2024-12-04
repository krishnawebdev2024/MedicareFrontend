import React, { useState, useEffect } from "react";
import { useAvailability } from "../doctorContextsAndBookingContexts/availabilityContext";
import { useDoctorContext } from "../contexts/doctorContext";
import { toast, ToastContainer } from "react-toastify"; // Import Toast
import "react-toastify/dist/ReactToastify.css"; // Import the Toastify CSS

const UpdateAvailability = () => {
  const { doctor } = useDoctorContext();
  const {
    availabilities,
    loading,
    error,
    fetchAvailabilities,
    updateAvailability,
  } = useAvailability();

  const doctorId = doctor?._id;

  const [editingSlot, setEditingSlot] = useState(null);
  const [updatedSlot, setUpdatedSlot] = useState({});

  useEffect(() => {
    if (doctorId) {
      fetchAvailabilities(doctorId);
    }
  }, []);
  //}, [doctorId, fetchAvailabilities]);

  // Handle editing
  const handleEdit = (availabilityId, slot) => {
    setEditingSlot({ availabilityId, slotId: slot._id });
    setUpdatedSlot({ ...slot });
  };

  // Handle cancel editing
  const handleCancelEdit = () => {
    setEditingSlot(null);
    setUpdatedSlot({});
  };

  // Handle saving updated slot
  const handleSave = async () => {
    if (!availabilities || !availabilities.length) {
      console.error("Availabilities are not loaded.");
      return;
    }

    const { availabilityId, slotId } = editingSlot;

    // Find the availability entry for the given availabilityId
    const availabilityItem = availabilities.find(
      (av) => av._id === availabilityId
    );

    if (
      !availabilityItem ||
      !availabilityItem.availability ||
      !availabilityItem.availability[0]
    ) {
      console.error("Availability or slots not found.");
      return;
    }

    // Proceed with creating the updated data if availabilityItem exists
    const updatedData = {
      doctorId,
      availability: [
        {
          date: availabilityItem.availability[0]?.date,
          slots: [
            {
              _id: slotId,
              ...updatedSlot,
            },
          ],
        },
      ],
    };

    try {
      // Send updated data to the server
      await updateAvailability(availabilityId, updatedData);

      // Refresh the availabilities and reset editing state
      fetchAvailabilities(doctorId);
      setEditingSlot(null);
      setUpdatedSlot({});
      toast.success("Availability updated successfully!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (err) {
      console.error("Failed to update availability:", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-2xl rounded-2xl">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
        Update Doctor's Availability
      </h2>
      {/* Loading and Error Messages */}
      {loading && <p className="text-gray-600 text-center mt-4">Loading...</p>}
      {error && <p className="text-red-600 text-center mt-4">{error}</p>}
      {/* No Availabilities Message */}
      {availabilities && availabilities.length === 0 && (
        <p className="text-gray-600 text-center mt-4">
          No availabilities found.
        </p>
      )}
      {/* Availability Cards */}
      {availabilities && availabilities.length > 0 && (
        <div className="space-y-6 mt-8">
          {availabilities.map((availability) => (
            <div
              key={availability._id}
              className="bg-gray-50 border border-gray-200 rounded-xl shadow-lg p-6"
            >
              {/* Date Header */}
              <h3 className="text-xl font-semibold text-gray-700">
                {new Date(
                  availability.availability[0]?.date
                ).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </h3>

              {/* Slots Section */}
              <div className="mt-4">
                <h4 className="font-medium text-gray-600">Available Slots:</h4>
                <ul className="mt-4 space-y-3">
                  {availability.availability[0]?.slots?.map((slot, index) => (
                    <li
                      key={index}
                      className={`flex items-center justify-between p-3 rounded-lg shadow-sm 
                      ${slot.isBooked ? "bg-red-100" : "bg-green-100"}`}
                    >
                      {/* Slot Details */}
                      <span className="font-medium text-gray-700">
                        {slot.startTime} - {slot.endTime}{" "}
                        {slot.isBooked && (
                          <span className="text-red-500">(Booked)</span>
                        )}
                      </span>

                      {/* Actions */}
                      {editingSlot?.slotId === slot._id ? (
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={updatedSlot.startTime}
                            onChange={(e) =>
                              setUpdatedSlot({
                                ...updatedSlot,
                                startTime: e.target.value,
                              })
                            }
                            className="w-24 border border-gray-300 rounded-md px-3 py-1 text-sm"
                          />
                          <input
                            type="text"
                            value={updatedSlot.endTime}
                            onChange={(e) =>
                              setUpdatedSlot({
                                ...updatedSlot,
                                endTime: e.target.value,
                              })
                            }
                            className="w-24 border border-gray-300 rounded-md px-3 py-1 text-sm"
                          />
                          <button
                            onClick={handleSave}
                            className="bg-green-500 text-white px-4 py-1 rounded-lg hover:bg-green-600"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="bg-gray-500 text-white px-4 py-1 rounded-lg hover:bg-gray-600"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleEdit(availability._id, slot)}
                          className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600"
                        >
                          Edit
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
      <ToastContainer /> {/* Add ToastContainer here to show toasts */}
    </div>
  );
};

export default UpdateAvailability;
