import React, { useEffect, useRef, useState } from "react";
import { FaVirus } from "react-icons/fa";
import { FaShieldVirus, FaSyringe } from "react-icons/fa";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import "./Corona.css";
import CoronaVirus from "../../../public/Corona.jsx";

const Corona = () => {
  const [rotation, setRotation] = useState([0, 0, 0]); // rotation state for the model
  const scrollRef = useRef(null); // reference to the Canvas container

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY; // Get the vertical scroll position
      const rotationAmount = scrollY * 0.001; // Control the speed of rotation
      setRotation([0, rotationAmount, 0]); // Update rotation on the Y-axis
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const vaccineData = [
    {
      name: "Pfizer-BioNTech",
      efficacy: "95%",
      availableDates: ["2024-12-05", "2024-12-10", "2024-12-15"],
    },
    {
      name: "Moderna",
      efficacy: "94.1%",
      availableDates: ["2024-12-07", "2024-12-12", "2024-12-18"],
    },
    {
      name: "Johnson & Johnson",
      efficacy: "66%",
      availableDates: ["2024-12-08", "2024-12-13", "2024-12-19"],
    },
  ];

  return (
    <>
      <div className=" mx-auto mt-[80px] bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen py-10 px-4">
        <div className="max-w-screen-2xl mx-auto bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen py-10 px-4">
          <div className="flex items-center space-x-3">
            <FaVirus className="text-indigo-600 dark:text-indigo-400 text-4xl" />
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              COVID-19 Info
            </h1>
          </div>

          {/* Header */}
          <header className="text-center mb-10">
            <h1 className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
              COVID-19 Vaccination and Precautions
            </h1>
            <p className="text-lg mt-4">
              Stay informed and protected. Together, we can overcome the
              pandemic.
            </p>
          </header>

          {/* Vaccine Info Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Available Vaccines</h2>
            <div className="overflow-x-auto shadow-lg rounded-lg bg-white dark:bg-gray-800">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-indigo-600 text-white">
                    <th className="px-4 py-3 text-left">Vaccine</th>
                    <th className="px-4 py-3 text-left">Efficacy</th>
                    <th className="px-4 py-3 text-left">Available Dates</th>
                  </tr>
                </thead>
                <tbody>
                  {vaccineData.map((vaccine, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-gray-100 dark:bg-gray-700" : ""
                      }`}
                    >
                      <td className="px-4 py-3">{vaccine.name}</td>
                      <td className="px-4 py-3">{vaccine.efficacy}</td>
                      <td className="px-4 py-3 space-y-1">
                        {vaccine.availableDates.map((date, i) => (
                          <span
                            key={i}
                            className="inline-block bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-200 px-3 py-1 rounded-full text-sm"
                          >
                            {date}
                          </span>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <div className="flex mt-[100px]  flex-col md:flex-row justify-center">
            {/* Vaccination Section */}
            <div className="relative mb-10">
              {/* Glowing Border */}
              <div className="rounded-lg p-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-6 shadow-lg">
                  {/* Descriptive Text */}
                  <div className="text-center mb-6">
                    <h2 className="text-3xl font-semibold text-indigo-600 dark:text-indigo-400">
                      Visualizing the COVID-19 Virus
                    </h2>
                    <p className="mt-2 text-gray-700 dark:text-gray-300">
                      Explore an interactive 3D model of the virus that has
                      impacted the world. Rotate, zoom, and understand its
                      structure.
                    </p>
                  </div>

                  {/* 3D Canvas */}
                  <div className="rounded-lg border-2 border-indigo-500 dark:border-indigo-400 overflow-hidden">
                    <Canvas camera={{ position: [0, 0, 95], fov: 75 }}>
                      <ambientLight intensity={1.5} />
                      <Suspense fallback={null}>
                        <CoronaVirus scale={0.5} rotation={rotation} />{" "}
                        {/* Apply rotation to model */}
                      </Suspense>
                      <OrbitControls
                        enableZoom={true}
                        enablePan={true}
                        maxDistance={100}
                        minDistance={10}
                      />
                      <Environment preset="sunset" />
                    </Canvas>
                  </div>
                </div>
              </div>

              {/* Optional Background Glow */}
              <div className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 blur-lg opacity-50"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-6">
        <div className="mx-auto max-w-screen-2xl py-2 px-6 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
          {/* Header */}
          <div className="text-center mb-10">
            <FaShieldVirus className="text-5xl text-indigo-600 dark:text-indigo-400 mx-auto mb-4" />
            <h1 className="text-3xl md:text-5xl font-bold text-indigo-600 dark:text-indigo-400">
              Understanding COVID-19
            </h1>
            <p className="text-lg mt-4 text-gray-700 dark:text-gray-300">
              Learn about the virus, its impact, and how we can stay protected.
            </p>
          </div>

          {/* Key Facts Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Key Facts About COVID-19
            </h2>
            <div className="space-y-6">
              {[
                {
                  title: "Symptoms",
                  description:
                    "Common symptoms include fever, cough, shortness of breath, fatigue, and loss of taste or smell. Severe cases can lead to pneumonia or organ failure.",
                },
                {
                  title: "Transmission",
                  description:
                    "The virus spreads through respiratory droplets and contact with contaminated surfaces. Crowded and poorly ventilated areas pose higher risks.",
                },
                {
                  title: "Variants",
                  description:
                    "Variants like Delta and Omicron are more transmissible. Staying updated on new developments is crucial for protection.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-md"
                >
                  <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Vaccination Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              The Importance of Vaccination
            </h2>
            <div className="flex items-center space-x-4">
              <FaSyringe className="text-4xl text-green-500 dark:text-green-400" />
              <p className="text-gray-700 dark:text-gray-300">
                Vaccines help reduce severe illness, hospitalization, and death.
                They also protect vulnerable populations and contribute to
                community immunity.
              </p>
            </div>
          </section>

          {/* Impact Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
              How COVID-19 Affects Daily Life
            </h2>
            <ul className="list-disc list-inside space-y-2 pl-4 text-gray-700 dark:text-gray-300">
              <li>
                <strong>Work:</strong> Remote working has become the norm in
                many industries.
              </li>
              <li>
                <strong>Education:</strong> Many schools transitioned to online
                learning during lockdowns.
              </li>
              <li>
                <strong>Mental Health:</strong> Prolonged isolation has led to
                increased stress and anxiety for many.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4  mt-12 text-gray-800 dark:text-gray-200">
              Precautions to Follow
            </h2>
            <ul className="list-disc list-inside space-y-2 pl-4 text-gray-700 dark:text-gray-300">
              <li>Wear a mask in public places.</li>
              <li>Maintain social distancing (at least 6 feet).</li>
              <li>Wash hands regularly with soap for at least 20 seconds.</li>
              <li>Avoid crowded areas and poorly ventilated spaces.</li>
              <li>Get vaccinated to protect yourself and others.</li>
            </ul>
          </section>

          {/* Conclusion */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200 ">
              Hope for the Future
            </h2>
            <p className="text-gray-700 dark:text-gray-300 pb-20">
              With widespread vaccination and better treatments, the world is
              gradually recovering. Staying informed and vigilant is our best
              defense.
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default Corona;
