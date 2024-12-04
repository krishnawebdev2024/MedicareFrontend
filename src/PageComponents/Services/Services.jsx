import { Link } from "react-router-dom";
import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

const Services = () => {
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

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

  return (
    <>
      <div className=" bg-gray-100 dark:bg-gray-900 mt-[80px]">
        <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-12 ">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            <h1 className="text-5xl font-bold text-center text-blue-600 dark:text-blue-400 mb-10">
              Our Services
            </h1>
            <p className="text-center text-lg max-w-2xl mx-auto mb-12">
              At <span className="font-bold">Medicare</span>, we offer a range
              of healthcare services designed to cater to your needs. Explore
              our comprehensive solutions for better health and well-being.
            </p>

            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
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
        </div>
      </div>

      <motion.section
        style={{
          backgroundImage,
        }}
        className="relative grid min-h-screen place-content-center overflow-hidden bg-gray-950 px-4 py-24 text-gray-200"
      >
        <div className="relative z-10 flex flex-col items-center">
          <span className="mb-1.5 inline-block rounded-full bg-gray-600/50 px-3 py-1.5 text-sm">
            Quality Care, Anytime, Anywhere
          </span>
          <h1 className="max-w-3xl bg-gradient-to-br from-white to-gray-400 bg-clip-text text-center text-3xl font-medium leading-tight text-transparent sm:text-5xl sm:leading-tight md:text-7xl md:leading-tight">
            Empowering Your Health with Care
          </h1>
          <p className="my-6 max-w-xl text-center text-base leading-relaxed md:text-lg md:leading-relaxed">
            At Medicare, we are committed to transforming healthcare by making
            it accessible, personalized, and focused on your well-being. Our
            services, from specialist access to telemedicine, are designed to
            fit seamlessly into your life.
          </p>
          <Link to="/patient-register">
            <motion.button
              style={{
                border,
                boxShadow,
              }}
              whileHover={{
                scale: 1.015,
              }}
              whileTap={{
                scale: 0.985,
              }}
              className="group relative flex w-fit items-center gap-1.5 rounded-full bg-gray-950/10 px-4 py-2 text-gray-50 transition-colors hover:bg-gray-950/50"
            >
              Sign up
              <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
            </motion.button>
          </Link>
        </div>

        <div className="absolute inset-0 z-0">
          <Canvas>
            <Stars radius={50} count={2500} factor={4} fade speed={2} />
          </Canvas>
        </div>
      </motion.section>
    </>
  );
};

export default Services;
