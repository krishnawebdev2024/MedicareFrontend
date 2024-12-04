import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "./AnimeComponents/preloader/Preloader";
import ScrollToTop from "./AnimeComponents/ScrollToTop/ScrollToTop";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

import { AuthProvider } from "./contexts/index";
import { AdminProvider } from "./contexts/index";
import { DoctorProvider } from "./contexts/index";

import AvailabilityProvider from "./doctorContextsAndBookingContexts/availabilityContext";
import BookingProvider from "./doctorContextsAndBookingContexts/BookingContext";
import { MessageProvider } from "./doctorContextsAndBookingContexts/MessageContext.jsx"; // Adjusted import to match the path

import NavBar from "./PageComponents/Navbar/NavBar";
import Home from "./PageComponents/Home/Home";
import About from "./PageComponents/About/About";
import Services from "./PageComponents/Services/Services";
import Contact from "./PageComponents/Contact/Contact";
import Corona from "./PageComponents/corona/Corona.jsx";
import FooterLatest from "./PageComponents/FooterLatest/FooterLatest";

import AdminDashboardLayout from "./Dashboard/AdminDashboardLayout";
import DoctorDashboardLayout from "./Dashboard/DoctorDashboardLayout";
import PatientDashboardLayout from "./Dashboard/PatientDashboardLayout";

import Form from "./01-UserAccountCreate/Form";
import LoginPage from "./01-UserAccountCreate/LoginPage";

import AdminLoginPage from "./02-AdminAccountCreate/AdminLoginPage";
import AdminRegisterForm from "./02-AdminAccountCreate/AdminRegisterForm";

import DoctorRegisterForm from "./03-DoctorAccountCreate/DoctorRegisterForm";
import DoctorLoginPage from "./03-DoctorAccountCreate/DoctorLoginPage";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading behavior
  useEffect(() => {
    // Disable scroll while preloader is active
    document.body.style.overflow = "hidden";

    // Simulate loading state for a few seconds
    const timer = setTimeout(() => {
      setIsLoading(false); // Hide preloader after loading is complete
      document.body.style.overflow = "auto"; // Re-enable scroll
    }, 2000); // You can change the duration here to match your needs

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto"; // Ensure scroll is re-enabled when component unmounts
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>
      {/* Provider to make authentication state available globally */}
      <AuthProvider>
        <AdminProvider>
          <DoctorProvider>
            <AvailabilityProvider>
              <BookingProvider>
                <MessageProvider>
                  <Router
                    future={{
                      v7_startTransition: true,
                      v7_relativeSplatPath: true,
                    }}
                  >
                    <ScrollToTop />
                    <NavBar />

                    <Routes>
                      <Route exact path="/" element={<Home />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/services" element={<Services />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/corona" element={<Corona />} />

                      {/* Sign-up and Login routes for patients */}
                      <Route path="/patient-register" element={<Form />} />
                      <Route
                        path="/admin-register"
                        element={<AdminRegisterForm />}
                      />
                      <Route
                        path="/doctor-register"
                        element={<DoctorRegisterForm />}
                      />
                      <Route path="/patient-login" element={<LoginPage />} />
                      <Route path="/admin-login" element={<AdminLoginPage />} />
                      <Route
                        path="/doctor-login"
                        element={<DoctorLoginPage />}
                      />

                      {/* Nested routes  */}
                      <Route
                        path="admindashboard/*"
                        element={<AdminDashboardLayout />}
                      />
                      <Route
                        path="doctordashboard/*"
                        element={<DoctorDashboardLayout />}
                      />
                      <Route
                        path="patientdashboard/*"
                        element={<PatientDashboardLayout />}
                      />
                    </Routes>

                    <FooterLatest />
                  </Router>
                </MessageProvider>
              </BookingProvider>
            </AvailabilityProvider>
          </DoctorProvider>
        </AdminProvider>
      </AuthProvider>
      {/* Toast container for showing toast notifications */}
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        style={{ top: "200px" }} // Moves the toast 100px down from the top
      />
    </>
  );
}
