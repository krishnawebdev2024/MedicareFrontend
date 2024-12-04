import React, { useEffect, useState } from "react";
import { useDoctorContext } from "../contexts/doctorContext";
import { useAvailability } from "../doctorContextsAndBookingContexts/availabilityContext";

const DoctorsList = () => {
  const { getDoctors, doctors, loading, error } = useDoctorContext();
  const {
    fetchAvailabilitiesById,
    availabilities,
    availabilityLoading,
    availabilityError,
  } = useAvailability();

  const [localDoctors, setLocalDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        if (doctors.length === 0) {
          await getDoctors(); // Fetch doctors if not already fetched
        }
      } catch (err) {
        console.error("Error fetching doctors:", err);
      }
    };

    fetchDoctors();
  }, [getDoctors, doctors.length]);

  useEffect(() => {
    setLocalDoctors(doctors); // Update local state after doctors are fetched
  }, [doctors]);

  const handleDoctorSelect = (id) => {
    const doctor = doctors.find((doc) => doc._id === id);
    setSelectedDoctorId(id);
    setSelectedDoctor(doctor);
    fetchAvailabilitiesById(id);
  };

  if (loading) return <p>Loading doctors...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container p-6 mx-auto max-w-screen-lg dark:bg-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold text-center mb-6">Doctors</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {localDoctors.map((doctor) => (
          <div
            key={doctor._id}
            className={`card p-6 border rounded-lg shadow-lg transform transition-all hover:scale-105 cursor-pointer ${
              selectedDoctorId === doctor._id
                ? "bg-blue-500 text-white border-blue-700"
                : "bg-white border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            }`}
            onClick={() => handleDoctorSelect(doctor._id)}
          >
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-24 h-24 object-cover rounded-full mx-auto"
            />
            <div className="text-center mt-4">
              <p className="text-xl font-semibold">{doctor.name}</p>
              <p className="text-gray-200">{doctor.email}</p>
              <p className="text-gray-400">{doctor.role}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedDoctorId && (
        <div className="mt-12 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Doctor Selected: {selectedDoctor.name}
          </h2>
          <h3 className="text-xl font-medium text-center text-gray-600 dark:text-gray-300">
            Doctor's Availability
          </h3>

          {availabilityLoading && <p>Loading availability...</p>}
          {availabilityError && (
            <p className="text-red-500">Error: {availabilityError}</p>
          )}

          {availabilities.length > 0 ? (
            <ul className="mt-6 space-y-4">
              {availabilities.map((availability) => (
                <li
                  key={availability._id}
                  className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg"
                >
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    Available Dates:
                  </h4>
                  {availability.availability.map((slotData, index) => (
                    <div key={index} className="mb-4">
                      <p className="text-gray-600 dark:text-gray-400">
                        <strong>Date:</strong>{" "}
                        {new Date(slotData.date).toLocaleDateString()}
                      </p>
                      <ul className="space-y-2">
                        {slotData.slots.map((slot) => (
                          <li
                            key={slot._id}
                            className="flex justify-between items-center"
                          >
                            <p className="text-sm text-gray-800 dark:text-gray-300">
                              <strong>Time:</strong> {slot.startTime} -{" "}
                              {slot.endTime}
                            </p>
                            <p
                              className={`text-sm font-medium ${
                                slot.isBooked
                                  ? "text-red-500"
                                  : "text-green-500"
                              }`}
                            >
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
          ) : (
            <p className="text-gray-500 dark:text-gray-300">
              No availability found for this doctor.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default DoctorsList;
