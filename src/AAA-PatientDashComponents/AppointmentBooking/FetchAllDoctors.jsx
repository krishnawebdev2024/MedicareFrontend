import React, { useEffect, useState } from "react";
import { useDoctorContext } from "../../contexts/doctorContext";

const DoctorList = () => {
  const { getDoctors, doctors, loading, error } = useDoctorContext();
  const [localDoctors, setLocalDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        if (doctors.length === 0) {
          await getDoctors(); // Fetch doctors using context if it's not already fetched
        }
      } catch (err) {
        console.error("Error fetching doctors:", err);
      }
    };

    fetchDoctors();
  }, [getDoctors, doctors.length]); // Re-run only if 'doctors' length changes

  useEffect(() => {
    setLocalDoctors(doctors); // Update local state after doctors are fetched
  }, [doctors]); // Runs when 'doctors' data from context is updated

  if (loading) return <p>Loading doctors...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="mb-9">
      <h1>Doctor List</h1>
      <ul>
        {localDoctors.map((doctor) => (
          <li key={doctor._id}>
            <img
              src={doctor.image}
              alt={doctor.name}
              width="100"
              height="100"
            />
            <p>Name: {doctor.name}</p>
            <p>Email: {doctor.email}</p>
            <p>id: {doctor._id}</p>
            <p>Role: {doctor.role}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorList;
