import React, { createContext, useReducer, useContext } from "react";
import axios from "axios";

import { apiUrl } from "../../config/config.js";

// Create Booking Context
const BookingContext = createContext();

//const API_URL = "http://localhost:3000";
const API_URL = apiUrl;

// Initial state for booking
const initialState = {
  bookings: [],
  loading: false,
  error: null,
};

// Reducer function to handle actions
const bookingReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_BOOKINGS_REQUEST":
      return { ...state, loading: true, error: null };
    case "FETCH_BOOKINGS_SUCCESS":
      return { ...state, loading: false, bookings: action.payload };
    case "FETCH_BOOKINGS_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "CREATE_BOOKING_SUCCESS":
      return { ...state, bookings: [...state.bookings, action.payload] };
    case "UPDATE_BOOKING_SUCCESS":
      return {
        ...state,
        bookings: state.bookings.map((booking) =>
          booking._id === action.payload._id ? action.payload : booking
        ),
      };
    case "DELETE_BOOKING_SUCCESS":
      return {
        ...state,
        bookings: state.bookings.filter(
          (booking) => booking._id !== action.payload
        ),
      };
    default:
      return state;
  }
};

// Context provider component
const BookingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  // Fetch all bookings
  const fetchBookings = async () => {
    dispatch({ type: "FETCH_BOOKINGS_REQUEST" });
    try {
      const { data } = await axios.get(`${API_URL}/api/v1/bookings`);
      dispatch({ type: "FETCH_BOOKINGS_SUCCESS", payload: data });
      //console.log("API URL hey buddy check this out:", API_URL);
    } catch (error) {
      dispatch({
        type: "FETCH_BOOKINGS_FAILURE",
        payload: error.response?.data?.message || error.message,
      });
    }
  };

  // Fetch bookings for a specific doctor
  const fetchBookingsByDoctor = async (doctorId) => {
    dispatch({ type: "FETCH_BOOKINGS_REQUEST" });
    try {
      const { data } = await axios.get(
        `${API_URL}/api/v1/bookings/doctor/${doctorId}`
      );
      dispatch({ type: "FETCH_BOOKINGS_SUCCESS", payload: data });
    } catch (error) {
      dispatch({
        type: "FETCH_BOOKINGS_FAILURE",
        payload: error.response?.data?.message || error.message,
      });
    }
  };

  // Fetch bookings for a specific patient
  const fetchBookingsByPatient = async (patientId) => {
    dispatch({ type: "FETCH_BOOKINGS_REQUEST" });
    try {
      const { data } = await axios.get(
        `${API_URL}/api/v1/bookings/patient/${patientId}`
      );
      dispatch({ type: "FETCH_BOOKINGS_SUCCESS", payload: data });
    } catch (error) {
      dispatch({
        type: "FETCH_BOOKINGS_FAILURE",
        payload: error.response?.data?.message || error.message,
      });
    }
  };

  // Create a new booking
  const createBooking = async (bookingData) => {
    try {
      const { data } = await axios.post(
        `${API_URL}/api/v1/bookings`,
        bookingData
      );
      dispatch({ type: "CREATE_BOOKING_SUCCESS", payload: data });
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  };

  // Update booking status
  const updateBookingStatus = async (id, status) => {
    try {
      const { data } = await axios.put(`${API_URL}/api/v1/bookings/${id}`, {
        status,
      });
      dispatch({ type: "UPDATE_BOOKING_SUCCESS", payload: data });
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  };

  // Delete a booking
  const deleteBooking = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/v1/bookings/${id}`);
      dispatch({ type: "DELETE_BOOKING_SUCCESS", payload: id });
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <BookingContext.Provider
      value={{
        bookings: state.bookings,
        loading: state.loading,
        error: state.error,
        fetchBookings,
        fetchBookingsByDoctor,
        fetchBookingsByPatient,
        createBooking,
        updateBookingStatus,
        deleteBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

// Custom Hook for Convenience
export const useBooking = () => useContext(BookingContext);

export default BookingProvider;
