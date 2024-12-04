import React, { useState } from "react";
import { useMessageContext } from "../doctorContextsAndBookingContexts/MessageContext.jsx";

const CreateMessageForm = () => {
  const {
    createMessage,
    clearMessageState,
    state: { loading, error, confirmationMessage },
  } = useMessageContext();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      return alert("Please fill in all fields.");
    }

    await createMessage(name, email, message);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    clearMessageState();
    if (!error) {
      setName("");
      setEmail("");
      setMessage("");
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto mt-10  lg:flex lg:gap-8">
      {/* Left Text Section */}
      <div className="lg:w-1/2 text-center lg:text-left">
        <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
          Get in Touch
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
          Have any questions or need assistance? We are here to help you with
          any inquiries.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-300">
          Please fill out the form on the right, and our team will get back to
          you as soon as possible.
        </p>
      </div>

      {/* Right Form Section */}
      <div className="lg:w-1/2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Message
            </label>
            <textarea
              id="message"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>

          <div className="mb-4 text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500"
              disabled={loading}
            >
              Submit
            </button>
          </div>
        </form>

        {isModalOpen && (
          <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full dark:bg-gray-800">
              <h3
                className={`text-lg font-semibold mb-4 ${
                  error ? "text-red-600" : "text-green-600"
                }`}
              >
                {error ? "Error" : "Message Successfully Sent"}
              </h3>
              <p className="mb-4 text-gray-800 dark:text-gray-200">
                {error || confirmationMessage}
              </p>
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateMessageForm;
