import React, { useEffect } from "react";
import { useAvailability } from "../doctorContextsAndBookingContexts/availabilityContext"; // Import the availability context
import { useDoctorContext } from "../contexts/doctorContext"; // Import doctor context for doctor data

const GetAvailability = () => {
  const { doctor } = useDoctorContext(); // Get doctor data from context
  const { availabilities, loading, error, fetchAvailabilities } =
    useAvailability();

  const doctorId = doctor?._id; // Ensure doctor ID is available

  useEffect(() => {
    // Fetch availabilities only when doctorId is defined
    if (doctorId) {
      fetchAvailabilities(doctorId);
      console.log("Fetching availabilities for doctor:", doctorId);
      console.log(` availabilities: ${availabilities}`);
    }
  }, []);
  //}, [doctorId]); // Add doctorId as a dependency to ensure the effect runs once

  // Helper function to format date
  const formatDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  // Render the availability list
  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-50 shadow-2xl rounded-2xl">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Doctor's Availability
      </h2>

      {/* Loading and Error Messages */}
      {loading && <p className="text-gray-600 text-center mt-6">Loading...</p>}
      {error && (
        <p className="text-red-600 text-center mt-6 font-semibold">{error}</p>
      )}

      {/* No Availabilities Message */}
      {availabilities && availabilities.length === 0 && (
        <p className="text-gray-500 text-center mt-6">
          No availabilities found.
        </p>
      )}

      {/* Availability List */}
      {availabilities && availabilities.length > 0 && (
        <div className="space-y-6 mt-8">
          {availabilities.map((availability) => (
            <div
              key={availability._id}
              className="p-6 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              {/* Date Header */}
              <h3 className="text-xl font-semibold text-gray-700">
                {formatDate(availability.availability[0]?.date)}
              </h3>

              {/* Slots Section */}
              <div className="mt-4">
                <h4 className="font-medium text-gray-600 mb-2">
                  Available Slots:
                </h4>
                <ul className="space-y-3">
                  {availability.availability[0]?.slots?.map((slot, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between bg-gray-100 px-4 py-3 rounded-lg"
                    >
                      {/* Slot Time */}
                      <div className="text-gray-700 font-medium">
                        {slot.startTime} - {slot.endTime}
                      </div>

                      {/* Slot Status */}
                      <div
                        className={`px-3 py-1 text-sm font-bold rounded-lg ${
                          slot.isBooked
                            ? "bg-red-500 text-white"
                            : "bg-green-500 text-white"
                        }`}
                      >
                        {slot.isBooked ? "Booked" : "Available"}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetAvailability;
