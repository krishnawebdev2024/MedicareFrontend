import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo.png";

// Main Footer Component
const FooterLatest = () => {
  return (
    <div>
      <section className="flex flex-col justify-between bg-[#1C1D20] px-6 pt-12 text-white sm:px-10 sm:py-18">
        {/* Heading with responsive text size */}
        <div>
          <p className="text-3xl font-bold uppercase tracking-tight text-left sm:text-2xl md:text-4xl lg:text-6xl xl:text-7xl">
            Ready to Experience Healthcare Redefined?
          </p>
          <div className="mt-4">
            <Link to="/createAccount">
              <div className="flex items-center">
                <img src={Logo} alt="Logo" className="w-28 h-28" />

                <p className="text-white ">Sign-Up</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Horizontal line with consistent width and spacing */}
        <div className="w-full h-[1px] bg-slate-400 my-8 mx-auto" />

        {/* Buttons section with responsive layout */}
        <div className="flex flex-wrap gap-4">
          <Link to="/" className="hover:text-gray-300">
            <Button label="Home" />
          </Link>
          <Link to="/about" className="hover:text-gray-300">
            <Button label="About" />
          </Link>
          <Link to="/services" className="hover:text-gray-300">
            <Button label="Services" />
          </Link>
          <Link to="/contact" className="hover:text-gray-300">
            <Button label="Contact" />
          </Link>
        </div>

        {/* Horizontal line */}
        <div className="w-full h-[1px] bg-slate-400 my-8 mx-auto" />

        {/* Bottom information row */}
        <div className="flex flex-col md:flex-row items-center justify-between bg-[#1C1D20] text-white mb-10">
          <div className="flex flex-col">
            <p className="text-sm font-medium text-slate-400 mb-1">Version:</p>
            <p className="text-sm text-slate-400">2024 © MedicareApp Edition</p>
          </div>
        </div>
      </section>
    </div>
  );
};

// Button Component
const Button = ({ label }) => {
  return (
    <button className="p-4 rounded-full border-[1px] border-slate-400 hover:bg-slate-600 transition duration-300 text-slate-200">
      {label}
    </button>
  );
};

export default FooterLatest;
