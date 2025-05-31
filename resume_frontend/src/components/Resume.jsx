import React, { useRef } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaPhone,
  FaEnvelope,
  FaUserCircle,
} from "react-icons/fa";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";

const Resume = ({ data }) => {
  const resumeRef = useRef(null);

  const handleDownloadPdf = () => {
    const scale = 2;

    toPng(resumeRef.current, {
      quality: 1.0,
      pixelRatio: scale,
    })
      .then((dataUrl) => {
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        const img = new Image();
        img.src = dataUrl;

        img.onload = () => {
          const imgWidth = img.width;
          const imgHeight = img.height;

          const aspectRatio = imgHeight / imgWidth;
          const renderWidth = pdfWidth;
          const renderHeight = renderWidth * aspectRatio;

          pdf.addImage(
            dataUrl,
            "PNG",
            0,
            0,
            pdfWidth,
            renderHeight > pdfHeight ? pdfHeight : renderHeight
          );
          pdf.save(`${data.personalInformation.fullName}.pdf`);
        };
      })
      .catch((err) => {
        console.error("Error generating PDF", err);
      });
  };

  return (
    <>
      <div
        ref={resumeRef}
        className="w-[280mm] min-h-[297mm] mx-auto bg-white text-black shadow-md rounded-lg px-10 py-12 border border-gray-300 text-sm leading-tight print:p-0 print:w-full print:min-h-screen print:shadow-none"
        style={{ boxSizing: "border-box" }}
      >
        <div className="md:w-1/3 mb-8">
          <h1 className="text-4xl font-bold text-justify">{data.personalInformation.fullName}</h1>
          <p className="text-lg mt-1 text-justify">{data.personalInformation.location}</p>

          <div className="mt-3 space-y-1 text-justify">
            {data.personalInformation.email && (
              <div className="hover:text-primary flex items-center gap-2">
                <FaEnvelope />
                <a
                  href={`mailto:${data.personalInformation.email}`}
                  className="hover:underline"
                >
                  {data.personalInformation.email}
                </a>
              </div>
            )}
            {data.personalInformation.phoneNumber && (
              <div className="flex items-center gap-2">
                <FaPhone /> <span>{data.personalInformation.phoneNumber}</span>
              </div>
            )}
          </div>

          <div className="flex gap-4 pt-2">
            {data.personalInformation.gitHub && (
              <a
                href={data.personalInformation.gitHub}
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary flex items-center gap-2"
              >
                <FaGithub size={22} />
                <span className="text-base">GitHub</span>
              </a>
            )}
            {data.personalInformation.linkedin && (
              <a
                href={data.personalInformation.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary flex items-center gap-2"
              >
                <FaLinkedin size={22} />
                <span className="text-base">LinkedIn</span>
              </a>
            )}
            {data.personalInformation.portfolio && (
              <a
                href={data.personalInformation.portfolio}
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary flex items-center gap-2"
              >
                <FaUserCircle size={22} />
                <span className="text-base">Portfolio</span>
              </a>
            )}
          </div>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-justify">Summary</h2>
          <p className="leading-relaxed text-justify">{data.summary}</p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-10">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-justify">Education</h2>
              {(data.education || []).map((edu, idx) => (
                <div key={idx} className="border border-gray-300 p-5 rounded-lg mb-4 text-justify">
                  <h3 className="font-bold text-xl">{edu.degree}</h3>
                  <p>{edu.university}, {edu.location}</p>
                  <p className="text-sm mt-1">🎓 Graduation Year: {edu.graduationYear}</p>
                </div>
              ))}
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-justify">Projects</h2>
              {(data.projects || []).map((proj, idx) => (
                <div key={idx} className="border border-gray-300 p-5 rounded-lg mb-4 text-justify">
                  <h3 className="font-bold text-xl">{proj.title}</h3>
                  <p className="mt-1">{proj.description}</p>
                  <p className="text-sm mt-1">
                    🛠 Technologies: {
                      Array.isArray(proj.technologiesUsed)
                        ? proj.technologiesUsed.join(", ")
                        : proj.technologiesUsed || "N/A"
                    }
                  </p>
                  {proj.githubLink && (
                    <a
                      href={proj.githubLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-700 hover:underline mt-2 inline-block"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      🔗 GitHub Link
                    </a>
                  )}
                </div>
              ))}
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-justify">Experience</h2>
              {(data.experience || []).map((exp, idx) => (
                <div key={idx} className="border border-gray-300 p-5 rounded-lg mb-4 text-justify">
                  <h3 className="font-bold text-xl">{exp.jobTitle}</h3>
                  <p>{exp.company} | {exp.location}</p>
                  <p className="text-sm">{exp.duration}</p>
                  <p className="mt-2">{exp.responsibility}</p>
                </div>
              ))}
            </section>
          </div>

          <div className="space-y-10">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {(data.skills || []).map((skill, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 text-gray-800 text-sm font-medium px-2 py-1 rounded-full shadow-sm"
                  >
                    {skill.title} - {skill.level}
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-justify">Achievements</h2>
              {(data.achievements || []).map((ach, idx) => (
                <div key={idx} className="border border-gray-300 p-5 rounded-lg mb-4 text-justify">
                  <h3 className="font-bold">{ach.title}</h3>
                  <p className="text-sm text-gray-500">{ach.year}</p>
                  <p className="mt-1">{ach.extraInformation}</p>
                </div>
              ))}
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-justify">Certifications</h2>
              {(data.certifications || []).map((cert, idx) => (
                <div key={idx} className="border border-gray-300 p-5 rounded-lg mb-4 text-justify">
                  <h3 className="font-bold">{cert.title}</h3>
                  <p className="text-sm">{cert.issuingOrganization} - {cert.year}</p>
                </div>
              ))}
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-justify">Languages & Interests</h2>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 text-justify">
                  <h3 className="font-semibold mb-2">Languages</h3>
                  <ul className="list-disc pl-5">
                    {(data.languages || []).map((lang, idx) => (
                      <li key={idx}>{lang.name}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex-1 text-justify">
                  <h3 className="font-semibold mb-2">Interests</h3>
                  <ul className="list-disc pl-5">
                    {(data.interests || []).map((interest, idx) => (
                      <li key={idx}>{interest.name}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={handleDownloadPdf}
          className="px-8 py-3 text-lg font-semibold text-white rounded-lg bg-gradient-to-r from-indigo-700 via-purple-600 to-indigo-700 hover:from-pink-600 hover:via-purple-700 hover:to-blue-600 transition-all transition-transform transition-colors duration-700 transform hover:scale-105 shadow-md"
        >
          Download PDF
        </button>
      </div>
    </>
  );
};

export default Resume;
