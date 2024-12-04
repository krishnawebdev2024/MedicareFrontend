import { useContext, createContext, useReducer, useEffect } from "react";
import axios from "axios";
import usersReducer from "../reducers/usersReducer";
import { apiUrl } from "../../config/config.js";

const UserContext = createContext();

const initialState = {
  loading: false,
  user: null,
  users: [],
  error: null,
};

export const AuthProvider = ({ children }) => {
  const [{ loading, user, users, error }, dispatch] = useReducer(
    usersReducer,
    initialState
  );

  //const API_URL = "http://localhost:3000";
  const API_URL = apiUrl;

  // Fetch all users action
  const fetchUsers = async () => {
    dispatch({ type: "SET_LOADING" });
    try {
      const response = await axios.get(`${API_URL}/api/v1/users`);
      dispatch({ type: "SET_USERS", payload: response.data }); // Dispatch users data to state
    } catch (err) {
      dispatch({
        type: "SET_ERROR",
        payload: err.response?.data?.message || "Failed to fetch users",
      });
    }
  };

  // Login action
  const login = async (email, password) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const response = await axios.post(
        `${API_URL}/api/v1/users/login`,
        { email, password },
        { withCredentials: true }
      );
      console.log("API URL patient its working:", API_URL);

      // Ensure response contains a user
      if (response.data && response.data.user) {
        const userData = response.data.user;
        // Save the user data to local storage
        localStorage.setItem("loggedInUser", JSON.stringify(userData));
        // Dispatch login action only if user exists
        dispatch({ type: "LOGIN", payload: userData });
        return userData;
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (err) {
      dispatch({
        type: "SET_ERROR",
        payload: err.response?.data?.message || "Login failed",
      });
      throw err;
    }
  };

  // Logout action
  const logout = async () => {
    dispatch({ type: "SET_LOADING" });
    try {
      await axios.post(
        `${API_URL}/api/v1/users/logout`,
        {},
        { withCredentials: true }
      );
      // Remove the user data from local storage
      localStorage.removeItem("loggedInUser");

      dispatch({ type: "LOGOUT" });
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: "Logout failed" });
    }
  };

  // Check session action
  const checkSession = async () => {
    dispatch({ type: "SET_LOADING" });
    try {
      const response = await axios.get(`${API_URL}/api/v1/users/session`, {
        withCredentials: true,
      });

      if (response.data.authenticated) {
        dispatch({ type: "SET_USER", payload: response.data.user });
        // console.log("Authenticated user is this person:", response.data.user);
      } else {
        dispatch({ type: "LOGOUT" });
      }
    } catch (err) {
      dispatch({ type: "LOGOUT" });
    }
  };

  // Check session on mount
  useEffect(() => {
    checkSession();
    console.log("Mounted");
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        users,
        fetchUsers,
        loading,
        error,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useAuthContext = () => useContext(UserContext);
