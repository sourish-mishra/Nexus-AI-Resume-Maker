import React from "react";
import { motion } from "framer-motion";
import {
  FiCpu,
  FiEye,
  FiFileText,
  FiZap,
  FiMoon,
  FiLayers,
} from "react-icons/fi";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const glassCard =
  "backdrop-blur-md bg-base-100/60 border border-base-300 shadow-xl p-6 rounded-2xl hover:scale-[1.02] transition-transform duration-300";

const services = [
  {
    title: "AI-Powered Resume Generation",
    description:
      "Intelligently structured resumes with AI-generated content tailored for roles.",
    icon: <FiCpu className="text-4xl text-primary" />,
  },
  {
    title: "Live Resume Preview",
    description:
      "Preview your resume in real-time with instant layout and content updates.",
    icon: <FiEye className="text-4xl text-secondary" />,
  },
  {
    title: "One-Click PDF Export",
    description:
      "Generate beautiful PDFs instantly using jsPDF + html-to-image.",
    icon: <FiFileText className="text-4xl text-accent" />,
  },
  {
    title: "Custom Templates",
    description:
      "Choose from responsive, modern templates optimized for ATS.",
    icon: <FiLayers className="text-4xl text-info" />,
  },
  {
    title: "Dark Mode Support",
    description:
      "Comfortable UI with full support for DaisyUI’s dark theme.",
    icon: <FiMoon className="text-4xl text-warning" />,
  },
  {
    title: "Performance Focused",
    description:
      "Built with React + Vite for blazing fast performance.",
    icon: <FiZap className="text-4xl text-success" />,
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-base-100 text-base-content transition-colors duration-500 px-6 py-20">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary animate-gradient-x">
          Our Services
        </h1>
        <p className="mt-4 text-xl opacity-80 max-w-2xl mx-auto">
          Nexus brings intelligent resume generation to life with beautiful UI and modern tech.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {services.map((service, idx) => (
          <motion.div
            key={service.title}
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className={glassCard}
          >
            <div className="mb-4">{service.icon}</div>
            <h3 className="text-2xl font-bold text-primary mb-2">
              {service.title}
            </h3>
            <p className="opacity-90">{service.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Services;
