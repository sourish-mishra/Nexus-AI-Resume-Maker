import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaBrain, FaTrash, FaPaperPlane } from "react-icons/fa";
import { generateResume } from "../api/ResumeService";
import { BiBook } from "react-icons/bi";
import { useForm, useFieldArray } from "react-hook-form";
import { FaPlusCircle } from "react-icons/fa";
import Resume from "../components/Resume";

const GenerateResume = () => {
  const [data, setData] = useState({
    personalInformation: {
      fullName: "Sourish Sanjay Mishra",
    },
    summary: "",
    skills: [],
    experience: [],
    education: [],
    certifications: [],
    projects: [],
    languages: [],
    interests: [],
    achievements: [],
  });

  const { register, handleSubmit, control, setValue, reset } = useForm({
    defaultValues: data,
  });

  const [showFormUI, setShowFormUI] = useState(false);
  const [showResumeUI, setShowResumeUI] = useState(false);
  const [showPromptInput, setShowPromptInput] = useState(true);

  const experienceFields = useFieldArray({ control, name: "experience" });
  const educationFields = useFieldArray({ control, name: "education" });
  const achievementsFields = useFieldArray({ control, name: "achievements" });
  const certificationsFields = useFieldArray({
    control,
    name: "certifications",
  });
  const projectsFields = useFieldArray({ control, name: "projects" });
  const languagesFields = useFieldArray({ control, name: "languages" });
  const interestsFields = useFieldArray({ control, name: "interests" });
  const skillsFields = useFieldArray({ control, name: "skills" });

  //handle form submit
  const onSubmit = (data) => {
    console.log("Form Data:", data);
    setData({ ...data });

    setShowFormUI(false);
    setShowPromptInput(false);
    setShowResumeUI(true);
  };

  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

const handleGenerate = async () => {
  if (!description.trim()) {
    toast.error("Please provide a description.");
    return;
  }

  const formattedPrompt = `
  Based on the following description, generate a detailed JSON resume with the following sections:

  1. personalInformation: fullName, email, phoneNumber, location, linkedin, gitHub, portfolio
  2. summary
  3. skills: Array of { title, level }
  4. experience: Array of { jobTitle, company, location, duration, responsibility }
  5. education: Array of { degree, university, location, graduationYear }
  6. certifications: Array of { title, issuingOrganization, year }
  7. projects: Array of { title, description, technologiesUsed, githubLink }
  8. languages: Array of { name }
  9. interests: Array of { name }
  10. achievements: Array of { title, year, extraInformation }

  User Description:
  ${description}

  Output only the JSON.`;

  try {
    setLoading(true);
    console.log("Sending prompt:", formattedPrompt); // Debug: log prompt
    const responseData = await generateResume(formattedPrompt);


    console.log("Generated Resume JSON:", responseData?.data);

    reset(responseData.data);

    toast.success("Resume Generated Successfully!", {
      duration: 3000,
      position: "top-center",
    });

    setShowFormUI(true);
    setShowPromptInput(false);
    setShowResumeUI(false);
  } catch (error) {
    console.error("Error generating resume:", error);
    toast.error("Error Generating Resume!");
  } finally {
    setLoading(false);
    setDescription("");
  }
};



  const handleClear = () => {
    setDescription("");
  };

  const renderInput = (name, label, type = "text") => (
    <div className="form-control w-full  mb-4">
      <label className="label">
        <span className="label-text text-base-content">{label}</span>
      </label>
      <input
        type={type}
        {...register(name)}
        className="input input-bordered rounded-xl w-full bg-base-100 text-base-content"
      />
    </div>
  );
  const renderFieldArray = (fields, label, name, keys) => {
    const sectionLimits = {
      experience: 2,
      education: 2,
      projects: 3,
      languages: 3,
      interests: 5,
      certifications: 2,
      achievements: 3,
      skills: Infinity, // No limit
    };

    const maxLimit = sectionLimits[name] ?? Infinity;
    const isDisabled = fields.fields.length >= maxLimit;
    return (
      <div className="form-control w-full mb-4">
        <h3 className="text-xl text-sky-400 font-semibold">{label}</h3>
        {fields.fields.map((field, index) => (
          <div key={field.id} className="p-4 rounded-lg mb-4 bg-base-100">
            {keys.map((key) => (
              <div key={key}>
                {console.log(`${name}`)}
                {renderInput(`${name}.${index}.${key}`, key)}
              </div>
            ))}
            <button
              type="button"
              onClick={() => fields.remove(index)}
              className="btn btn-sm mt-2 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300 ease-in-out bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:scale-105 shadow-md hover:shadow-lg">
              <FaTrash className="w-5 h-5 text-white mr-2" /> Remove {label}
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            fields.append(
              keys.reduce((acc, key) => ({ ...acc, [key]: "" }), {})
            )
          }
          disabled={isDisabled}
          className={`mt-2 flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium transition-all duration-300 transform
            ${
              isDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "hover:scale-105 bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-700 shadow-md hover:shadow-lg"
            }
          `}
        >
          <FaPlusCircle className="w-5 h-5 mr-2 text-white" /> Add {label}
        </button>
      </div>
    );
  };

  function showFormFunction() {
    return (
      <div className="w-[80%]">
        <h1 className="text-4xl font-bold mb-6 flex items-center justify-center gap-2">
          <BiBook className="text-blue-600" /> Resume Form
        </h1>
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-6 space-y-6 bg-base-200 rounded-lg text-base-content"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderInput("personalInformation.fullName", "Full Name")}
              {renderInput("personalInformation.email", "Email", "email")}
              {renderInput(
                "personalInformation.phoneNumber",
                "Phone Number",
                "tel"
              )}
              {renderInput("personalInformation.location", "Location")}
              {renderInput("personalInformation.linkedin", "LinkedIn", "url")}
              {renderInput("personalInformation.gitHub", "GitHub", "url")}
              {renderInput("personalInformation.portfolio", "Portfolio", "url")}
            </div>

            <h3 className="text-xl font-semibold text-sky-400">Summary</h3>
            <textarea
              {...register("summary")}
              className="textarea textarea-bordered w-full bg-base-100 text-base-content"
              rows={4}
            ></textarea>

            {renderFieldArray(skillsFields, "Skills", "skills", [
              "title",
              "level",
            ])}
            {renderFieldArray(experienceFields, "Experience", "experience", [
              "jobTitle",
              "company",
              "location",
              "duration",
              "responsibility",
            ])}
            {renderFieldArray(educationFields, "Education", "education", [
              "degree",
              "university",
              "location",
              "graduationYear",
            ])}
            {renderFieldArray(achievementsFields, "Achievements", "achievements", [
              "title",
              "year",
              "extraInformation",
            ])}
            {renderFieldArray(
              certificationsFields,
              "Certifications",
              "certifications",
              ["title", "issuingOrganization", "year"]
            )}
            {renderFieldArray(projectsFields, "Projects", "projects", [
              "title",
              "description",
              "technologiesUsed",
              "githubLink",
            ])}

            <div className="flex gap-3 mt-16 p-4 rounded-xl ">
              <div className="flex-1">
                {renderFieldArray(languagesFields, "Languages", "languages", [
                  "name",
                ])}
              </div>
              <div className="flex-1">
                {renderFieldArray(interestsFields, "Interests", "interests", [
                  "name",
                ])}
              </div>
            </div>

            <button type="submit" className="w-full px-6 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-purple-600 via-blue-800 to-purple-600 transition duration-500 ease-in-out transform hover:scale-[1.03] hover:from-blue-600 hover:via-purple-800 hover:to-blue-600 shadow-md">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }

  function ShowInputField() {
    return (
      <div className="bg-base-200 shadow-lg rounded-lg p-10 max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold mb-6 flex items-center justify-center gap-2">
          <FaBrain className="text-accent" /> AI Resume Description
        </h1>
        <p className="mb-4 text-lg text-gray-600">
          Enter a detailed description about yourself to generate your
          professional resume.
        </p>
        <div className="text-left w-full">
          <textarea
            disabled={loading}
            className="textarea textarea-bordered w-full h-52 resize-none bg-base-100 text-base-content rounded-xl focus:outline-none focus:ring focus:ring-accent"
            placeholder="E.g., I am a software engineer with 3+ years of experience in building full-stack applications using React and Node.js..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <div className="flex justify-end mt-1 mb-4">
            <a
              href="https://chat.openai.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm italic text-accent hover:text-accent-content transition duration-200 no-underline"
            >
              ~ Use ChatGPT for Prompt
            </a>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <button
            disabled={loading}
            onClick={handleGenerate}
            className={`btn text-white font-semibold px-6 py-3 rounded-full transition duration-300 ease-in-out
        bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500
        ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading && <span className="loading loading-spinner"></span>}
            <FaPaperPlane />
            {loading ? "Generating..." : "Generate Resume"}
          </button>
          <button
            onClick={handleClear}
            className={`btn text-white font-semibold px-6 py-3 rounded-full transition duration-300 ease-in-out
        bg-gradient-to-r from-red-500 to-red-400 hover:from-red-600 hover:to-red-500
        ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <FaTrash /> Clear
          </button>
        </div>
      </div>
    );
  }
  function showResume() {
    return (
      <div>
        <Resume data={data} />

        <div className="flex mt-5 justify-center gap-2">
          <button
            onClick={() => {
              setShowPromptInput(true);
              setShowFormUI(false);
              setShowResumeUI(false);
            }}
            className="px-4 py-2 rounded-lg text-white font-semibold transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 shadow-md hover:shadow-lg"
          >
            Generate Another
          </button>
          <button
            onClick={() => {
              setShowPromptInput(false);
              setShowFormUI(true);
              setShowResumeUI(false);
            }}
            className="px-4 py-2 rounded-lg text-white font-semibold transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-red-500 via-red-600 to-red-700 shadow-md hover:shadow-lg"
          >
            Edit
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-5 p-10 flex flex-col gap-3 items-center justify-center font-sans">
      {showFormUI && showFormFunction()}
      {showPromptInput && ShowInputField()}
      {showResumeUI && showResume()}
    </div>
  );
};

export default GenerateResume;