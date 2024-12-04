import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

const About = () => {
  return (
    <>
      <div className="mt-[80px] bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200  py-12">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 ">
          <h1 className="text-5xl font-extrabold text-center text-blue-600 dark:text-blue-400 mb-8">
            About Us
          </h1>

          <div className="space-y-4">
            {/* Our Mission */}
            <div className="collapse collapse-plus bg-base-300 dark:bg-gray-800 rounded-lg shadow-md">
              <input type="radio" name="accordion" defaultChecked />
              <div className="collapse-title text-xl font-medium text-blue-600 dark:text-blue-400">
                Our Mission
              </div>
              <div className="collapse-content p-4 text-lg font-light">
                <p>
                  Our mission is to enhance patient care and experience through
                  innovation and dedication. We believe in making healthcare
                  accessible, efficient, and user-friendly, so every individual
                  receives the quality of care they deserve.
                </p>
              </div>
            </div>

            {/* Our Vision */}
            <div className="collapse collapse-plus bg-base-300 dark:bg-gray-800 rounded-lg shadow-md">
              <input type="radio" name="accordion" />
              <div className="collapse-title text-xl font-medium text-blue-600 dark:text-blue-400">
                Our Vision
              </div>
              <div className="collapse-content p-4 text-lg font-light">
                <p>
                  We envision a healthcare system where technology removes
                  barriers and fosters connections. Through Medicare, we aim to
                  create an environment that prioritizes patient-centered care,
                  transparency, and continuous improvement.
                </p>
              </div>
            </div>

            {/* Why Choose Medicare? */}
            <div className="collapse collapse-plus bg-base-300 dark:bg-gray-800 rounded-lg shadow-md">
              <input type="radio" name="accordion" />
              <div className="collapse-title text-xl font-medium text-blue-600 dark:text-blue-400">
                Why Choose Medicare?
              </div>
              <div className="collapse-content p-4 text-lg font-light">
                <ul className="list-disc pl-5 space-y-3">
                  <li>
                    Comprehensive Care: Covering all aspects of healthcare
                    management from appointments to follow-ups.
                  </li>
                  <li>
                    Personalized Health Tracking: Access medical history,
                    prescriptions, and treatment plans in one secure place.
                  </li>
                  <li>
                    Specialist Access: Connect with doctors and specialists
                    across various fields.
                  </li>
                  <li>
                    Appointment Scheduling: Book, reschedule, or cancel
                    appointments at your convenience.
                  </li>
                  <li>
                    Telemedicine Services: Consult with healthcare professionals
                    from the comfort of your home.
                  </li>
                </ul>
              </div>
            </div>

            {/* Our Team */}
            <div className="collapse collapse-plus bg-base-300 dark:bg-gray-800 rounded-lg shadow-md">
              <input type="radio" name="accordion" />
              <div className="collapse-title text-xl font-medium text-blue-600 dark:text-blue-400">
                Our Team
              </div>
              <div className="collapse-content p-4 text-lg font-light">
                <p>
                  At the heart of Medicare is a team of dedicated healthcare
                  providers, developers, and support staff who are passionate
                  about transforming healthcare delivery.
                </p>
              </div>
            </div>

            {/* Our Commitment to Privacy */}
            <div className="collapse collapse-plus bg-base-300 dark:bg-gray-800 rounded-lg shadow-md">
              <input type="radio" name="accordion" />
              <div className="collapse-title text-xl font-medium text-blue-600 dark:text-blue-400">
                Our Commitment to Privacy
              </div>
              <div className="collapse-content p-4 text-lg font-light">
                <p>
                  We prioritize your privacy and security. Medicare is designed
                  with state-of-the-art security measures to protect your data
                  and ensure your personal health information remains
                  confidential and safe.
                </p>
              </div>
            </div>

            {/* Join the Medicare Family */}
            <div className="collapse collapse-plus bg-base-300 dark:bg-gray-800 rounded-lg shadow-md">
              <input type="radio" name="accordion" />
              <div className="collapse-title text-xl font-medium text-blue-600 dark:text-blue-400">
                Join the Medicare Family
              </div>
              <div className="collapse-content p-4 text-lg font-light">
                <p>
                  Whether you’re a patient, a doctor, or a healthcare
                  professional, Medicare is here to support your journey. Join
                  us as we work together toward a healthier future.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* for parallax  */}
      <div className="bg-white dark:bg-[#1C1D20]">
        <TextParallaxContent
          imgUrl="https://images.unsplash.com/photo-1554734867-bf3c00a49371?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          subheading="Our Mission"
          heading="Revolutionizing Healthcare with MedicareApp"
        >
          <ExampleContent />
        </TextParallaxContent>
        <TextParallaxContent
          imgUrl="https://images.unsplash.com/photo-1565262353342-6e919eab5b58?q=80&w=3264&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          subheading="The Future of Healthcare"
          heading="MedicareApp at Your Service"
        >
          <ExampleContentOne />
        </TextParallaxContent>
        <TextParallaxContent
          imgUrl="https://plus.unsplash.com/premium_photo-1661580511704-404b878a4f96?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          subheading="Modern"
          heading="MedicareApp is Changing Healthcare Access"
        >
          <ExampleContentTwo />
        </TextParallaxContent>
      </div>
    </>
  );
};
export default About;

