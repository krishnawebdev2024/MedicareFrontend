import React, { useEffect, useState } from "react";
import { useDoctorContext } from "../../contexts/doctorContext";
import { useAvailability } from "../../doctorContextsAndBookingContexts/availabilityContext";

const DoctorAndAvailability = () => {
  const { getDoctors, doctors, loading, error } = useDoctorContext();
  const {
    fetchAvailabilitiesById,
    availabilities,
    availabilityLoading,
    availabilityError,
  } = useAvailability();

  const [localDoctors, setLocalDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null); // State to store selected doctor ID
  const [selectedDoctor, setSelectedDoctor] = useState(null); // Store selected doctor's details

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
    const doctor = doctors.find((doc) => doc._id === id); // Find the doctor by ID
    setSelectedDoctorId(id); // Set the selected doctor ID
    setSelectedDoctor(doctor); // Set the selected doctor object
    fetchAvailabilitiesById(id); // Fetch availability based on selected doctor
  };

  if (loading) return <p>Loading doctors...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container p-5">
      <h1>Doctors</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {localDoctors.map((doctor) => (
          <div
            key={doctor._id}
            className={`card p-4 border border-gray-300 rounded shadow cursor-pointer hover:shadow-lg ${
              selectedDoctorId === doctor._id
                ? "bg-blue-200 border-blue-500"
                : ""
            }`}
            onClick={() => handleDoctorSelect(doctor._id)}
          >
            <img
              src={doctor.image}
              alt={doctor.name}
              width="100"
              height="100"
            />
            <p className="mt-2 font-semibold">{doctor.name}</p>
            <p>Email: {doctor.email}</p>
            <p>Role: {doctor.role}</p>
          </div>
        ))}
      </div>

      {selectedDoctorId && (
        <div className="mt-8">
          <h2>Doctor Selected: {selectedDoctor.name}</h2>
          <h3>Doctor's Availability</h3>

          {availabilityLoading && <p>Loading availability...</p>}
          {availabilityError && (
            <p className="text-red-500">Error: {availabilityError}</p>
          )}

          {availabilities.length > 0 ? (
            <ul>
              {availabilities.map((availability) => (
                <li key={availability._id} className="mb-4">
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
          ) : (
            <p>No availability found for this doctor.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default DoctorAndAvailability;
