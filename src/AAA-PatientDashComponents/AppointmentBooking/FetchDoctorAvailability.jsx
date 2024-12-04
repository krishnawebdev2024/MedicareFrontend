import React, { useState } from "react";
import { useAvailability } from "../../doctorContextsAndBookingContexts/availabilityContext";

const FetchDoctorAvailability = () => {
  const { fetchAvailabilitiesById, availabilities, loading, error } =
    useAvailability();
  const [doctorId, setDoctorId] = useState(""); // State to store the doctor ID input
  const [localError, setLocalError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (doctorId.trim() === "") {
      setLocalError("Please enter a doctor ID.");
      return;
    }

    setLocalError(null); // Reset error
    fetchAvailabilitiesById(doctorId); // Fetch the availability using the doctor ID
  };

  return (
    <div className="container p-5">
      <h2>Fetch Doctor's Availability</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Enter Doctor ID"
          value={doctorId}
          onChange={(e) => setDoctorId(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="ml-2 p-2 bg-blue-500 text-white rounded"
        >
          Fetch Availability
        </button>
      </form>

      {localError && <p className="text-red-500">{localError}</p>}

      {loading && <p>Loading availability...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {!loading && !error && availabilities.length > 0 && (
        <div>
          <h3>Availability Details</h3>
          <ul>
            {availabilities.map((availability) => (
              <li key={availability._id} className="mb-4">
                <p>
                  <strong>Doctor ID:</strong> {availability.doctorId}
                </p>
                <p>
                  <strong>Created At:</strong>{" "}
                  {new Date(availability.createdAt).toLocaleString()}
                </p>
                <h4>Available Dates:</h4>
                {availability.availability.map((slotData, index) => (
                  <div key={index} className="mb-3">
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(slotData.date).toLocaleDateString()}
                    </p>
                    <ul>
                      {slotData.slots.map((slot) => (
                        <li key={slot._id}>
                          <p>
                            <strong>Time:</strong> {slot.startTime} -{" "}
                            {slot.endTime}
                          </p>
                          <p>
                            <strong>Status:</strong>{" "}
                            {slot.isBooked ? "Booked" : "Available"}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FetchDoctorAvailability;
