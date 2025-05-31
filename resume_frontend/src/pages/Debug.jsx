function ShowInputField() {
    return (
      <section className="bg-base-200 shadow-2xl rounded-2xl p-12 w-[80%] max-w-3xl min-h-[500px] text-center mx-auto">
        <h1 className="text-5xl font-extrabold mb-6 flex items-center justify-center gap-3 text-primary">
          <FaBrain className="text-accent" /> AI Resume Generator
        </h1>
  
        <p className="mb-4 text-base text-base-content opacity-50">
          Describe your background, skills, experience, and aspirations. Our AI will craft a professional resume tailored to your story.
        </p>
  
        <div className="text-left w-full">
          <textarea
            id="resumeDescription"
            disabled={loading}
            className="textarea textarea-bordered w-full h-52 resize-none bg-base-100 text-base-content rounded-xl focus:outline-none focus:ring focus:ring-accent"
            placeholder="E.g., I am a software engineer with 3+ years of experience in building full-stack applications using React and Node.js..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
  
          <div className="flex justify-end mt-2">
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
  
        <div className="flex justify-center gap-6 mt-10">
          <button
            disabled={loading}
            onClick={handleGenerate}
            className={`btn text-white font-semibold px-6 py-3 rounded-full transition duration-300 ease-in-out
        bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500
        ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading && <span className="loading loading-spinner"></span>}
            <FaPaperPlane className="mr-2" />
            {loading ? "Generating..." : "Generate Resume"}
          </button>
  
          <button
            disabled={loading}
            onClick={handleClear}
            className={`btn text-white font-semibold px-6 py-3 rounded-full transition duration-300 ease-in-out
        bg-gradient-to-r from-red-500 to-red-400 hover:from-red-600 hover:to-red-500
        ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <FaTrash className="mr-2" />
            Clear
          </button>
        </div>
      </section>
    );
  }