const IMG_PADDING = 12;

const TextParallaxContent = ({ imgUrl, subheading, heading, children }) => {
  return (
    <div
      style={{
        paddingLeft: IMG_PADDING,
        paddingRight: IMG_PADDING,
      }}
    >
      <div className="relative h-[150vh]">
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy heading={heading} subheading={subheading} />
      </div>
      {children}
    </div>
  );
};

const StickyImage = ({ imgUrl }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-3xl"
    >
      <motion.div
        className="absolute inset-0 bg-neutral-950/70"
        style={{
          opacity,
        }}
      />
    </motion.div>
  );
};

const OverlayCopy = ({ subheading, heading }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div
      style={{
        y,
        opacity,
      }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white"
    >
      <p className="mb-2 text-center text-xl md:mb-4 md:text-3xl">
        {subheading}
      </p>
      <p className="text-center text-4xl font-bold md:text-7xl">{heading}</p>
    </motion.div>
  );
};

const ExampleContent = () => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <h2 className="col-span-1 text-3xl font-bold md:col-span-4 text-neutral-500">
      Empowering Your Healthcare Journey
    </h2>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-4 text-xl text-neutral-400 md:text-2xl">
        At Medicare, we believe in making healthcare accessible, affordable, and
        tailored to your needs. Our comprehensive services cover everything from
        preventive care to specialized treatments, ensuring you receive the care
        you deserve.
      </p>
      <p className="mb-8 text-xl text-neutral-500 md:text-2xl">
        With a variety of plans designed to meet different healthcare needs,
        we’re committed to providing you with personalized coverage options. Our
        goal is to help you stay healthy, active, and well-informed about your
        healthcare choices.
      </p>
    </div>
  </div>
);

const ExampleContentOne = () => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <h2 className="col-span-1 text-3xl font-bold md:col-span-4 text-neutral-500">
      Your Trusted Health Partner
    </h2>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-4 text-xl text-neutral-400 md:text-2xl">
        Discover a healthcare experience centered around you. At Medicare, we
        focus on delivering solutions that are innovative, inclusive, and easy
        to access, ensuring everyone has the support they need.
      </p>
      <p className="mb-8 text-xl text-neutral-500 md:text-2xl">
        Whether it’s simplifying appointments, offering tailored health tips, or
        providing expert guidance, we’re here to help you take control of your
        health journey with confidence.
      </p>
    </div>
  </div>
);

const ExampleContentTwo = () => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <h2 className="col-span-1 text-3xl font-bold md:col-span-4 text-neutral-500">
      Redefining Accessible Care
    </h2>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-4 text-xl text-neutral-400 md:text-2xl">
        At Medicare, we’re breaking barriers to create a seamless healthcare
        experience. From cutting-edge telemedicine services to compassionate
        in-person care, we’re making sure you’re never far from quality care.
      </p>
      <p className="mb-8 text-xl text-neutral-500 md:text-2xl">
        Our commitment extends beyond just healthcare—it’s about empowering
        communities and fostering healthier, happier lives. Join us in shaping
        the future of accessible health solutions.
      </p>
    </div>
  </div>
);
