import React, { createContext, useReducer, useContext } from "react";
import axios from "axios";

// Initial State
const initialState = {
  availabilities: [],
  loading: false,
  error: null,
  success: false,
};

// Base URL for API
const API_URL = "http://localhost:3000/api/v1/doctorAvailability";

// Reducer Function
const availabilityReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: true, error: null };

    case "SET_ERROR":
      return { ...state, loading: false, error: action.payload };

    case "SET_SUCCESS":
      return { ...state, loading: false, success: true, error: null };

    case "RESET_SUCCESS":
      return { ...state, success: false };

    case "SET_AVAILABILITIES":
      return { ...state, availabilities: action.payload, loading: false };

    case "ADD_AVAILABILITY":
      return {
        ...state,
        availabilities: [...state.availabilities, action.payload],
        loading: false,
      };

    case "UPDATE_AVAILABILITY":
      return {
        ...state,
        availabilities: state.availabilities.map((availability) =>
          availability._id === action.payload._id
            ? { ...availability, ...action.payload }
            : availability
        ),
        loading: false,
      };

    case "DELETE_AVAILABILITY":
      return {
        ...state,
        availabilities: state.availabilities.filter(
          (availability) => availability._id !== action.payload
        ),
        loading: false,
      };

    case "DELETE_SLOT": {
      const { availabilityId, slotId } = action.payload;
      return {
        ...state,
        availabilities: state.availabilities.map((availability) => {
          if (availability._id === availabilityId) {
            return {
              ...availability,
              // Check if slots exist and is an array before filtering
              slots: Array.isArray(availability.slots)
                ? availability.slots.filter((slot) => slot._id !== slotId)
                : [], // If slots doesn't exist or is not an array, return an empty array
            };
          }
          return availability;
        }),
        loading: false,
      };
    }

    default:
      return state;
  }
};

// Create Context
const AvailabilityContext = createContext();

// Custom Hook for Convenience
export const useAvailability = () => {
  return useContext(AvailabilityContext);
};

// Provider Component
const AvailabilityProvider = ({ children }) => {
  const [state, dispatch] = useReducer(availabilityReducer, initialState);

  // Fetch All Availabilities
  const fetchAvailabilities = async (doctorId) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const response = await axios.get(`${API_URL}/${doctorId}`);
      dispatch({ type: "SET_AVAILABILITIES", payload: response.data });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error.response ? error.response.data.message : error.message,
      });
    }
  };

  // Create New Availability
  const createAvailability = async (availabilityData) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const response = await axios.post(API_URL, availabilityData);
      dispatch({
        type: "ADD_AVAILABILITY",
        payload: response.data.newAvailability,
      });
      dispatch({ type: "SET_SUCCESS" });

      // Reset success after a timeout
      setTimeout(() => {
        dispatch({ type: "RESET_SUCCESS" });
      }, 3000);
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error.response ? error.response.data.message : error.message,
      });
    }
  };

  // Update Existing Availability
  const updateAvailability = async (availabilityId, updatedData) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const response = await axios.put(
        `${API_URL}/${availabilityId}`,
        updatedData
      );
      dispatch({
        type: "UPDATE_AVAILABILITY",
        payload: response.data.updatedAvailability,
      });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error.response ? error.response.data.message : error.message,
      });
    }
  };

  // Delete Availability
  const deleteAvailability = async (availabilityId) => {
    dispatch({ type: "SET_LOADING" });
    try {
      await axios.delete(`${API_URL}/${availabilityId}`);
      dispatch({ type: "DELETE_AVAILABILITY", payload: availabilityId });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error.response ? error.response.data.message : error.message,
      });
    }
  };

  // Delete Slot
  const deleteSlot = async (availabilityId, slotId) => {
    dispatch({ type: "SET_LOADING" });
    try {
      await axios.delete(`${API_URL}/${availabilityId}/slot/${slotId}`);
      dispatch({
        type: "DELETE_SLOT",
        payload: { availabilityId, slotId },
      });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error.response ? error.response.data.message : error.message,
      });
    }
  };

  // Value for Context
  const contextValue = {
    availabilities: state.availabilities,
    loading: state.loading,
    error: state.error,
    success: state.success,
    fetchAvailabilities,
    createAvailability,
    updateAvailability,
    deleteAvailability,
    deleteSlot, // Add deleteSlot to context value
  };

  return (
    <AvailabilityContext.Provider value={contextValue}>
      {children}
    </AvailabilityContext.Provider>
  );
};

export default AvailabilityProvider;
