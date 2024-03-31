import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom'

function Analyzer() {
  const [resumeData, setResumeData] = useState('');
  const [resumeData1, setResumeData1] = useState('');
  const [resumeData2, setResumeData2] = useState('');
  const [resumeData3, setResumeData3] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [isLoadingmatch, setIsLoadingmatch] = useState(false);
  const [isLoadingkeyword, setIsLoadingkeyword] = useState(false);
  const [isLoadingpsummary, setIsLoadingpsummary] = useState(false);
  const [isLoadingjdsummary, setIsLoadingjdsummary] = useState(false);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [isTextEntered, setIsTextEntered] = useState(false)
  const handleJobDescriptionChange = (event) => {
    setJobDescription(event.target.value);
    setIsTextEntered(true);
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log('Selected file:', file);
    setIsFileUploaded(true)
    
  };

  const handleUpload = () => {
    if (!jobDescription) return;
    setIsLoadingmatch(true);
    const fileInput = document.getElementById('fileInput');
    const formData = new FormData();
    formData.append('resume', fileInput.files[0]);
    formData.append('jobDescription', jobDescription);


    fetch('http://localhost:5000/upload', { 
      method: 'POST',
      body: formData,
    })
    
    .then(response => {
      if (response.ok) {
        return response.text(); // Assuming the response contains the parsed resume data
      }
      throw new Error('Network response was not ok.');
    })
    .then(data => {
      setResumeData(data); 
      setIsLoadingmatch(false);// Update state with the parsed resume data
    })
    .catch(error => {
      console.error('Error uploading file:', error);
      setIsLoadingmatch(false);
    });

  };
  const handleMissingKeywords = () => {
    setIsLoadingkeyword(true);
    const fileInput = document.getElementById('fileInput');
    const formData = new FormData();
    formData.append('resume', fileInput.files[0]);
    formData.append('jobDescription', jobDescription);
  
    fetch('http://localhost:5000/check', { 
      method: 'POST',
      body: formData,
    })
    
    .then(response => {
      if (response.ok) {
        return response.text(); // Assuming the response contains the parsed resume data
      }
      throw new Error('Network response was not ok.');
    })
    .then(data1 => {
      setResumeData1(data1);
      setIsLoadingkeyword(false); // Update state with the parsed resume data
    })
    .catch(error => {
      console.error('Error uploading file:', error);
      setIsLoadingkeyword(false);
    });
  };
  
  const handleProfileSummary = () => {
    setIsLoadingpsummary(true);
    const fileInput = document.getElementById('fileInput');
    const formData = new FormData();
    formData.append('resume', fileInput.files[0]);
    formData.append('jobDescription', jobDescription);

  
    fetch('http://localhost:5000/summary', { 
      method: 'POST',
      body: formData,
    })
    
    .then(response => {
      if (response.ok) {
        return response.text(); // Assuming the response contains the parsed resume data
      }
      throw new Error('Network response was not ok.');
    })
    .then(data2 => {
      setResumeData2(data2); 
      setIsLoadingpsummary(false);// Update state with the parsed resume data
    })
    .catch(error => {
      console.error('Error uploading file:', error);
      setIsLoadingpsummary(false);
    });
  };
  
  const handleJDSummary = () => {
    setIsLoadingjdsummary(true);
    const fileInput = document.getElementById('fileInput');
    const formData = new FormData();
    formData.append('resume', fileInput.files[0]);
    formData.append('jobDescription', jobDescription);
    fetch('http://localhost:5000/jdsummary', { 
      method: 'POST',
      body: formData,
    })
    
    .then(response => {
      if (response.ok) {
        return response.text(); // Assuming the response contains the parsed resume data
      }
      throw new Error('Network response was not ok.');
    })
    .then(data3 => {
      setResumeData3(data3);
      setIsLoadingjdsummary(false); // Update state with the parsed resume data
    })
    .catch(error => {
      console.error('Error uploading file:', error);
      setIsLoadingjdsummary(false);
    });
  };
  

  const Loader = () => {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100px', // Adjust height as needed
        }}
      >
        <div className="loader"></div>
      </div>
    );
  };
  

  return (
    <div className="container">
      <h1 className="title">JobFit Analyzer</h1>
      <div className="form-container">
        <h2>Enter Job Description</h2>
        <textarea 
          value={jobDescription}
          onChange={handleJobDescriptionChange}
          className="job-description"
          rows={10}
          cols={50}
          placeholder="Paste job description here ...."
        />
        <label className="file-input">
          Upload Resume
          <input
            id="fileInput"
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
          />
        </label>
        {isFileUploaded && <p className="resume-data">Resume uploaded successfully!</p>} 
        
          <div>
            <button onClick={handleUpload} className="btn">Check Matching Score</button>
            {isLoadingmatch && <Loader />}  
            <p className="resume-data">{resumeData}</p>
            <button onClick={handleMissingKeywords} className="btn">Check Missing Keywords</button>
            {isLoadingkeyword && <Loader />} 
            <p className="resume-data">{resumeData1}</p>
            <button onClick={handleProfileSummary} className="btn">Profile Summary</button>
            {isLoadingpsummary && <Loader />} 
            <p className="resume-data">{resumeData2}</p>
            <button onClick={handleJDSummary} className="btn">Job Description Summary</button>
            {isLoadingjdsummary && <Loader />} 
            <p className="resume-data">{resumeData3}</p>
          </div>
        <p className='made'>Made by Saad Dastgir</p>
      </div>
    </div>
  );
}


export default Analyzer;