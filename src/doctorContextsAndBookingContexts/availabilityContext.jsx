import React, { createContext, useReducer, useContext } from "react";
import axios from "axios";

import { apiUrl } from "../../config/config.js";

// Initial State
const initialState = {
  availabilities: [],
  loading: false,
  error: null,
  success: false,
};

// API URL for doctorAvailability
//const API_URL = "http://localhost:3000";
const API_URL = apiUrl;

// Reducer Function
function availabilityReducer(state, action) {
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
        availabilities: state.availabilities.map((availability) => {
          if (
            availability &&
            availability._id &&
            action.payload &&
            action.payload._id
          ) {
            return availability._id === action.payload._id
              ? { ...availability, availability: action.payload.availability }
              : availability;
          }
          return availability;
        }),
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
              slots: Array.isArray(availability.slots)
                ? availability.slots.filter((slot) => slot._id !== slotId)
                : [],
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
}

// Create Context
const AvailabilityContext = createContext();

// Provider Component
const AvailabilityProvider = ({ children }) => {
  const [state, dispatch] = useReducer(availabilityReducer, initialState);

  // Fetch All Availabilities
  const fetchAvailabilities = async (doctorId) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const response = await axios.get(
        `${API_URL}/api/v1/doctorAvailability/${doctorId}`
      );
      dispatch({ type: "SET_AVAILABILITIES", payload: response.data });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error.response ? error.response.data.message : error.message,
      });
    }
  };

  // Fetch Availability for a Specific Doctor
  const fetchAvailabilitiesById = async (doctorId) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const response = await axios.get(
        `${API_URL}/api/v1/doctorAvailability/${doctorId}`
      );
      //console.log("API URL hey doctor check this out:", API_URL);

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
      const response = await axios.post(
        `${API_URL}/api/v1/doctorAvailability`,
        availabilityData
      );
      dispatch({
        type: "ADD_AVAILABILITY",
        payload: response.data.newAvailability,
      });
      dispatch({ type: "SET_SUCCESS" });

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
        `${API_URL}/api/v1/doctorAvailability/${availabilityId}`,
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
      await axios.delete(
        `${API_URL}/api/v1/doctorAvailability/${availabilityId}`
      );
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
      await axios.delete(
        `${API_URL}/api/v1/doctorAvailability/${availabilityId}/slot/${slotId}`
      );

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
    fetchAvailabilitiesById,
    createAvailability,
    updateAvailability,
    deleteAvailability,
    deleteSlot,
  };

  return (
    <AvailabilityContext.Provider value={contextValue}>
      {children}
    </AvailabilityContext.Provider>
  );
};

// Custom Hook for Convenience
export const useAvailability = () => useContext(AvailabilityContext);

export default AvailabilityProvider;
