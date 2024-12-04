import React from "react";
import Map from "../Map/Map";
import CreateMessageForm from "../../messageComponents/createMessage.jsx";

const Contact = () => {
  return (
    <div className="mt-[80px] bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-12">
      {/* Create Message Form */}
      <h1 className="text-5xl font-extrabold text-center text-blue-600 dark:text-blue-400 mb-8">
        Contact
      </h1>
      {/* Maps Section */}
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex items-center justify-center">
        <div className="max-w-6xl w-full p-6 space-y-8">
          <div className="text-left">
            <h1 className="text-4xl font-bold mb-4 text-blue-600 dark:text-blue-400">
              Your Health, Our Priority
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Explore our state-of-the-art healthcare facilities located in key
              cities. Whether you need a routine check-up or specialized care,
              our team is here to provide personalized services for your
              well-being. Use the interactive map below to find the nearest
              center.
            </p>
          </div>
          <CreateMessageForm />

          {/* Heading and Description */}
          <div className="text-left">
            <h1 className="text-4xl font-bold mb-4 text-blue-600 dark:text-blue-400">
              Medicare Locations
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Find our Medicare centers in Berlin and Düsseldorf. We are here to
              help you with all your healthcare needs. Use the map below to
              locate us easily.
            </p>
          </div>

          {/* Container for the side-by-side layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left side - Information Section */}
            <div className="space-y-4 p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Our Locations
              </h2>
              <div className="mb-10 space-y-6">
                {/* Medicare Center Berlin */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                  <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
                    Medicare Center Berlin
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    Located in the heart of Berlin, we offer a wide range of
                    medical services.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    <strong className="text-blue-600 dark:text-blue-400">
                      Address:
                    </strong>{" "}
                    Kaiserstraße 42, 10115 Berlin, Germany
                  </p>
                </div>

                {/* Medicare Center Düsseldorf */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                  <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
                    Medicare Center Düsseldorf
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    Our Düsseldorf center provides personalized healthcare
                    services to meet your needs.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    <strong className="text-blue-600 dark:text-blue-400">
                      Address:
                    </strong>{" "}
                    Rheinweg 8, 40213 Düsseldorf, Germany
                  </p>
                </div>
              </div>
            </div>

            {/* Right side - Map Section */}
            <div className="w-full h-[350px] md:h-[500px] bg-gray-200 rounded-lg shadow-lg">
              <Map />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
