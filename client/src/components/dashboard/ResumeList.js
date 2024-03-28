import React, { useEffect, useState } from 'react';

const ResumeList = () => {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    fetch('/resume')
      .then((response) => response.json())
      .then((data) => setResumes(data))
      .catch((error) => console.error(error));
  }, []);

  const openResume = (path) => {
    window.open(`/resume/view?path=${encodeURIComponent(path)}`, '_blank');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {resumes.length > 0 ? (
        resumes.map((resume, index) => (
          <div key={index} className="bg-gray-100 p-4 mb-4 rounded">
            <h3 className="text-xl font-semibold mb-2">Email: {resume.email[0]}</h3>
            <h4 className="text-lg text-gray-700 mb-1">Skills:</h4>
            <ul className="mb-4">
              {resume.skills.map((skill, skillIndex) => (
                <li key={skillIndex} className="text-gray-600 mb-1">{skill}</li>
              ))}
            </ul>
            <a href={resume.path}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Open Resume
            </a>
          </div>
        ))
      ) : (
        <p>No resumes found in the database.</p>
      )}
    </div>
  );
};

export default ResumeList;
