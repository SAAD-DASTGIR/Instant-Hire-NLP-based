import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Resumes = () => {
  const [resumes, setResumes] = useState([]);
  const [error, setError] = useState('');
  const [searchTitle, setSearchTitle] = useState('');

  const handleSearch = async () => {
        try {
            const encodedSkills = encodeURIComponent(searchTitle); // Encode the skills
    
            const response = await fetch(`/resumes/search?skills=${encodedSkills}`);
            const data = await response.json();
    
            setResumes(data);
        } catch (error) {
            console.error('Error searching resumes:', error);
        }
    };
    

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await axios.get('/resumes');
        setResumes(response.data.resumes);
      } catch (error) {
        setError('Error retrieving resumes data');
        console.error(error);
      }
    };

    fetchResumes();
  }, []);

  const openResumePdf = (pdfData) => {
    const pdfWindow = window.open();
    pdfWindow.document.write(
      `<iframe src="data:${pdfData.contentType};base64,${pdfData.data}" style="width: 100%; height: 100%;"></iframe>`
    );
  };
  

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className='ml-10 mb-12'>
        <div className='flex justify-between items-center mb-8'>
            <h1 className="text-6xl text-primary font-bold ">Resumes</h1>
            <div className='flex h-12 rounded-lg border-2 border-gray-400'>
                <input
                    type="text"
                    placeholder="Enter Skills (eg. html,css)"
                    value={searchTitle}
                    onChange={(e) => setSearchTitle(e.target.value)}
                    className='px-3 rounded-l-lg focus:outline-none'
                />
                <button className=' rounded-r-lg hover:opacity-80 transition duration-300 btn-primary text-md px-3 flex items-center' onClick={handleSearch}>
                    <i className="fa fa-search mr-2" aria-hidden="true"></i>
                    <p>Search</p>   
                </button>
            </div>
        </div>
        {resumes.length === 0 ? (
            <div className="text-gray-600">No resumes found</div>
        ) : (
            <ul className="space-y-8">
            {resumes.map((resume) => (
                <li key={resume.email} className="bg-white rounded-lg shadow p-8">
                    <p><span className='font-semibold text-primary'>Email:  </span> {resume.email}</p>
                    <p><span className='font-semibold text-primary'>Skills:  </span> {resume.skills.join(', ')}</p>
                    <p><span className='font-semibold text-primary'>Qualification:  </span> {resume.qualification.join(' ')}</p>
                    <p><span className='font-semibold text-primary'>Institutes:  </span> {resume.institutes.join(', ')}</p>
                    <p><span className='font-semibold text-primary'>Experience:  </span> {resume.experience.join(', ')}</p>
                    <button
                        className="btn btn-primary mt-5"
                        onClick={() => openResumePdf(resume.pdf)}
                    >
                        Open Resume
                    </button>
                </li>
            ))}
            </ul>
        )}
      </div>
    </div>
  );
};

export default Resumes;
