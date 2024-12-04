//import React, { useState, useEffect } from "react";
//import { AnimatePresence } from "framer-motion";
//import Preloader from "./AnimeComponents/preloader/Preloader";
//import ScrollToTop from "./AnimeComponents/ScrollToTop/ScrollToTop";
//import {
//  BrowserRouter as Router,
//  Routes,
//  Route,
//  useLocation,
//} from "react-router-dom";
//
//import { AuthProvider } from "./contexts/index";
//import { AdminProvider } from "./contexts/index";
//import { DoctorProvider } from "./contexts/index";
//
//import AvailabilityProvider from "./doctorContextsAndReducers/availabilityContext";
//
//import NavBar from "./PageComponents/Navbar/NavBar";
//import Home from "./PageComponents/Home/Home";
//import About from "./PageComponents/About/About";
//import Services from "./PageComponents/Services/Services";
//import Contact from "./PageComponents/Contact/Contact";
//import FooterLatest from "./PageComponents/FooterLatest/FooterLatest";
//
//import AdminDashboardLayout from "./Dashboard/AdminDashboardLayout";
//import DoctorDashboardLayout from "./Dashboard/DoctorDashboardLayout";
//import PatientDashboardLayout from "./Dashboard/PatientDashboardLayout";
//
//import Form from "./01-UserAccountCreate/Form";
//import LoginPage from "./01-UserAccountCreate/LoginPage";
//
//import AdminLoginPage from "./02-AdminAccountCreate/AdminLoginPage";
//import AdminRegisterForm from "./02-AdminAccountCreate/AdminRegisterForm";
//
//import DoctorRegisterForm from "./03-DoctorAccountCreate/DoctorRegisterForm";
//import DoctorLoginPage from "./03-DoctorAccountCreate/DoctorLoginPage";
//
//// Wrapper to choose provider based on the URL
//const ConditionalProvider = ({ children }) => {
//  const location = useLocation();
//
//  // Check if "doctor" is in the current URL
//  if (location.pathname.includes("doctor")) {
//    return <DoctorProvider>{children}</DoctorProvider>;
//  } else if (location.pathname.includes("patient")) {
//    return <AuthProvider>{children}</AuthProvider>;
//  } else {
//    return <AdminProvider>{children}</AdminProvider>;
//  }
//};
//
//export default function App() {
//  const [isLoading, setIsLoading] = useState(true);
//
//  // Simulate loading behavior
//  useEffect(() => {
//    // Disable scroll while preloader is active
//    document.body.style.overflow = "hidden";
//
//    // Simulate loading state for a few seconds
//    const timer = setTimeout(() => {
//      setIsLoading(false); // Hide preloader after loading is complete
//      document.body.style.overflow = "auto"; // Re-enable scroll
//    }, 2000); // You can change the duration here to match your needs
//
//    return () => {
//      clearTimeout(timer);
//      document.body.style.overflow = "auto"; // Ensure scroll is re-enabled when component unmounts
//    };
//  }, []);
//
//  return (
//    <>
//      <AnimatePresence mode="wait">
//        {isLoading && <Preloader />}
//      </AnimatePresence>
//
//      <AdminProvider>
//        <AvailabilityProvider>
//          <Router
//            future={{
//              v7_startTransition: true,
//              v7_relativeSplatPath: true,
//            }}
//          >
//            <ConditionalProvider>
//              <ScrollToTop />
//              <NavBar />
//
//              <Routes>
//                <Route exact path="/" element={<Home />} />
//                <Route path="/about" element={<About />} />
//                <Route path="/services" element={<Services />} />
//                <Route path="/contact" element={<Contact />} />
//                {/* Sign-up and Login routes for patients */}
//                <Route path="/patient-register" element={<Form />} />
//                <Route path="/admin-register" element={<AdminRegisterForm />} />
//                <Route
//                  path="/doctor-register"
//                  element={<DoctorRegisterForm />}
//                />
//                <Route path="/patient-login" element={<LoginPage />} />
//                <Route path="/admin-login" element={<AdminLoginPage />} />
//                <Route path="/doctor-login" element={<DoctorLoginPage />} />
//
//                {/* Nested routes  */}
//                <Route
//                  path="admindashboard/*"
//                  element={<AdminDashboardLayout />}
//                />
//                <Route
//                  path="doctordashboard/*"
//                  element={<DoctorDashboardLayout />}
//                />
//                <Route
//                  path="patientdashboard/*"
//                  element={<PatientDashboardLayout />}
//                />
//              </Routes>
//
//              <FooterLatest />
//            </ConditionalProvider>
//          </Router>
//        </AvailabilityProvider>
//      </AdminProvider>
//    </>
//  );
//}
