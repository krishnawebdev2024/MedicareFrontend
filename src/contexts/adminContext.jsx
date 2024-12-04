import { useContext, createContext, useReducer, useEffect } from "react";
import axios from "axios";
import adminsReducer from "../reducers/adminsReducer";
import { apiUrl } from "../../config/config.js";

const AdminContext = createContext();

const initialState = {
  loading: false,
  admin: null,
  error: null,
};

export const AdminProvider = ({ children }) => {
  const [{ loading, admin, error }, dispatch] = useReducer(
    adminsReducer,
    initialState
  );

  //const API_URL = "http://localhost:3000"; // Base URL for API
  const API_URL = apiUrl;

  // Login action for admin
  const login = async (email, password) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const response = await axios.post(
        `${API_URL}/api/v1/admins/login`,
        { email, password },
        { withCredentials: true }
      );
      //console.log("API URL its working:", API_URL);

      if (response.data && response.data.admin) {
        dispatch({ type: "LOGIN", payload: response.data.admin });

        return response.data.admin;
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

  // Logout action for admin
  const logout = async () => {
    dispatch({ type: "SET_LOADING" });
    try {
      await axios.post(
        `${API_URL}/api/v1/admins/logout`,
        {},
        { withCredentials: true }
      );
      dispatch({ type: "LOGOUT" });
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: "Logout failed" });
    }
  };

  // Check session for admin
  const checkSession = async () => {
    dispatch({ type: "SET_LOADING" });
    try {
      const response = await axios.get(`${API_URL}/api/v1/admins/session`, {
        withCredentials: true,
      });
      if (response.data.authenticated) {
        dispatch({ type: "SET_ADMIN", payload: response.data.admin });
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
  }, []);

  return (
    <AdminContext.Provider value={{ admin, loading, error, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => useContext(AdminContext);
