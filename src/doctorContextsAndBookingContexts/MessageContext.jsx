import React, { createContext, useReducer, useContext } from "react";
import { useCallback } from "react";
import axios from "axios";

// API URL for doctorAvailability
//const API_URL = "http://localhost:3000";

import { apiUrl } from "../../config/config.js";
const API_URL = apiUrl;

// Create the Message Context
const MessageContext = createContext();

// Initial state
const initialState = {
  messages: [],
  currentMessage: null,
  loading: false,
  error: null,
};

// Reducer function
const messageReducer = (state, action) => {
  switch (action.type) {
    case "CREATE_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case "GET_ALL_MESSAGES":
      return {
        ...state,
        messages: action.payload,
        loading: false,
      };
    case "GET_MESSAGE_BY_ID":
      return {
        ...state,
        currentMessage: action.payload,
      };
    case "REPLY_TO_MESSAGE":
      return {
        ...state,
        messages: state.messages.map((message) =>
          message._id === action.payload._id ? action.payload : message
        ),
      };
    case "UPDATE_MESSAGE_STATUS":
      return {
        ...state,
        messages: state.messages.map((message) =>
          message._id === action.payload._id ? action.payload : message
        ),
      };
    case "CLEAR_MESSAGE_STATE":
      return {
        ...state,
        error: null,
        confirmationMessage: null,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "DELETE_MESSAGE":
      return {
        ...state,
        messages: state.messages.filter(
          (message) => message._id !== action.payload
        ),
      };

    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false, // Ensure loading is reset
      };
    default:
      return state;
  }
};

// Context Provider component
export const MessageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(messageReducer, initialState);

  // Create a new message (contact form)
  const createMessage = async (name, email, message) => {
    try {
      dispatch({ type: "SET_LOADING" });
      const response = await axios.post(`${API_URL}/api/v1/messages`, {
        name,
        email,
        message,
      });

      dispatch({
        type: "CREATE_MESSAGE",
        payload: response.data.data, // Store the newly created message
      });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error.response
          ? error.response.data.message
          : "Error occurred",
      });
    }
  };

  // Clear message state
  const clearMessageState = () => {
    dispatch({ type: "CLEAR_MESSAGE_STATE" });
  };

  // Get all messages (for admin view)
  //const getAllMessages = async () => {
  //  try {
  //    dispatch({ type: "SET_LOADING" });
  //    const response = await axios.get(`${API_URL}/api/v1/messages`);
  //
  //    dispatch({
  //      type: "GET_ALL_MESSAGES",
  //      payload: response.data.messages,
  //    });
  //  } catch (error) {
  //    dispatch({
  //      type: "SET_ERROR",
  //      payload: error.response
  //        ? error.response.data.message
  //        : "Error occurred",
  //    });
  //  }
  //};
  // Get all messages (for admin view)
  const getAllMessages = useCallback(async () => {
    try {
      dispatch({ type: "SET_LOADING" });
      const response = await axios.get(`${API_URL}/api/v1/messages`);

      dispatch({
        type: "GET_ALL_MESSAGES",
        payload: response.data.messages,
      });
      //console.log("API URL hey admin check this out:", API_URL);
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error.response
          ? error.response.data.message
          : "Error occurred",
      });
    }
  }, []);

  // Get a single message by ID
  const getMessageById = async (id) => {
    try {
      dispatch({ type: "SET_LOADING" });
      const response = await axios.post(
        `${API_URL}/api/v1/messages/get-message`,
        { id }
      );

      dispatch({
        type: "GET_MESSAGE_BY_ID",
        payload: response.data.message,
      });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error.response
          ? error.response.data.message
          : "Error occurred",
      });
    }
  };

  // Reply to a message
  const replyToMessage = async (id, response) => {
    try {
      dispatch({ type: "SET_LOADING" });
      const responseData = await axios.post(
        `${API_URL}/api/v1/messages/reply`,
        { id, response }
      );

      dispatch({
        type: "REPLY_TO_MESSAGE",
        payload: responseData.data.data, // Updated message with reply
      });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error.response
          ? error.response.data.message
          : "Error occurred",
      });
    }
  };

  // Delete a message
  const deleteMessage = async (id) => {
    try {
      dispatch({ type: "SET_LOADING" });
      const response = await axios.delete(`${API_URL}/api/v1/messages/delete`, {
        data: { id }, // Send id in the body
      });

      // Dispatch to update the state
      dispatch({
        type: "DELETE_MESSAGE",
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error.response
          ? error.response.data.message
          : "Error occurred",
      });
    }
  };

  // Update message status
  const updateMessageStatus = async (id, status) => {
    try {
      dispatch({ type: "SET_LOADING" });
      const responseData = await axios.post(
        `${API_URL}/api/v1/messages/update-status`,
        { id, status }
      );

      dispatch({
        type: "UPDATE_MESSAGE_STATUS",
        payload: responseData.data.data, // Updated message status
      });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error.response
          ? error.response.data.message
          : "Error occurred",
      });
    }
  };

  return (
    <MessageContext.Provider
      value={{
        state,
        dispatch,
        createMessage,
        clearMessageState,
        getAllMessages,
        getMessageById,
        replyToMessage,
        updateMessageStatus,
        deleteMessage,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

// Custom hook to use message context
export const useMessageContext = () => {
  return useContext(MessageContext);
};
