import React, { useState, useEffect } from "react";
import { useAvailability } from "../doctorContextsAndReducers/availabilityContext"; // Import the availability context
import { useDoctorContext } from "../contexts/doctorContext"; // Doctor context for doctor data

const CreateAvailability = () => {
  const { doctor } = useDoctorContext();
  const { createAvailability, loading, error, success } = useAvailability();

  const [date, setDate] = useState(""); // State to hold selected date
  const [slots, setSlots] = useState([{ startTime: "", endTime: "" }]);
  const [slotError, setSlotError] = useState("");

  const doctorId = doctor?._id;

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  // Get the current time in HH:MM format for time validation
  const currentTime = new Date().toISOString().split("T")[1].slice(0, 5);

  // Function to add a new time slot
  const handleAddSlot = () => {
    setSlots([...slots, { startTime: "", endTime: "" }]);
    setSlotError(""); // Reset any previous errors
  };

  // Function to remove the last time slot
  const handleRemoveLastSlot = () => {
    if (slots.length > 1) {
      setSlots(slots.slice(0, slots.length - 1)); // Remove the last slot
      setSlotError(""); // Reset any previous errors
    }
  };

  // Handle changes in the time slots
  const handleSlotChange = (index, field, value) => {
    const updatedSlots = [...slots];
    updatedSlots[index][field] = value;

    // Check if the end time is earlier than the start time
    if (
      updatedSlots[index].startTime &&
      updatedSlots[index].endTime &&
      updatedSlots[index].endTime < updatedSlots[index].startTime
    ) {
      setSlotError("End time cannot be earlier than start time.");
    } else {
      setSlotError(""); // Clear error if valid
    }

    setSlots(updatedSlots);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for any invalid slot times before submitting
    const formattedSlots = slots.filter(
      (slot) => slot.startTime && slot.endTime
    );

    if (formattedSlots.length === 0 || slotError) {
      createAvailability({
        loading: false,
        error: "Please provide valid slots.",
      });
      return;
    }

    const availabilityData = {
      doctorId: doctorId,
      date: date,
      slots: formattedSlots,
    };

    console.log("Sending availability data:", availabilityData); // Log the payload

    try {
      await createAvailability(availabilityData);
      setDate("");
      setSlots([{ startTime: "", endTime: "" }]);
    } catch (err) {
      console.error("Error creating availability:", err);
      createAvailability({
        loading: false,
        error: "Failed to create availability.",
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <p className="mt-2 text-gray-500">Doctor ID: {doctor?.id}</p>

      <h2 className="text-3xl font-semibold text-center text-gray-800">
        Create New Availability
      </h2>

      {error && (
        <p className="text-red-500 hover:text-red-600 text-center mt-4">
          {error}
        </p>
      )}
      {success && (
        <p className="text-green-500 hover:text-green-600 text-center mt-4">
          Availability created successfully!
        </p>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {/* Date Picker */}
        <div>
          <label htmlFor="date" className="block text-gray-700">
            Select Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
            required
            min={today} // Prevent past dates
          />
        </div>

        {/* Slots Section */}
        <div>
          <label className="block text-gray-700">Available Slots</label>
          {slots.map((slot, index) => (
            <div key={index} className="flex space-x-4 mt-3">
              <div className="w-1/2">
                <input
                  type="time"
                  value={slot.startTime}
                  onChange={(e) =>
                    handleSlotChange(index, "startTime", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="w-1/2">
                <input
                  type="time"
                  value={slot.endTime}
                  onChange={(e) =>
                    handleSlotChange(index, "endTime", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
            </div>
          ))}
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={handleAddSlot}
              className="text-indigo-600 hover:text-indigo-700"
            >
              + Add Another Slot
            </button>
            {slots.length > 1 && (
              <button
                type="button"
                onClick={handleRemoveLastSlot}
                className="text-red-600 hover:text-red-700"
              >
                - Remove Last Slot
              </button>
            )}
          </div>
          {slotError && <p className="text-red-500 mt-2">{slotError}</p>}{" "}
          {/* Error message */}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className={`px-6 py-3 rounded-lg text-white ${
              loading ? "bg-gray-500" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
            disabled={loading || slotError} // Disable if error exists
          >
            {loading ? "Creating..." : "Create Availability"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAvailability;
