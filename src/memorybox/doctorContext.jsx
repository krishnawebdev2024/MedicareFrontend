import { useContext, createContext, useReducer, useEffect } from "react";
import axios from "axios";
import doctorsReducer from "../reducers/doctorsReducer";

const DoctorContext = createContext();

const initialState = {
  loading: false,
  doctor: null,
  error: null,
};

export const DoctorProvider = ({ children }) => {
  const [{ loading, doctor, error }, dispatch] = useReducer(
    doctorsReducer,
    initialState
  );

  const URL = "http://localhost:3000";

  // Login action for doctor
  const login = async (email, password) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const response = await axios.post(
        `${URL}/api/v1/doctors/login`,
        { email, password },
        { withCredentials: true }
      );

      if (response.data && response.data.doctor) {
        const doctorData = response.data.doctor;
        console.log("doctorData", doctorData);
        // Save the doctor data to local storage
        localStorage.setItem("loggedInDoctor", JSON.stringify(doctorData));

        dispatch({ type: "LOGIN", payload: doctorData });
        return doctorData;
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

  // Logout action for doctor
  const logout = async () => {
    dispatch({ type: "SET_LOADING" });
    try {
      await axios.post(
        `${URL}/api/v1/doctors/logout`,
        {},
        { withCredentials: true }
      );

      // Remove the doctor data from local storage
      localStorage.removeItem("loggedInDoctor");

      dispatch({ type: "LOGOUT" });
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: "Logout failed" });
    }
  };

  // Check session for doctor
  const checkSession = async () => {
    dispatch({ type: "SET_LOADING" });
    try {
      const response = await axios.get(`${URL}/api/v1/doctors/session`, {
        withCredentials: true,
      });
      console.log(response.data);
      if (response.data.authenticated) {
        dispatch({ type: "SET_DOCTOR", payload: response.data.doctor });
      } else {
        dispatch({ type: "LOGOUT" });
      }
    } catch (err) {
      console.error("Error checking session:", err); // Log the error for debugging
      dispatch({ type: "LOGOUT" });
    }
  };

  // Check session on mount
  useEffect(() => {
    checkSession();
  }, []);

  return (
    <DoctorContext.Provider value={{ doctor, loading, error, login, logout }}>
      {children}
    </DoctorContext.Provider>
  );
};

export const useDoctorContext = () => useContext(DoctorContext);

// Check session on mount and read from localStorage if necessary
/* useEffect(() => {
    const storedDoctor = localStorage.getItem("loggedInDoctor");
    if (storedDoctor) {
      const doctorData = JSON.parse(storedDoctor);
      dispatch({ type: "SET_DOCTOR", payload: doctorData });
    } else {
      checkSession();
    }
  }, []); */
