import axios from "axios";
import { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const uploadResume = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();

    formData.append("resume", file);

    try {
      const res = await axios.post(
        "http://localhost:5000/upload",
        formData
      );

      setResult(res.data.analysis);

    } catch (error) {
      console.log(error);

      alert("Upload Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-10">
      
      <div className="bg-white p-8 rounded-2xl shadow-xl w-[600px]">
        
        <h1 className="text-3xl font-bold text-center mb-6">
          Smart Resume Analyzer
        </h1>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="border border-gray-300 p-3 w-full rounded-lg"
        />

        <button
          onClick={uploadResume}
          className="bg-black text-white w-full py-3 rounded-lg mt-5"
        >
          Analyze Resume
        </button>

        {result && (
          <div className="mt-8">

            <h2 className="text-2xl font-bold mb-4">
              Analysis Result
            </h2>

            <p className="mb-3">
              <strong>ATS Score:</strong> {result.atsScore}
            </p>

            <div>
              <strong>Skills Found:</strong>

              <ul className="list-disc ml-6 mt-2">
                {result.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default App;