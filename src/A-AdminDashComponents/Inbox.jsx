import React, { useEffect } from "react";
import { useMessageContext } from "../doctorContextsAndBookingContexts/MessageContext.jsx";
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import the Toastify CSS

const Inbox = () => {
  const { state, getAllMessages, deleteMessage } = useMessageContext();
  const { messages, loading, error } = state;

  useEffect(() => {
    getAllMessages();
  }, [getAllMessages]);

  const handleDelete = async (id) => {
    try {
      console.log("Deleting message with id:", id);
      await deleteMessage(id);
      await getAllMessages();
      toast.success("Message successfully deleted!"); // Show success toast
    } catch (error) {
      console.error("Error while deleting the message:", error);
      toast.error("Failed to delete the message. Please try again!"); // Show error toast
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin inline-block w-16 h-16 rounded-full border-t-transparent border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-slate-600">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center space-y-4">
          <div className="flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-red-500 animate-bounce"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h.01M12 8h.01M21 12c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9 9-4.03 9-9z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-gray-800">Inbox Empty</h1>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {messages.length === 0 ? (
        <p className="text-center text-gray-500">No messages available.</p>
      ) : (
        messages.map((message) => (
          <div
            key={message._id}
            className="bg-gray-800 border border-b-gray-300 border-1 text-white p-6 rounded-lg shadow-md transition-all duration-300 hover:bg-gray-700"
          >
            <h3 className="text-xl font-semibold">{message.name}</h3>
            <p className="text-sm text-gray-400">{message.email}</p>
            <p className="mt-2 text-gray-300">{message.message}</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-xs text-gray-400">
                {new Date(message.createdAt).toLocaleString()}
              </span>
            </div>

            <div className="mt-4 flex justify-between items-center">
              {/* Delete Button */}
              <button
                onClick={() => handleDelete(message._id)}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>

            {message.response && (
              <div className="mt-4 text-gray-300">
                <strong>Response:</strong> {message.response}
              </div>
            )}
          </div>
        ))
      )}
      <ToastContainer position="bottom-center" />{" "}
      {/* Ensuring ToastContainer is placed at the bottom-center */}
    </div>
  );
};

export default Inbox;
