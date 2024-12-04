import React, { useState } from "react";
import HeroImage from "../../assets/HeroImage.png";
import AccordionImage from "../../assets/accordionImage.png";
import { Link } from "react-router-dom";

const Home = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  return (
    <>
      <div className="overflow-x-hidden">
        {/* Hero Section */}
        <div
          className="bg-slate-100 dark:bg-slate-800 flex items-center justify-center mt-[90px] p-6"
          style={{ height: "calc(100vh - 320px)" }}
        >
          <div className="bg-slate-800 dark:bg-slate-200 w-full h-full rounded-3xl overflow-hidden relative">
            <img
              src={HeroImage}
              alt="Medical Practice"
              className="w-full h-full object-cover"
            />
            {/* Semi-Transparent Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-40 dark:bg-opacity-50 z-10"></div>
            {/* Text Content */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 text-left text-white px-6">
              <h1 className="text-5xl md:text-6xl font-semibold mb-6">
                Your modern medical practice
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-6">
                Offering innovative solutions for all your healthcare needs.
              </p>
              <Link to="/patient-register">
                <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  Book an Appointment
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Introduction Section */}
        <div className="w-screen overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center p-6">
          <div className="text-left p-6">
            <h1 className="text-4xl font-semibold mb-4 text-blue-800 dark:text-blue-400">
              Healthcare reimagined for the modern world.
            </h1>
            <p className="text-xl font-medium mb-6 text-slate-700 dark:text-slate-400">
              Driven by empathy. Guided by technology. We offer a seamless,
              personalized care experience, built to empower you on every step
              of your wellness journey. Our mission: to make exceptional
              healthcare accessible, reliable, and always centered around you.
            </p>
          </div>
        </div>

        {/* Services Section */}
        <div className="w-screen bg-slate-100 dark:bg-slate-800 flex items-center justify-center py-6 px-[80px]">
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4 md:p-8 lg:p-12">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-6 bg-white dark:bg-gray-700 rounded-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
                  {service.title}
                </h2>
                <p className="text-center text-gray-700 dark:text-gray-300">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Introduction Section */}
        <div className="w-screen overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center p-6">
          <div className="text-left p-6">
            <h1 className="text-4xl font-semibold mb-4 text-blue-800 dark:text-blue-400">
              Revolutionizing Healthcare for a Healthier Future
            </h1>
            <p className="text-lg md:text-xl font-medium mb-6 text-slate-700 dark:text-slate-400">
              We combine cutting-edge technology with compassionate care to
              ensure you receive the best possible treatment, every step of the
              way. Our innovative solutions are designed to meet the healthcare
              challenges of today and tomorrow, making health services more
              accessible, effective, and patient-centered.
            </p>
          </div>
        </div>

        {/* Accordion Section */}
        <div className="w-screen bg-slate-100 dark:bg-slate-800 flex items-center justify-center py-8 px-[80px]">
          <div className="flex flex-wrap sm:flex-nowrap gap-8 bg-slate-400 dark:bg-slate-600 w-full rounded-3xl overflow-hidden p-8">
            {/* Accordion */}
            <div className="space-y-4 ">
              {items.map((item, index) => (
                <div key={index} className="collapse collapse-plus bg-base-200">
                  <input
                    type="radio"
                    name="accordion"
                    checked={selectedIndex === index}
                    onChange={() =>
                      setSelectedIndex(selectedIndex === index ? null : index)
                    }
                  />
                  <div className="collapse-title text-xl font-medium">
                    {item.title}
                  </div>
                  <div className="collapse-content">
                    <p>{item.content}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Accordion Image */}
            <div>
              <img
                src={AccordionImage}
                alt="Medical Practice"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="w-screen bg-blue-100 dark:bg-slate-800 py-12 px-6">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-semibold text-blue-800 dark:text-blue-400">
            What Our Patients Say
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md max-w-sm"
            >
              <p className="text-lg text-gray-700 dark:text-gray-300 italic">
                "{testimonial.quote}"
              </p>
              <h3 className="mt-4 text-blue-600 dark:text-blue-400 font-medium">
                - {testimonial.name}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="w-screen bg-slate-100 dark:bg-slate-800 py-16 px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-800 dark:text-blue-400">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-4">
            Find answers to some of the most common questions below.
          </p>
        </div>
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-700 shadow-md rounded-lg overflow-hidden"
            >
              <button
                onClick={() =>
                  setSelectedIndex(selectedIndex === index ? null : index)
                }
                className="w-full text-left px-6 py-4 flex justify-between items-center focus:outline-none"
              >
                <h3
                  className={`text-xl font-semibold ${
                    selectedIndex === index
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-slate-900 dark:text-slate-200"
                  }`}
                >
                  {faq.question}
                </h3>
                <span
                  className={`transform transition-transform duration-300 ${
                    selectedIndex === index ? "rotate-180" : ""
                  } text-gray-500 dark:text-gray-400`}
                >
                  ▼
                </span>
              </button>
              {selectedIndex === index && (
                <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-600">
                  <p className="text-gray-700 dark:text-gray-300">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;

// Dummy Data
const services = [
  {
    title: "Comprehensive Care",
    description:
      "Providing all aspects of healthcare management, from appointments to follow-ups, to ensure holistic care.",
    icon: "💼",
  },
  {
    title: "Personalized Health Tracking",
    description:
      "Access your medical history, prescriptions, and treatment plans all in one secure place.",
    icon: "📈",
  },
  {
    title: "Specialist Access",
    description:
      "Connect with highly qualified specialists across various fields for expert care.",
    icon: "🩺",
  },
  {
    title: "Appointment Scheduling",
    description:
      "Book, reschedule, or cancel appointments at your convenience, with reminders for seamless management.",
    icon: "📅",
  },
  {
    title: "Telemedicine Services",
    description:
      "Consult with healthcare professionals from the comfort of your home, anytime.",
    icon: "💻",
  },
  {
    title: "24/7 Support",
    description:
      "Our team is here to support you round the clock, ensuring your health needs are always met.",
    icon: "📞",
  },
];

const items = [
  {
    title: "The Wellness Journey Program",
    content:
      "A holistic approach to health, supporting you every step of the way. Join our Wellness Journey Program to receive tailored care plans designed just for you.",
  },
  {
    title: "Personalized Health Guidance",
    content:
      "It’s not just about treatments, but about understanding your unique needs. With our program, you get personalized health advice from a dedicated team that works with you on your wellness goals.",
  },
  {
    title: "Dedicated Health Coordinators",
    content:
      "Your health journey is supported by a team of professionals who provide assistance when needed. From health questions to appointment scheduling, our coordinators are your go-to for seamless care.",
  },
  {
    title: "Comprehensive Health Assessments",
    content:
      "Regular check-ups are key to long-term health. You will receive an annual, in-depth health review to monitor progress and ensure you stay on track toward your health goals.",
  },
  {
    title: "Telemedicine and Virtual Care",
    content:
      "Access healthcare professionals from the comfort of your home. Our virtual consultations make it easy to get medical advice, prescriptions, and follow-up care without the need for an in-person visit.",
  },
  {
    title: "24/7 Health Support Line",
    content:
      "Our dedicated health support line is always available, ensuring you have access to a healthcare professional whenever you need it. Get answers to urgent health inquiries around the clock.",
  },
  {
    title: "Continuous Care and Support",
    content:
      "We don’t just treat; we build long-lasting relationships. In case of emergency or when your regular physician is unavailable, our team is always ready to step in with your full medical history.",
  },
  {
    title: "Priority Access to Care",
    content:
      "Sometimes life doesn’t wait. As part of our program, you’ll get priority access to specialists and healthcare resources, reducing wait times and speeding up your treatment plans.",
  },
];

// Testimonials Data
const testimonials = [
  {
    name: "John Doe",
    quote:
      "Medicare has completely transformed the way I manage my health. Highly recommend it!",
  },
  {
    name: "Jane Smith",
    quote:
      "The personalized care and easy access to specialists make a big difference.",
  },
  {
    name: "Michael Brown",
    quote: "Booking appointments has never been easier. Fantastic platform!",
  },
];

// FAQ Data
const faqs = [
  {
    question: "How can I book an appointment?",
    answer:
      "You can easily book an appointment by clicking the 'Book Appointment' button on our homepage.",
  },
  {
    question: "What services do you offer?",
    answer:
      "We offer a wide range of services, from preventive care to specialist consultations and telemedicine.",
  },
  {
    question: "Is my medical data secure?",
    answer:
      "Absolutely. Your data is encrypted and stored securely to ensure privacy and safety.",
  },
];
