import React, { useState, useEffect } from "react";
import { useAuthContext } from "../contexts/userContext";
import { useDoctorContext } from "../contexts/doctorContext";
import { useAvailability } from "../doctorContextsAndBookingContexts/availabilityContext";
import { useBooking } from "../doctorContextsAndBookingContexts/BookingContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify components
import "react-toastify/dist/ReactToastify.css"; // Import styles

import { apiUrl } from "../../config/config.js";
const API_URL = apiUrl;

const AppointmentBooking = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookingStatus, setBookingStatus] = useState(null);

  const { user, loading: authLoading, error: authError } = useAuthContext();

  // Get the createBooking function from the context
  const {
    createBooking,
    loading: contextLoading,
    error: contextError,
  } = useBooking();

  const {
    doctor,
    loading: doctorLoading,
    error: doctorError,
    getDoctors,
    getDoctorById,
  } = useDoctorContext();
  const {
    availability,
    loading: availabilityLoading,
    error: availabilityError,
  } = useAvailability();
  const {
    booking,
    loading: bookingLoading,
    error: bookingError,
  } = useBooking();

  const patientId = user?._id;

  // Fetch list of doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/v1/doctors`);
        setDoctors(response.data);
        console.log("API URL hey all doctors check this out:", API_URL);
      } catch (err) {
        setError("Failed to fetch doctors");
        toast.error("Failed to fetch doctors!");
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  // Fetch availability based on selected doctor
  const fetchAvailability = async (doctorId) => {
    try {
      const response = await axios.get(
        `${API_URL}/api/v1/doctorAvailability/${doctorId}`
      );
      const doctorAvailability = response.data;
      console.log("API URL hey availability check this out:", API_URL);

      const dates = doctorAvailability.flatMap((doctor) =>
        doctor.availability.map((item) => {
          const date = new Date(item.date);
          return {
            date: date.toLocaleDateString(),
            dateString: item.date,
            slots: item.slots,
          };
        })
      );
      setAvailableDates(dates);
    } catch (err) {
      setError("Error fetching availability");
      toast.error("Error fetching availability!");
      console.error(err);
    }
  };

  // Handle doctor selection
  const handleDoctorSelect = (doctorId) => {
    setSelectedDoctor(doctorId);
    fetchAvailability(doctorId);
  };

  // Handle date selection
  const handleDateSelect = (dateString) => {
    setSelectedDate(dateString);
    const selected = availableDates.find(
      (date) => date.dateString === dateString
    );
    setAvailableSlots(selected.slots);
  };

  // Handle slot selection
  const handleSlotSelect = (slot) => {
    if (slot.isBooked) {
      // Prevent selection if the slot is booked
      toast.error("This slot is already booked. Please select another slot.");
      alert("This slot is already booked. Please select another slot.");
      return; // Prevent setting the selectedSlot
    }
    setSelectedSlot(slot);
    // Allow selection if the slot is available
    console.log("Selected slot:", slot);
  };

  // Book appointment
  //const handleBooking = async () => {
  //  if (!selectedDoctor || !selectedDate || !selectedSlot) {
  //    setBookingStatus("Please select a doctor, date, and slot.");
  //    return;
  //  }
  //
  //  try {
  //    const response = await axios.post(
  //      "http://localhost:3000/api/v1/bookings",
  //      {
  //        doctorId: selectedDoctor,
  //        patientId: patientId,
  //        date: selectedDate,
  //        slot: {
  //          startTime: selectedSlot.startTime,
  //          endTime: selectedSlot.endTime,
  //        },
  //      }
  //    );
  //    console.log("Booking successful:", response.data);
  //    setBookingStatus("Appointment booked successfully!");
  //  } catch (error) {
  //    console.error("Error booking appointment:", error);
  //    setBookingStatus("Failed to book appointment. Please try again.");
  //  }
  //};

  // Handle booking creation
  const handleBooking = async () => {
    if (!selectedDoctor || !selectedDate || !selectedSlot) {
      setBookingStatus("Please select a doctor, date, and slot.");
      return;
    }

    // Create the booking data based on the structure
    const bookingData = {
      doctorId: selectedDoctor,
      patientId: patientId,
      date: selectedDate,
      slot: {
        startTime: selectedSlot.startTime,
        endTime: selectedSlot.endTime,
      },
    };

    // Use createBooking function from context to create a new booking
    await createBooking(bookingData);

    if (!error) {
      setBookingStatus("Appointment booked successfully!");
      toast.success("Appointment booked successfully!"); // Success toast
    } else {
      setBookingStatus("Failed to book appointment. Please try again.");
      toast.error("Failed to book appointment. Please try again."); // Error toast
    }
  };

  // Loading and error states
  if (loading || authLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="text-white text-lg">Loading doctors...</div>
      </div>
    );
  }

  if (error || authError) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="text-red-500 text-lg">{error || authError}</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-800 text-white min-h-screen">
      <h2 className="text-3xl font-bold mb-6">Appointment Booking</h2>

      {/* Select doctor */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Select a Doctor</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <button
              key={doctor._id}
              onClick={() => handleDoctorSelect(doctor._id)}
              className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg shadow-md focus:outline-none transition duration-300"
            >
              {doctor.name}
            </button>
          ))}
        </div>
      </div>

      {/* Display available dates */}
      {availableDates.length > 0 && selectedDoctor && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">
            Please Select an Available Date
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableDates.map((date) => (
              <button
                key={date.dateString}
                onClick={() => handleDateSelect(date.dateString)}
                className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg shadow-md focus:outline-none transition duration-300"
              >
                {date.date}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Display available slots for the selected date */}
      {selectedDate && availableSlots.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">
            Available Slots for {new Date(selectedDate).toLocaleDateString()}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableSlots.map((slot) => (
              <div
                key={slot._id}
                onClick={() => handleSlotSelect(slot)}
                className={`bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-lg shadow-md cursor-pointer transition duration-300 ${
                  slot.isBooked ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <p className="text-lg font-semibold">
                  {slot.startTime} - {slot.endTime}
                </p>
                <p
                  className={`text-sm ${
                    slot.isBooked ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {slot.isBooked ? "Booked" : "Available"}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Show selected slot */}
      {selectedSlot && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Selected Slot</h3>
          <h3 className="text-xl font-semibold mb-4">
            You have selected [{" "}
            {new Date(selectedDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            ]. {selectedSlot.startTime} - {selectedSlot.endTime} Please confirm
            your appointment.
          </h3>

          <div className="bg-gray-700 p-6 rounded-lg">
            <p className="text-lg font-semibold">
              {selectedSlot.startTime} - {selectedSlot.endTime}
            </p>
            <p
              className={`text-sm ${
                selectedSlot.isBooked ? "text-red-500" : "text-green-500"
              }`}
            >
              {selectedSlot.isBooked ? "Booked" : "Available"}
            </p>
          </div>
        </div>
      )}

      {/* Book appointment */}
      {selectedSlot && (
        <div className="mt-8">
          <button
            onClick={handleBooking} // Use handleBooking here
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg shadow-md focus:outline-none transition duration-300"
          >
            Book Appointment
          </button>
        </div>
      )}

      {/* Display booking status */}
      {bookingStatus && (
        <div className="mt-8 text-lg font-semibold">{bookingStatus}</div>
      )}
      {/* Toast container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default AppointmentBooking;
