// About.jsx
import React from "react";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const glassCard =
  "backdrop-blur-md bg-neutral/60 border border-neutral shadow-lg p-6 rounded-2xl hover:scale-[1.02] transition-transform duration-300";

const Section = ({ title, children }) => (
  <motion.section
    variants={fadeInUp}
    initial="initial"
    whileInView="animate"
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="my-20 max-w-6xl mx-auto px-6"
  >
    <h2 className="text-4xl md:text-5xl font-black mb-10 text-secondary-content text-center w-fit mx-auto relative inline-block">
      {title}
      <span className="absolute w-full h-1 bg-gradient-to-r from-primary to-secondary bottom-0 left-0 rounded-full"></span>
    </h2>
    <div className={glassCard}>{children}</div>
  </motion.section>
);

const About = () => {
  return (
    <div className="min-h-screen bg-neutral text-neutral-content transition-colors duration-500">
      <motion.div
        className="text-center py-24"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent animate-gradient-x">
          About Nexus
        </h1>
        <p className="mt-6 text-xl md:text-2xl font-medium opacity-80">AI Resume Maker by Sourish Mishra</p>
      </motion.div>

      <Section title="What is Nexus?">
        <p>
          Nexus is a next-generation AI-powered Resume Generator built to make resume creation seamless, aesthetic, and optimized for hiring pipelines. It features:
        </p>
        <ul className="list-disc list-inside mt-4 space-y-2">
          <li>AI-generated section content</li>
          <li>One-click PDF export using <code>html-to-image</code> & <code>jsPDF</code></li>
          <li>Modern React-based architecture with Tailwind CSS</li>
        </ul>
      </Section>

      <Section title="Why Nexus?">
        <ul className="list-disc list-inside space-y-2">
          <li>Time-saving automation for resume building</li>
          <li>Designed for modern developers, students, and professionals</li>
          <li>Built with performance and simplicity in mind</li>
        </ul>
      </Section>

      <Section title="Features">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {["Smart Sections", "Beautiful Templates", "Real-Time Preview", "PDF Export"].map((title, idx) => (
            <motion.div
              key={title}
              className={glassCard}
              variants={fadeInUp}
              transition={{ delay: 0.2 * idx }}
            >
              <h3 className="text-2xl font-bold text-primary-content mb-2">{title}</h3>
              <p className="opacity-90">
                {
                  {
                    "Smart Sections": "AI-generated inputs for Experience, Education, Projects, and Skills.",
                    "Beautiful Templates": "Visually appealing layout with customization and responsive design.",
                    "Real-Time Preview": "See your resume evolve as you type with a live preview pane.",
                    "PDF Export": "Export your resume to PDF with one click using jsPDF + html-to-image."
                  }[title]
                }
              </p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section title="Technologies Used">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-center mt-6">
          {[
            "JAVA SpringBoot", "ReactJS", "Tailwind CSS", "jsPDF", "html-to-image",
             "JavaScript (ES6)", "Vite", "AI JSON Autogen"
          ].map((tech, idx) => (
            <motion.div
              key={tech}
              className="p-4 rounded-xl shadow border border-neutral hover:bg-primary hover:text-primary-content transition-all"
              variants={fadeInUp}
              transition={{ delay: 0.1 * idx }}
            >
              {tech}
            </motion.div>
          ))}
        </div>
      </Section>

      <Section title="Meet the Developer">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src="https://avatars.githubusercontent.com/u/90276940?v=4"
            alt="Sourish Mishra"
            className="w-32 h-32 rounded-full border-4 border-primary shadow-lg"
          />
          <div>
            <h3 className="text-3xl font-bold text-primary">Sourish Mishra</h3>
            <p className="mt-1">Frontend Developer • IETE Technical Lead</p>
            <p className="text-sm mt-2 opacity-80">
              Passionate about blending technology and design to solve real-world problems through code. Loves React, AI, and clean UX.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Our Vision">
        <p>
          Nexus aims to democratize career tools by making AI resume builders accessible to everyone—from students to working professionals.
        </p>
      </Section>

      <Section title="Inspiration from the Best">
        <p>
          Inspired by UI/UX from Google, Microsoft, Notion, and Vercel. Nexus incorporates a clean interface, rapid responsiveness, and productivity-centric design principles.
        </p>
      </Section>

      <footer className="text-center text-sm text-neutral-content py-10 border-t border-neutral mt-20">
        Nexus: AI Resume Maker © 2025 | Developed by Sourish Mishra
      </footer>
    </div>
  );
};

export default About;
